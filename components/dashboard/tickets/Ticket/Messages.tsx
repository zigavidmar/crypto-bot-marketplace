import { Message as MessageType } from '@/types/database/messages';
import { Ticket } from '@/types/database/tickets';
import React from 'react'

interface TicketMessagesProps {
  ticket: Ticket & { messages: MessageType[] };
}

export default function TicketMessages({ ticket }: TicketMessagesProps) {
  return (
    <div className="bg-background h-full rounded-xl">
      <div className="p-4">
        <h2 className="text-xl font-semibold">Messages</h2>
        <div className="flex flex-col gap-4 mt-4">
          {ticket.messages.map(message => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Message({ message }: { message: MessageType }) {
  const { id, sender_id, content, created_at } = message;
  return (
    <div>
      <p>{content}</p>
    </div>
  )
}