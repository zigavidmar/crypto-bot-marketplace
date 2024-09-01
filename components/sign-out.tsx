"use client";
import { supabaseClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import React from 'react'

interface SignOutProps {
  children: React.ReactNode;
}

export default function SignOut({ children, ...props }: SignOutProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const router = useRouter()

  async function handleSignOut() {
    await supabaseClient.auth.signOut()
    router.push('/')
  }

  return (
    <button type="button" className={props.className} onClick={handleSignOut}>
      {children}
    </button>
  )
}
