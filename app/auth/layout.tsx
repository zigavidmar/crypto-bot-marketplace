import OnboardingFooter from "@/components/onboarding/Footer"
import OnboardingHeader from "@/components/onboarding/Header"

interface OnboardingLayoutProps {
    children: React.ReactNode
}

export default async function OnboardingLayout({ children }: OnboardingLayoutProps) {
    return (
        <main className="min-h-screen flex flex-col justify-between gap-5 h-screen">
            <OnboardingHeader />
            {children}
            <OnboardingFooter />
        </main>
    )
}