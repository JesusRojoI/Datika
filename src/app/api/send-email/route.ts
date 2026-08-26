import { NextResponse } from 'next/server';
import { Resend } from 'resend';

function validateContactData(contactData: any, isEnglish: boolean): { valid: boolean; errorKey?: string } {
  if (!contactData || typeof contactData !== 'object') {
    return { valid: false, errorKey: 'contact.validation_required' };
  }

  const requiredFields = ['fullName', 'company', 'industry', 'solution', 'phone', 'email', 'message'];

  for (const field of requiredFields) {
    if (!contactData[field] || typeof contactData[field] !== 'string' || contactData[field].trim() === '') {
      const fieldErrorMap: Record<string, string> = {
        fullName: 'contact.validation_name_required',
        company: 'contact.validation_company_required',
        industry: 'contact.validation_industry_required',
        solution: 'contact.validation_solution_required',
        phone: 'contact.validation_phone_required',
        email: 'contact.validation_email_required',
        message: 'contact.validation_message_required',
      };
      return { valid: false, errorKey: fieldErrorMap[field] || 'contact.validation_required' };
    }
  }

  const fullName = contactData.fullName.trim();
  if (fullName.length < 2) {
    return { valid: false, errorKey: 'contact.validation_name_min' };
  }

  const company = contactData.company.trim();
  if (company.length < 2) {
    return { valid: false, errorKey: 'contact.validation_company_min' };
  }

  const industry = contactData.industry.trim();
  if (industry.length < 2) {
    return { valid: false, errorKey: 'contact.validation_industry_required' };
  }

  const solution = contactData.solution.trim();
  if (solution.length < 2) {
    return { valid: false, errorKey: 'contact.validation_solution_required' };
  }

  const phone = contactData.phone.replace(/\D/g, '');
  if (phone.length !== 10) {
    return { valid: false, errorKey: 'contact.validation_phone_digits' };
  }
  if (!/^\d{10}$/.test(phone)) {
    return { valid: false, errorKey: 'contact.validation_phone_numbers' };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(contactData.email.trim())) {
    return { valid: false, errorKey: 'contact.validation_email_format' };
  }

  const message = contactData.message.trim();
  if (message.length < 10) {
    return { valid: false, errorKey: 'contact.validation_message_min' };
  }

  return { valid: true };
}

// ==========================================
// RATE LIMIT CON COOKIES
// ==========================================

