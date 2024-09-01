"use client";

import React from 'react'
import { Button } from "@/components/ui/button"
import { createClient } from '@/utils/supabase/client'

export default function Oauth() {
  const supabase = createClient()
  async function handleSignInWithGoogle() {
    return await supabase.auth.signInWithOAuth({
      provider: "google"
    })
  }

  return (
    <Button
      variant="default"
      type="button"
      onClick={handleSignInWithGoogle}
    >
      Login
    </Button>
  )
}
