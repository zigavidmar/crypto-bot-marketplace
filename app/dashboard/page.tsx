import { DashboardPageContent, DashboardPageLayout, DashboardPageNavbar } from '@/components/dashboard/DashboardMainLayout'
import TicketsTable from '@/components/dashboard/tickets/TicketsTable'
import {  buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default async function Page() {
  return (
    <DashboardPageLayout>
      <DashboardPageNavbar className="flex items-center justify-end">
        <Link href="/dashboard/tickets/new" passHref className={buttonVariants({ variant: "secondary", size: "sm" })}>
          Create ticket
        </Link>
      </DashboardPageNavbar>
      <DashboardPageContent>
        <TicketsTable />

      </DashboardPageContent>
    </DashboardPageLayout>
  )
}