function getCookie(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

function checkEmailRateLimit(
  request: Request,
  email: string
): { allowed: boolean; remaining?: number; errorKey?: string; cookie?: string } {
  const today = new Date().toISOString().split('T')[0];
  const normalizedEmail = email.trim().toLowerCase();

  const cookieName = 'datika_rate_limit';
  const existingCookie = getCookie(request, cookieName);

  let rateData: Record<string, { count: number; date: string }> = {};

  if (existingCookie) {
    try {
      rateData = JSON.parse(existingCookie);
    } catch {
      rateData = {};
    }
  }

  const key = `${normalizedEmail}_${today}`;
  const current = rateData[key];

  if (!current || current.date !== today) {
    rateData[key] = { count: 1, date: today };
    return {
      allowed: true,
      remaining: 4,
      cookie: JSON.stringify(rateData),
    };
  }

  if (current.count >= 5) {
    return {
      allowed: false,
      remaining: 0,
      errorKey: 'contact.validation_rate_limit',
    };
  }

  current.count += 1;
  rateData[key] = current;

  return {
    allowed: true,
    remaining: 5 - current.count,
    cookie: JSON.stringify(rateData),
  };
}

function getCookieExpiration(): Date {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight;
}

function validatePurchaseData(orderData: any): { valid: boolean; errorKey?: string } {
  if (!orderData || typeof orderData !== 'object') {
    return { valid: false, errorKey: 'common.error' };
  }

  if (!orderData.nombre || typeof orderData.nombre !== 'string' || orderData.nombre.trim() === '') {
    return { valid: false, errorKey: 'common.error' };
  }

  if (!orderData.productos || !Array.isArray(orderData.productos) || orderData.productos.length === 0) {
    return { valid: false, errorKey: 'common.error' };
  }

  // transactionId puede ser string o número
  if (!orderData.transactionId) {
    return { valid: false, errorKey: 'common.error' };
  }

  const transactionIdStr = String(orderData.transactionId);
  if (transactionIdStr.trim() === '') {
    return { valid: false, errorKey: 'common.error' };
  }

  return { valid: true };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      to,
      subject,
      name,
      company,
      email,
      phone,
      message,
      type,
      orderData,
      language,
      contactData,
    } = body;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const isEnglish = language === 'en';

    console.log('📧 ==========================================');
    console.log('📧 INICIO DE ENVÍO DE CORREOS');
    console.log('📧 Tipo:', type);
    console.log('📧 Idioma:', isEnglish ? 'English' : 'Español');
    console.log('📧 ==========================================');

    const forwardEmails = [
      process.env.ADMIN_EMAIL,
      process.env.FORWARD_EMAIL_2,
      process.env.REDIRECTION_EMAIL,
    ].filter(Boolean) as string[];

    console.log('📋 Destinatarios forward configurados:');
    console.log('   • ADMIN_EMAIL:', process.env.ADMIN_EMAIL || '❌ No configurado');
    console.log('   • FORWARD_EMAIL_2:', process.env.FORWARD_EMAIL_2 || '❌ No configurado');
    console.log('   • REDIRECTION_EMAIL:', process.env.REDIRECTION_EMAIL || '❌ No configurado');
    console.log('📋 Total de correos forward a enviar:', forwardEmails.length);

    if (type === 'contact' && contactData) {
      console.log('📨 Procesando formulario de contacto...');

      // ==========================================
      // ANTI-SPAM: Validación de Honeypot
      // ==========================================
      if (contactData.website && contactData.website.length > 0) {
        console.log('🚨 Honeypot detectado en servidor - posible bot');
        console.log('📧 ==========================================\n');
        // Fingir éxito para no alertar al bot
        return NextResponse.json({ success: true });
      }

      // ==========================================
      // ANTI-SPAM: Validación de tiempo mínimo (5 segundos)
      // ==========================================
      if (contactData.formTime && contactData.formTime < 5000) {
        console.log('🚨 Tiempo de llenado sospechoso:', contactData.formTime, 'ms - posible bot');
        console.log('📧 ==========================================\n');
        return NextResponse.json({ success: true });
      }

      // 1. Validar campos obligatorios y formatos
      const validation = validateContactData(contactData, isEnglish);
      if (!validation.valid) {
        console.error('❌ Validación fallida:', validation.errorKey);
        console.log('📧 ==========================================\n');
        return NextResponse.json(
          { success: false, errorKey: validation.errorKey },
          { status: 400 }
        );
      }
      console.log('✅ Validación de campos superada');

      // 2. Verificar límite de envíos por email (con cookies)
      const rateLimit = checkEmailRateLimit(request, contactData.email);
      if (!rateLimit.allowed) {
        console.error('❌ Límite de envíos excedido para:', contactData.email);
        console.log('📧 ==========================================\n');
        return NextResponse.json(
          { success: false, errorKey: rateLimit.errorKey },
          { status: 429 }
        );
      }
      console.log(`✅ Límite de envíos verificado. Envíos restantes hoy: ${rateLimit.remaining}`);

      const normalizedContactData = {
        fullName: contactData.fullName.trim(),
        company: contactData.company.trim(),
        industry: contactData.industry.trim(),
        solution: contactData.solution.trim(),
        phone: contactData.phone.replace(/\D/g, ''),
        email: contactData.email.trim().toLowerCase(),
        message: contactData.message.trim(),
      };

      console.log('   • Nombre:', normalizedContactData.fullName);
      console.log('   • Empresa:', normalizedContactData.company);
      console.log('   • Email:', normalizedContactData.email);
      console.log('   • Teléfono:', normalizedContactData.phone);

      const contactHTML = `
        <div style="font-family:'Manrope',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#003B80,#0056C7);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;">${isEnglish ? 'New Contact Message' : 'Nuevo mensaje de contacto'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p style="font-size:16px;"><strong>${isEnglish ? 'Name:' : 'Nombre:'}</strong> ${normalizedContactData.fullName}</p>
            <p><strong>${isEnglish ? 'Company:' : 'Compañía:'}</strong> ${normalizedContactData.company}</p>
            <p><strong>Email:</strong> ${normalizedContactData.email}</p>
            <p><strong>${isEnglish ? 'Phone:' : 'Teléfono:'}</strong> ${normalizedContactData.phone}</p>
            <p><strong>${isEnglish ? 'Industry:' : 'Industria:'}</strong> ${normalizedContactData.industry}</p>
            <p><strong>${isEnglish ? 'Solution:' : 'Solución:'}</strong> ${normalizedContactData.solution}</p>
            <p><strong>${isEnglish ? 'Message:' : 'Mensaje:'}</strong></p>
            <p style="background:#f1f5f9;padding:15px;border-radius:8px;">${normalizedContactData.message}</p>
          </div>
        </div>`;

      console.log('📤 Enviando correos forward de contacto...');
      for (let i = 0; i < forwardEmails.length; i++) {
        const adminEmail = forwardEmails[i];
        console.log(`   [${i + 1}/${forwardEmails.length}] Enviando forward a: ${adminEmail}`);
        try {
          const result = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'hola@datika.com.mx',
            to: adminEmail,
            subject: isEnglish ? '[FWD] New Contact Message - Datika' : '[FWD] Nuevo mensaje de contacto - Datika',
            html: contactHTML,
          });
          console.log(`   ✅ Forward enviado exitosamente a ${adminEmail}`);
          console.log(`   📝 Response ID: ${result.data?.id || 'N/A'}`);
        } catch (forwardError: any) {
          console.error(`   ❌ Error enviando forward a ${adminEmail}:`, forwardError.message);
        }
      }
      console.log('📤 Forward de contacto completado');

      const clientHTML = `
        <div style="font-family:'Manrope',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#003B80,#0056C7);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;">${isEnglish ? 'Message Received' : 'Mensaje recibido'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p>${isEnglish ? `Hello <strong>${normalizedContactData.fullName}</strong>,` : `Hola <strong>${normalizedContactData.fullName}</strong>,`}</p>
            <p>${isEnglish ? 'We have received your message and will contact you soon.' : 'Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.'}</p>
            <p style="color:#6B7280;">Datika - hola@datika.com.mx</p>
          </div>
        </div>`;

      console.log(`📤 Enviando confirmación al cliente: ${normalizedContactData.email}`);
      try {
        const clientResult = await resend.emails.send({
          from: process.env.EMAIL_FROM || 'hola@datika.com.mx',
          to: normalizedContactData.email,
          subject: isEnglish ? 'Message Received - Datika' : 'Mensaje recibido - Datika',
          html: clientHTML,
        });
        console.log(`✅ Confirmación enviada exitosamente a ${normalizedContactData.email}`);
        console.log(`📝 Response ID: ${clientResult.data?.id || 'N/A'}`);
      } catch (clientError: any) {
        console.error(`❌ Error enviando confirmación al cliente:`, clientError.message);
      }

      const response = NextResponse.json({ success: true });

      if (rateLimit.cookie) {
        response.cookies.set('datika_rate_limit', rateLimit.cookie, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          expires: getCookieExpiration(),
        });
      }

      console.log('✅ Proceso de contacto completado');
      console.log('📧 ==========================================\n');
      return response;
    }

    if (type === 'purchase' && orderData) {
  console.log('🛒 Procesando compra...');

  // Validar datos de compra
  const validation = validatePurchaseData(orderData);
  if (!validation.valid) {
    console.error('❌ Validación de compra fallida:', validation.errorKey);
    console.log('📧 ==========================================\n');
    return NextResponse.json(
      { success: false, errorKey: validation.errorKey },
      { status: 400 }
    );
  }
  console.log('✅ Validación de datos de compra superada');

  // ==========================================
  // DETERMINAR MONEDA
  // ==========================================
  const orderCurrency = orderData.currency || 'MXN';
  const montoFinal = orderData.montoFinal || orderData.total;
  const currencySymbol = orderCurrency === 'USD' ? 'USD' : 'MXN';

  console.log('   • Moneda del pedido:', currencySymbol);
  console.log('   • Monto final:', montoFinal, currencySymbol);

  console.log('   • Cliente:', orderData.nombre);
  console.log('   • Email destino:', to);
  console.log('   • Transacción:', orderData.transactionId);
  console.log('   • Productos:', orderData.productos.length);

  // Convertir precios de productos a la moneda correcta
  const productosHTML = orderData.productos
    .map((p: any) => {
      // Si el pago fue en USD, convertir el precio del producto
      const precioProducto = currencySymbol === 'USD' 
        ? p.precio * (orderData.usdPerMXN || 0.055) 
        : p.precio;
      
      return `<tr><td style="padding:8px;border-bottom:1px solid rgba(0,59,128,0.2);color:#1F2937;">${p.nombre} × ${p.cantidad}</td><td style="padding:8px;border-bottom:1px solid rgba(0,59,128,0.2);text-align:right;color:#003B80;">$${precioProducto.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currencySymbol}</td></tr>`;
    })
    .join('');

  const emailHTML = `
    <div style="font-family:'Manrope',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#003B80,#0056C7);padding:30px;text-align:center;">
        <h1 style="color:#f8fafc;margin:0;font-size:24px;">${isEnglish ? 'Purchase Confirmed!' : '¡Compra confirmada!'}</h1>
      </div>
      <div style="padding:30px;color:#1F2937;">
        <p style="font-size:16px;">${isEnglish ? `Hello <strong style="color:#003B80;">${orderData.nombre}</strong>,` : `Hola <strong style="color:#003B80;">${orderData.nombre}</strong>,`}</p>
        <p>${isEnglish ? 'Your order has been processed successfully.' : 'Tu pedido ha sido procesado correctamente.'}</p>
        <h2 style="color:#1F2937;font-size:18px;border-bottom:2px solid #003B80;padding-bottom:8px;">${isEnglish ? 'Order Summary' : 'Resumen de tu pedido'}</h2>
        <table style="width:100%;border-collapse:collapse;">${productosHTML}</table>
        <div style="margin-top:20px;padding:20px;background:#E8F0FE;border-radius:8px;border:1px solid rgba(0,59,128,0.2);">
          <p><strong>${isEnglish ? 'Subtotal:' : 'Subtotal:'}</strong> <span style="color:#003B80;">$${montoFinal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currencySymbol}</span></p>
          <p><strong>${isEnglish ? 'VAT (16%):' : 'IVA (16%):'}</strong> <span style="color:#003B80;">$${(montoFinal * 0.16 / 1.16).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currencySymbol}</span></p>
          <p style="font-size:18px;"><strong>${isEnglish ? 'Total:' : 'Total:'}</strong> <span style="color:#003B80;">$${montoFinal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currencySymbol}</span></p>
        </div>
        <p style="color:#6B7280;"><strong>${isEnglish ? 'Transaction:' : 'Transacción:'}</strong> ${orderData.transactionId}</p>
        <p>${isEnglish ? 'Thank you for your purchase at' : 'Gracias por tu compra en'} <strong style="color:#003B80;">Datika</strong>.</p>
      </div>
      <div style="background:#E8F0FE;padding:20px;text-align:center;border-top:1px solid rgba(0,59,128,0.1);">
        <p style="color:#6B7280;font-size:12px;margin:0;">Datika - hola@datika.com.mx</p>
      </div>
    </div>`;

  // Email al cliente
  console.log(`📤 Enviando confirmación de compra al cliente: ${to}`);
  try {
    const clientResult = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'hola@datika.com.mx',
      to: to,
      subject: isEnglish ? 'Purchase Confirmed! - Datika' : '¡Compra confirmada! - Datika',
      html: emailHTML,
    });
    console.log(`✅ Confirmación de compra enviada exitosamente a ${to}`);
    console.log(`📝 Response ID: ${clientResult.data?.id || 'N/A'}`);
  } catch (clientError: any) {
    console.error(`❌ Error enviando confirmación al cliente:`, clientError.message);
  }

  // Forward a todos los correos configurados
  console.log('📤 Enviando correos forward de compra...');
  for (let i = 0; i < forwardEmails.length; i++) {
    const adminEmail = forwardEmails[i];
    console.log(`   [${i + 1}/${forwardEmails.length}] Enviando forward a: ${adminEmail}`);
    try {
      const result = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'hola@datika.com.mx',
        to: adminEmail,
        subject: isEnglish
          ? `[FWD] New Purchase - ${orderData.nombre}`
          : `[FWD] Nueva compra - ${orderData.nombre}`,
        html: `<div style="font-family:'Manrope',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:12px;overflow:hidden;"><div style="background:#003B80;padding:20px;"><h2 style="color:#f8fafc;margin:0;">${isEnglish ? 'New Purchase' : 'Nueva compra'}</h2></div><div style="padding:20px;"><p><strong>${isEnglish ? 'Customer:' : 'Cliente:'}</strong> ${orderData.nombre}</p><p><strong>Total:</strong> <span style="color:#003B80;">$${montoFinal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currencySymbol}</span></p></div>${emailHTML}</div>`,
      });
      console.log(`   ✅ Forward enviado exitosamente a ${adminEmail}`);
      console.log(`   📝 Response ID: ${result.data?.id || 'N/A'}`);
    } catch (forwardError: any) {
      console.error(`   ❌ Error enviando forward a ${adminEmail}:`, forwardError.message);
    }
  }
  console.log('📤 Forward de compra completado');
  console.log('✅ Proceso de compra completado');
  console.log('📧 ==========================================\n');

  return NextResponse.json({ success: true });
}

    console.log('⚠️ Tipo de correo no reconocido:', type);
    console.log('📧 ==========================================\n');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ ==========================================');
    console.error('❌ ERROR GENERAL EN ENVÍO DE CORREOS:');
    console.error('❌ ==========================================');
    console.error('❌ Error:', error);
    console.error('❌ Stack:', error instanceof Error ? error.stack : 'N/A');
    console.error('❌ ==========================================\n');
    return NextResponse.json(
      { success: false, errorKey: 'common.error' },
      { status: 500 }
    );
  }
}