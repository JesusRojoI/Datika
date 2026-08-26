import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nombreTarjeta,
      numeroTarjeta,
      fechaTarjeta,
      cvv,
      monto,
      currency,
      nombre,
      apellidos,
      email,
      direccion,
      poblacion,
      region,
      codigoPostal,
      telefono,
    } = body;

    const API_URL = process.env.ETOMIN_BASE_URL || 'https://pagos.etomin.com/api/v1';
    const etominUser = process.env.ETOMIN_USER;
    const etominPassword = process.env.ETOMIN_PASSWORD;

    const currencyCode = currency || '484';
    const isUSD = currencyCode === '840';

    console.log('💳 ==========================================');
    console.log('💳 INICIO DE PROCESAMIENTO DE PAGO');
    console.log('💳 Moneda:', isUSD ? 'USD (840)' : 'MXN (484)');
    console.log('💳 Monto:', monto, isUSD ? 'USD' : 'MXN');
    console.log('💳 ==========================================');

    if (!etominUser || !etominPassword) {
      console.error('❌ Credenciales de Etomin no configuradas');
      return NextResponse.json(
        { success: false, message: 'Configuración de pago incompleta' },
        { status: 500 }
      );
    }

    const amount = Number(monto);
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Monto inválido' },
        { status: 400 }
      );
    }

    // ==========================================
    // 1. Autenticación con Etomin
    // ==========================================
    // Declarar la variable FUERA del try para que esté disponible después
    let authToken: string | null = null;

    console.log('🔐 Autenticando con Etomin...');
    try {
      const authResponse = await fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: etominUser,
          password: etominPassword,
        }),
      });

      if (!authResponse.ok) {
        const errorData = await authResponse.json();
        throw new Error(errorData.message || 'Error de autenticación');
      }

      const authData = await authResponse.json();
      authToken = authData.authToken;

      if (!authToken) {
        return NextResponse.json(
          { success: false, message: 'Token no recibido' },
          { status: 500 }
        );
      }
      console.log('✅ Autenticación exitosa');
    } catch (authError: any) {
      console.error('❌ Error de autenticación:', authError.message);
      return NextResponse.json(
        { success: false, message: authError.message || 'Error de autenticación con Etomin' },
        { status: 500 }
      );
    }

    // ==========================================
    // 2. Tokenización de tarjeta
    // ==========================================
    // Declarar la variable FUERA del try
    let cardToken: string | null = null;

    const [month, year] = fechaTarjeta.split('/');
    console.log('💳 Tokenizando tarjeta...');

    try {
      const tokenResponse = await fetch(`${API_URL}/card/tokenizer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          cardData: {
            cardNumber: numeroTarjeta.replace(/\s/g, ''),
            cardholderName: nombreTarjeta,
            expirationYear: '20' + year,
            expirationMonth: month,
          },
        }),
      });

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        throw new Error(errorData.message || 'Error al tokenizar la tarjeta');
      }

      const tokenData = await tokenResponse.json();
      cardToken = tokenData.cardNumberToken;

      if (!cardToken) {
        return NextResponse.json(
          { success: false, message: 'No se pudo tokenizar la tarjeta' },
          { status: 400 }
        );
      }
      console.log('✅ Tarjeta tokenizada exitosamente');
    } catch (tokenError: any) {
      console.error('❌ Error de tokenización:', tokenError.message);
      return NextResponse.json(
        { success: false, message: tokenError.message || 'Error al tokenizar la tarjeta' },
        { status: 400 }
      );
    }

    // ==========================================
    // 3. Procesar venta
    // ==========================================
    const orderId = 'TXN-' + Date.now();
    console.log('💰 Procesando venta con moneda:', currencyCode);
    console.log('💰 Monto:', amount, isUSD ? 'USD' : 'MXN');

    try {
      const saleResponse = await fetch(`${API_URL}/sale`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          amount: amount,
          currency: currencyCode,
          reference: orderId,
          customerInformation: {
            firstName: (nombre || 'Cliente').trim(),
            lastName: (apellidos || 'Datika').trim(),
            middleName: '',
            email: (email || 'cliente@datika.com.mx').trim(),
            phone1: (telefono || '5555555555').trim(),
            address1: (direccion || 'Sin dirección').trim(),
            address2: '',
            city: (poblacion || 'Ciudad de México').trim(),
            state: (region || 'Ciudad de México').trim(),
            postalCode: (codigoPostal || '06500').trim(),
            country: 'MX',
            company: '',
            ip: request.headers.get('x-forwarded-for') || '127.0.0.1',
          },
          cardData: {
            cardNumberToken: cardToken,
            cvv: cvv,
          },
        }),
      });

      const saleData = await saleResponse.json();
      console.log('📦 Respuesta de venta:', JSON.stringify(saleData, null, 2));

      if (saleData.status === 'APPROVED') {
        console.log('✅ Pago aprobado');
        console.log('💳 ==========================================\n');
        return NextResponse.json({
          success: true,
          transactionId: saleData.orderId || saleData.reference || orderId,
          reference: saleData.reference || orderId,
          status: saleData.status,
          message: 'Pago aprobado',
          currency: currencyCode,
          amount: amount,
        });
      } else {
        console.log('❌ Pago rechazado:', saleData.status);
        console.log('💳 ==========================================\n');
        return NextResponse.json(
          {
            success: false,
            status: saleData.status,
            message: saleData.message || 'Pago rechazado',
          },
          { status: 400 }
        );
      }
    } catch (saleError: any) {
      console.error('❌ Error en la venta:', saleError.message);
      return NextResponse.json(
        { success: false, message: 'Error procesando la venta' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('❌ Error general:', error.message);
    console.error('❌ Stack:', error.stack);
    return NextResponse.json(
      {
        success: false,
        status: 'error',
        message: 'Error procesando el pago',
      },
      { status: 500 }
    );
  }
}