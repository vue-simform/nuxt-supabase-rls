import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event)

  const { data } = await supabase.from('rls-protected-table').select()

  return { sensitiveData: data }
})
