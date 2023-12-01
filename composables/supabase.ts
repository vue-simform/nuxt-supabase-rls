import type { Database } from "~/database-generated.types";

export const useSupabase = () => {
    const supabase = useSupabaseClient<Database>();
    return { supabase };
}