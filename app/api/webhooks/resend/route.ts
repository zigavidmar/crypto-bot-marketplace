export async function POST(request: Request) {
    // onst { event, data } = req.body;
    const { event, data } = request.body
    console.log("event", event)
    console.log("data", data)
    switch (event) {
        case 'email.delivered':
            // Handle email delivered event
            // await handleEmailDelivered(data);
            break;
        case 'email.failed':
            // Handle email failed event
            // await handleEmailFailed(data);
            break;
        case 'email.reply':
            // Handle incoming email reply
            await handleEmailReply(data);
            break;
        default:
            console.warn('Unhandled webhook event:', event);
    }

    return new Response('OK', {
        status: 200,
    })
}

// Example handler function for incoming email reply
async function handleEmailReply(data) {
    const { email_id, from, body } = data;

    // Find the related ticket by email_id
    const { data: email, error } = await supabaseClient
        .from('emails')
        .select('ticket_id')
        .eq('email_id', email_id)
        .single();

    if (error || !email) {
        console.error('Error finding email by ID:', error);
        return;
    }

    const ticketId = email.ticket_id;

    // Insert the reply as a new message in the messages table
    const { error: messageError } = await supabaseClient
        .from('messages')
        .insert({
            ticket_id: ticketId,
            sender_id: null, // If the reply is from a customer, you may set it to null or handle differently
            message: body,
            created_at: new Date(),
        });

    if (messageError) {
        console.error('Error inserting message:', messageError);
    }
}