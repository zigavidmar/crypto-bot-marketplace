
import { Database } from "@/types/supabase";
import { createBrowserClient } from "@supabase/ssr";

const createClient = () => {
    return createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
}

const supabaseClient = createClient()

export { supabaseClient, createClient }

