import type { APIRoute } from "astro";
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const email = data.get('email')?.toString();

    // 1. Validación básica en servidor
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({
        message: "Email inválido"
      }), { status: 400 });
    }

    // 2. Enviar con Resend (Audience ID es opcional, depende de tu setup)
    // Opción A: Enviar un correo de confirmación
    // Opción B: Añadir a una audiencia (Contactos)
    
    const sendResult = await resend.contacts.create({
      email: email,
      firstName: '', // Opcional si lo recogieras
      unsubscribed: false,
      audienceId: import.meta.env.RESEND_AUDIENCE_ID, // ID de tu audiencia en Resend
    });

    if (sendResult.error) {
      return new Response(JSON.stringify({ 
        message: sendResult.error.message 
      }), { status: 500 });
    }

    return new Response(JSON.stringify({
      message: "¡Suscrito correctamente!"
    }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      message: "Error interno del servidor"
    }), { status: 500 });
  }
};