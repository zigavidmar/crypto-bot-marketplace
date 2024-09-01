import { DashboardPageContent, DashboardPageLayout, DashboardPageNavbar, DashboardPageNavbarBackButton } from '@/components/dashboard/DashboardMainLayout'
import Ticket from '@/components/dashboard/tickets/Ticket'
import { buttonVariants } from '@/components/ui/button'
import { supabaseClient } from '@/utils/supabase/client'
import Link from 'next/link'

async function getTicket(ticketId: number) {
  return await supabaseClient
    .from('tickets')
    .select('*, user_id(id, email, first_name, last_name), messages(*)')
    .eq('id', ticketId)
    .single()
}

export default async function Page({ params }: { params: { ticketId: string } }) {
  const ticketId = parseInt(params.ticketId)
  const { data: ticket, error } = await getTicket(ticketId)
  console.log("ticket", ticket)
  
  return (
    <DashboardPageLayout>
      <DashboardPageNavbar className="flex items-center justify-between">
        <DashboardPageNavbarBackButton href="/dashboard/tickets">
          Back
        </DashboardPageNavbarBackButton>
        <Link href="/dashboard/tickets/new" passHref className={buttonVariants({ variant: "secondary", size: "sm" })}>
          Create ticket
        </Link>
      </DashboardPageNavbar>
      <DashboardPageContent>
        <Ticket ticket={ticket} />
      </DashboardPageContent>
    </DashboardPageLayout>
  )
}