"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabaseClient } from '@/utils/supabase/client'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { SignInWithEmailSchema } from '@/utils/schemas/auth';
import { Form, FormField, FormInput, FormItem, FormMessage } from '@/components/ui/form';
import { Github } from 'lucide-react';
import Link from 'next/link';

export default function SignInForm() {
    const form = useForm<z.infer<typeof SignInWithEmailSchema>>({
        resolver: zodResolver(SignInWithEmailSchema)
    })

    async function signInWithGithub() {
        await supabaseClient.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: "http://localhost:3000"
            }
        })
    }

    async function signInWithEmail(formData: z.infer<typeof SignInWithEmailSchema>) {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        })

        if (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <Button variant="secondary" size="sm" className="w-full gap-2" onClick={signInWithGithub}>
                <Github size={16} />
                Sign in with Github
            </Button>
            <hr className="my-2" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(signInWithEmail)} className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormInput type="email" placeholder="Enter your email" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormInput type="password" placeholder="Password" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant="primary" size="sm" className="w-full">
                        Sign in
                    </Button>

                    <div className="flex items-center justify-between gap-5">
                        <Link href="/auth/sign-up" className="text-sm text-secondary transition-colors hover:text-primary">
                            Sign up - It's Free
                        </Link>
                        <Link href="/auth/forgot-password" className="text-sm text-secondary transition-colors hover:text-primary">
                            Forgot password?
                        </Link>
                    </div>

                </form>
            </Form>
        </div>
    )
}