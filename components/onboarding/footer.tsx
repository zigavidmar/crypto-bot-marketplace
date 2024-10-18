import { PLATFORM_NAME } from '@/constants/common'
import Link from 'next/link'
import React from 'react'

export default function OnboardingFooter() {
  return (
    <footer className="w-full flex items-center justify-center gap-4 py-6">
      <p className="text-xs text-secondary">© 2024 {PLATFORM_NAME}</p>
      <Link href="/terms" passHref className="text-xs underline text-secondary hover:text-primary transition-colors">
        Terms
      </Link>
      <Link href="/privacy" passHref className="text-xs underline text-secondary hover:text-primary transition-colors">
        Privacy
      </Link>
    </footer>
  )
}
