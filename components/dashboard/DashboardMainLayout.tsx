import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface DashboardLayoutBaseProps {
    children: React.ReactNode;
}

function DashboardPageLayout({ children, className, ...props }: DashboardLayoutBaseProps & React.HTMLProps<HTMLDivElement>) {
    return (
        <div className={cn("pr-5 h-screen flex flex-col", className)} {...props}>
            {children}
        </div>
    )
}

function DashboardPageNavbar({ children, className, ...props }: DashboardLayoutBaseProps & React.HTMLProps<HTMLDivElement>) {
    return (
        <div className={cn("sticky top-0 py-3", className)} {...props}>
            {children}
        </div>
    )
}

function DashboardPageNavbarBackButton({ children, href, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <Link href={href as string} className={cn("flex h-8 items-center gap-2 border px-2 py-1 text-secondary rounded-lg text-sm", className)} {...props}>
            <ArrowLeft size={20} className="text-secondary" />
            {children}
        </Link>
    )
}

function DashboardPageContent({ children, className, ...props }: DashboardLayoutBaseProps & React.HTMLProps<HTMLDivElement>) {
    return (
        <div className={cn("border rounded-t-lg bg-white h-full border-b-0 p-5", className)} {...props}>
            {children}
        </div>
    )
}

export {
    DashboardPageLayout,
    DashboardPageNavbar,
    DashboardPageNavbarBackButton,
    DashboardPageContent
}