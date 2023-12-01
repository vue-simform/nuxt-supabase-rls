import type { Database } from "~/database.types";

export const useSupabase = () => {
    const supabase = useSupabaseClient<Database>();
    return { supabase };
}