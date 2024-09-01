import React, { Suspense } from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { supabaseClient } from '@/utils/supabase/client'
import TicketsTableItem from './TicketsTableItem'
import { headers } from 'next/headers'

async function getTickets(tenantId: string) {
    return await supabaseClient
    .from('tickets')
    .select('*, user_id(id, email, first_name, last_name)')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })
}

export default async function TicketsList() {
    const headersList = headers()
    const tenantId = headersList.get('x-tenant-id')
    const { data: tickets, error } = await getTickets(tenantId as string)

    if (error) {
        console.error(error)
    }

    if (!tickets) {
        return (
            <div>
                <p>No tickets found</p>
            </div>
        )
    }

    return (
        <Suspense fallback={<p>Loading feed...</p>}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Ticket ID</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Created by</TableHead>
                        <TableHead>Created at</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tickets.map((ticket) => (
                        <TicketsTableItem key={ticket.id} ticket={ticket} />
                    ))}
                </TableBody>
            </Table>
        </Suspense>
    )
}
