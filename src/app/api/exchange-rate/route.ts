import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.CURRENCY_API_KEY;

    if (!apiKey) {
      console.error('❌ CURRENCY_API_KEY no configurada');
      return NextResponse.json(
        { success: false, message: 'API key no configurada' },
        { status: 500 }
      );
    }

    console.log('💱 Obteniendo tipo de cambio USD/MXN...');

    const response = await fetch(
      `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=MXN&currencies=USD`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error de CurrencyAPI:', response.status, errorText);
      return NextResponse.json(
        { success: false, message: `Error ${response.status} de CurrencyAPI` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('📦 Respuesta completa:', JSON.stringify(data, null, 2));

    // La API devuelve data.data.USD.value = cuántos MXN equivalen a 1 USD
    const usdPerMXN = data?.data?.USD?.value;

    if (!usdPerMXN) {
      console.error('❌ No se encontró el valor de USD en la respuesta');
      return NextResponse.json(
        { success: false, message: 'No se encontró tipo de cambio' },
        { status: 500 }
      );
    }

    console.log('✅ 1 MXN =', usdPerMXN, 'USD');
    console.log('✅ 1 USD =', (1 / usdPerMXN).toFixed(4), 'MXN');

    return NextResponse.json({
      success: true,
      usdPerMXN: usdPerMXN,
      mxnPerUSD: 1 / usdPerMXN,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Error general:', error);
    return NextResponse.json(
      { success: false, message: 'Error obteniendo tipo de cambio' },
      { status: 500 }
    );
  }
}