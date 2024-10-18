"use client";
import { TooltipProvider } from '@/components/ui/tooltip';
import React from 'react'

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <TooltipProvider delayDuration={100}>
      {children}
    </TooltipProvider>
  )
}
