"use client";
import React from 'react'
import Link from 'next/link'
import { Settings, Ticket } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function GeneralLinks() {
    const linkIconClass = "text-secondary group-hover:text-primary transition-colors"
    return (
        <div className="flex flex-col gap-1">
            <SidemenuLink href="/dashboard/tickets" label="Tickets">
                <Ticket size={20} className={linkIconClass} />
            </SidemenuLink>
            <SidemenuLink href="/dashboard/settings/api" label="Settings">
                <Settings size={20} className={linkIconClass} />
            </SidemenuLink>
        </div>
    )
}

interface SidemenuLinkProps {
    children: React.ReactNode;
    href: string;
    label?: string;
}

function SidemenuLink({ children, href, label }: SidemenuLinkProps) {
    const pathname = usePathname()
    const isLinkActive = href === pathname;

    return (
        <Link
            href={href}
            passHref
            className={cn(
                "py-2 px-2 group flex items-center gap-3 rounded-2xl transition-colors rounded-md hover:bg-[#e9eaec]",
                isLinkActive ? "bg-[#e9eaec] text-primary" : "text-secondary"
            )}>
            {children}
            {label && <span className="text-sm font-medium text-secondary transition-colors group-hover:text-primary">{label}</span>}
        </Link>
    )
}