import Sidemenu from "@/components/dashboard/Sidemenu"
import { Fragment } from "react"

interface OnboardingLayoutProps {
    children: React.ReactNode
}

export default async function DashboardLayout({ children }: OnboardingLayoutProps) {
    return (
        <Fragment>
            <main className="min-h-screen grid grid-cols-[240px_1fr] justify-between h-screen">
                <Sidemenu />
                {children}
            </main>
        </Fragment>
    )
}