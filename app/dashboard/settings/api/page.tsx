import { DashboardPageContent, DashboardPageLayout, DashboardPageNavbar } from '@/components/dashboard/DashboardMainLayout'
import ApiCodeBlock from '@/components/settings/api/ApiCodeBlock'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default async function Page() {
  return (
    <DashboardPageLayout>
      <DashboardPageNavbar className="flex items-center justify-end">
        <Link
          href="/dashboard/tickets/new"
          passHref
          className={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          Create ticket
        </Link>
      </DashboardPageNavbar>
      <DashboardPageContent>
        <ApiCodeBlock />
      </DashboardPageContent>
    </DashboardPageLayout>
  )
}