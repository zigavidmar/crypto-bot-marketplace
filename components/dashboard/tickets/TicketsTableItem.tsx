"use client";
import { TableCell, TableRow } from '@/components/ui/Table';
import { Ticket } from '@/types/database/tickets'
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React from 'react'

interface TicketsTableItemProps {
    ticket: Ticket;
}

export default function TicketsTableItem({ ticket }: TicketsTableItemProps) {
    const router = useRouter();
    const { user_id: ticketUser } = ticket;

    return (
        <TableRow className="cursor-pointer" key={ticket.id} onClick={() => router.push(`/dashboard/tickets/${ticket.id}`)}>
            <TableCell>#{ticket.id}</TableCell>
            <TableCell>{ticket.subject}</TableCell>
            <TableCell>{ticketUser.email}</TableCell>
            <TableCell>{moment(ticket.created_at).format('DD/MM/YYYY')}</TableCell>
        </TableRow>
    )
}
