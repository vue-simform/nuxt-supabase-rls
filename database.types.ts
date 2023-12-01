import type  { Database as DatabaseGenerated } from './database-generated.types'


export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Database = DatabaseGenerated;
