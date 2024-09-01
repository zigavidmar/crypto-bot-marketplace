import { Database } from "./supabase";

export type Tenant = Database["public"]["Tables"]["tenants"]["Row"];