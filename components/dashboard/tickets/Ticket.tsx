import { Ticket as TicketType } from '@/types/database/tickets'
import React, { Suspense } from 'react'
import TicketFiles from './Ticket/Files';
import TicketReplyForm from './Ticket/ReplyForm';
import TicketMessages from './Ticket/Messages';

interface TicketProps {
    ticket: TicketType | null;
}

export default async function Ticket({ ticket }: TicketProps) {
    if (!ticket) {
        return (
            <div>
                <p>No ticket found</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-[1fr_2fr] gap-4 h-full">
            <div>
                <p>{ticket.subject}</p>
                <Suspense fallback={<p>Loading files...</p>}>
                    <TicketFiles ticketId={ticket.id} />
                </Suspense>
            </div>
            <div className="h-full flex flex-col justify-between gap-10">
                <TicketMessages ticket={ticket}/>
                <TicketReplyForm />
            </div>
        </div>
    )
}