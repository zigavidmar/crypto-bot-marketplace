import { DashboardPageContent, DashboardPageLayout, DashboardPageNavbar, DashboardPageNavbarBackButton } from '@/components/dashboard/DashboardMainLayout'
import TicketForm from '@/components/dashboard/tickets/TicketForm'
import { headers } from 'next/headers';
export const fetchCache = 'force-no-store';

export default async function Page() {
  const tenantId = headers().get('x-tenant-id') as string;

  return (
    <DashboardPageLayout>
      <DashboardPageNavbar className="flex items-center justify-between">
        <DashboardPageNavbarBackButton href="/dashboard/tickets">
          Back
        </DashboardPageNavbarBackButton>
      </DashboardPageNavbar>
      <DashboardPageContent>
        <TicketForm tenantId={tenantId}/>

      </DashboardPageContent>
    </DashboardPageLayout>
  )
}