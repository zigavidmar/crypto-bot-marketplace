import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { headers } from 'next/headers';
import { ChevronDown } from 'lucide-react';
import { supabaseClient } from '@/utils/supabase/client';
import SignOut from '@/components/sign-out';

export default async function UserMenu() {
    const userId = headers().get("x-user-id") as string;

    const { data: user, error } = await supabaseClient
        .from("users")
        .select("email, avatar, first_name, last_name")
        .eq("id", userId)
        .single()
        
    if (error) {
        console.error(error)
    }
        if (user) {
        const { first_name, last_name, email, avatar } = user;
        const userName = first_name && last_name ? `${first_name} ${last_name}` : email
        return (
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-3 text-left h-10">
                    <Image
                        src={avatar || "/avatar-placeholder.png"}
                        alt={userName}
                        width={30}
                        height={30}
                        className="rounded-full"
                    />
                    <p className="text-sm font-medium text-secondary truncate">{userName}</p>
                    <ChevronDown size={20} className="text-secondary" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <SignOut>
                            Logout
                        </SignOut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
}