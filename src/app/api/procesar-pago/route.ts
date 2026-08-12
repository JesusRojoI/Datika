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

    if (!etominUser || !etominPassword) {
      console.error('ETOMIN credentials not found');
      return NextResponse.json(
        { success: false, message: 'Payment configuration incomplete' },
        { status: 500 }
      );
    }

    const amount = Number(monto);
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid amount' },
        { status: 400 }
      );
    }

    // 1. Authenticate with Etomin
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
      throw new Error(errorData.message || 'Authentication error');
    }

    const authData = await authResponse.json();
    const authToken = authData.authToken;

    if (!authToken) {
      return NextResponse.json(
        { success: false, message: 'Token not received' },
        { status: 500 }
      );
    }

    // 2. Tokenize card
    const [month, year] = fechaTarjeta.split('/');

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
      throw new Error(errorData.message || 'Card tokenization error');
    }

    const tokenData = await tokenResponse.json();
    const cardToken = tokenData.cardNumberToken;

    if (!cardToken) {
      return NextResponse.json(
        { success: false, message: 'Could not tokenize card' },
        { status: 400 }
      );
    }

    // 3. Process sale
    const orderId = 'TXN-' + Date.now();

    const saleResponse = await fetch(`${API_URL}/sale`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        amount: amount,
        currency: '484',
        reference: orderId,
        customerInformation: {
          firstName: (nombre || 'Customer').trim(),
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

    if (saleData.status === 'APPROVED') {
      return NextResponse.json({
        success: true,
        transactionId: saleData.orderId || saleData.reference || orderId,
        reference: saleData.reference || orderId,
        status: saleData.status,
        message: 'Payment approved',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          status: saleData.status,
          message: saleData.message || 'Payment declined',
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Payment error:', error.message);
    return NextResponse.json(
      {
        success: false,
        status: 'error',
        message: 'Error processing payment',
      },
      { status: 500 }
    );
  }
}