import { cookies } from 'next/headers';

export default function isUserLoggedIn(): boolean {
    let isLoggedIn = false;
    /* https://eaqaukylayedqrmxbxtz.supabase.co -> eaqaukylayedqrmxbxtz */
    const supabaseTenantId = process.env.NEXT_PUBLIC_SUPABASE_URL?.split(".")[0].split("//")[1] as string;
    const cookieStore = cookies()
    const cookiesList = cookieStore.getAll();

    cookiesList.forEach(cookie => {
        if (cookie.name.includes(supabaseTenantId)) {
            isLoggedIn = true;
        }
    });

    return isLoggedIn;
}
