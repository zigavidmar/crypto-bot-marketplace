import resend from "@/utils/resend";
import { supabaseClient } from "@/utils/supabase/client"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[];
    const subject = formData.get('subject')
    const content = formData.get('content')
    const email = formData.get('email')
    const tenantId = formData.get('tenant_id')

    if (!subject) {
        return new Response('Subject is required', {
            status: 400,
        })
    }

    if (!email) {
        return new Response('Email is required', {
            status: 400,
        })
    }

    /* 
        Find user by email
    */
    const { data: user, error: userError } = await supabaseClient
        .from('users')
        .select('id')
        .eq('email', email)
        .single()

    /* 
        If there is no user with the provided email, create an anonymous user
    */
    if (userError) {
        const supabaseServer = createClient(cookies());
        const { data, error } = await supabaseServer.auth.signInAnonymously({
            options: {
                // captchaToken: 'captcha-token', // replace with actual captcha
                data: {
                    email,
                }
            }
        })

        if (error) {
            return new Response(`Error: ${error.message}`, {
                status: error.status,
            })
        }

        if (!data.user) {
            return new Response('Error: User not created', {
                status: 400,
            })
        }

        if (data.user) {
            return insertTicketToDatabase({ subject, content, userId: data.user.id, files, email, tenantId })
        }
    }

    return insertTicketToDatabase({ subject, content, userId: user.id, files, email, tenantId })
}

interface TicketFormData {
    subject: string;
    userId: string;
    files: File[];
    email: string;
    content: string;
    tenantId: string;
}

async function insertTicketToDatabase({ subject, userId, files, email, tenantId, content }: TicketFormData) {
    const { data, error } = await supabaseClient
        .from('tickets')
        .insert({
            subject,
            user_id: userId,
            tenant_id: tenantId,
        })
        .select('id')
        .single()

    if (error) {
        return new Response(`Error: ${error.message}`, {
            status: 400,
        })
    }

    if (data) {
        // Insert message to database
        const { data: messageData, error: messageError } = await supabaseClient
            .from("messages")
            .insert({
                ticket_id: data.id,
                sender_id: userId,
                content
            })
            .select('*')
            .single()

        if (messageError) {
            return new Response(`Error: ${messageError.message}`, {
                status: 400,
            })
        }

        console.log("messageData", messageData)

        if (files && files.length > 0) {
            await Promise.all(files.map(file => uploadFile(file, data.id)));
        }

        await sendConfirmationEmailToUser(email);

        return new Response(JSON.stringify(data), {
            status: 201,
        })
    }
}

async function uploadFile(file: File, ticketId: number) {
    const { data, error } = await supabaseClient.storage.from("files").upload(`/${ticketId}/${file.name}`, file, {
        cacheControl: "3600",
        upsert: true
    })

    if (error) {
        return new Response(`Error: ${error.message}`, {
            status: 400,
        })
    }

    return data
}

async function sendConfirmationEmailToUser(email: string) {
    // Send confirmation email to user
    // ...
    const { data, error } = await resend.emails.send({
        from: 'Predictum <onboarding@resend.dev>',
        to: ["zigavidmar96@gmail.com"],
        subject: 'Ticket created',
        html: `
                <p>We have received your ticket and will get back to you shortly.</p>
            `
    });

    if (error) {
        console.error('Error sending email:', error)
    }

    return data
}