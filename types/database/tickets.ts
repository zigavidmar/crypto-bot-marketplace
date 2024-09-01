import { Database } from "./supabase";

export type Ticket = Database["public"]["Tables"]["tickets"]["Row"];