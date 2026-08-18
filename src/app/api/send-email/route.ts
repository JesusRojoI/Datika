import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

    // Forward emails desde variables de entorno
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
      console.log('   • Nombre:', contactData.fullName);
      console.log('   • Empresa:', contactData.company);
      console.log('   • Email:', contactData.email);

      const contactHTML = `
        <div style="font-family:'Manrope',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#003B80,#0056C7);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;">${isEnglish ? 'New Contact Message' : 'Nuevo mensaje de contacto'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p style="font-size:16px;"><strong>${isEnglish ? 'Name:' : 'Nombre:'}</strong> ${contactData.fullName}</p>
            <p><strong>${isEnglish ? 'Company:' : 'Compañía:'}</strong> ${contactData.company}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>${isEnglish ? 'Phone:' : 'Teléfono:'}</strong> ${contactData.phone}</p>
            <p><strong>${isEnglish ? 'Industry:' : 'Industria:'}</strong> ${contactData.industry}</p>
            <p><strong>${isEnglish ? 'Solution:' : 'Solución:'}</strong> ${contactData.solution}</p>
            <p><strong>${isEnglish ? 'Message:' : 'Mensaje:'}</strong></p>
            <p style="background:#f1f5f9;padding:15px;border-radius:8px;">${contactData.message}</p>
          </div>
        </div>`;

      // Forward a cada destinatario configurado
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
          console.error('   Detalles:', forwardError.response?.data || forwardError);
        }
      }
      console.log('📤 Forward de contacto completado');

      const clientHTML = `
        <div style="font-family:'Manrope',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#003B80,#0056C7);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;">${isEnglish ? 'Message Received' : 'Mensaje recibido'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p>${isEnglish ? `Hello <strong>${contactData.fullName}</strong>,` : `Hola <strong>${contactData.fullName}</strong>,`}</p>
            <p>${isEnglish ? 'We have received your message and will contact you soon.' : 'Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.'}</p>
            <p style="color:#6B7280;">Datika - hola@datika.com.mx</p>
          </div>
        </div>`;

      console.log(`📤 Enviando confirmación al cliente: ${contactData.email}`);
      try {
        const clientResult = await resend.emails.send({
          from: process.env.EMAIL_FROM || 'hola@datika.com.mx',
          to: contactData.email,
          subject: isEnglish ? 'Message Received - Datika' : 'Mensaje recibido - Datika',
          html: clientHTML,
        });
        console.log(`✅ Confirmación enviada exitosamente a ${contactData.email}`);
        console.log(`📝 Response ID: ${clientResult.data?.id || 'N/A'}`);
      } catch (clientError: any) {
        console.error(`❌ Error enviando confirmación al cliente:`, clientError.message);
      }

      console.log('✅ Proceso de contacto completado');
      console.log('📧 ==========================================\n');
      return NextResponse.json({ success: true });
    }

    if (type === 'purchase' && orderData) {
      console.log('🛒 Procesando compra...');
      console.log('   • Cliente:', orderData.nombre);
      console.log('   • Email destino:', to);
      console.log('   • Total:', orderData.total.toFixed(2), 'MXN');
      console.log('   • Transacción:', orderData.transactionId);
      console.log('   • Productos:', orderData.productos.length);

      const productosHTML = orderData.productos
        .map(
          (p: any) =>
            `<tr><td style="padding:8px;border-bottom:1px solid rgba(0,59,128,0.2);color:#1F2937;">${p.nombre} × ${p.cantidad}</td><td style="padding:8px;border-bottom:1px solid rgba(0,59,128,0.2);text-align:right;color:#003B80;">$${p.precio.toFixed(2)}</td></tr>`
        )
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
              <p><strong>${isEnglish ? 'Subtotal:' : 'Subtotal:'}</strong> <span style="color:#003B80;">$${orderData.subtotal.toFixed(2)}</span></p>
              ${orderData.descuento > 0 ? `<p><strong>${isEnglish ? 'Discount:' : 'Descuento:'}</strong> <span style="color:#EF4444;">-$${orderData.descuento.toFixed(2)}</span></p>` : ''}
              <p><strong>${isEnglish ? 'VAT (16%):' : 'IVA (16%):'}</strong> <span style="color:#003B80;">$${orderData.impuesto.toFixed(2)}</span></p>
              <p style="font-size:18px;"><strong>${isEnglish ? 'Total:' : 'Total:'}</strong> <span style="color:#003B80;">$${orderData.total.toFixed(2)} <span style="font-size:14px;">MXN</span></span></p>
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
            html: `<div style="font-family:'Manrope',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:12px;overflow:hidden;"><div style="background:#003B80;padding:20px;"><h2 style="color:#f8fafc;margin:0;">${isEnglish ? 'New Purchase' : 'Nueva compra'}</h2></div><div style="padding:20px;"><p><strong>${isEnglish ? 'Customer:' : 'Cliente:'}</strong> ${orderData.nombre}</p><p><strong>Total:</strong> <span style="color:#003B80;">$${orderData.total.toFixed(2)} MXN</span></p></div>${emailHTML}</div>`,
          });
          console.log(`   ✅ Forward enviado exitosamente a ${adminEmail}`);
          console.log(`   📝 Response ID: ${result.data?.id || 'N/A'}`);
        } catch (forwardError: any) {
          console.error(`   ❌ Error enviando forward a ${adminEmail}:`, forwardError.message);
          console.error('   Detalles:', forwardError.response?.data || forwardError);
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
    return NextResponse.json({ success: false }, { status: 500 });
  }
}