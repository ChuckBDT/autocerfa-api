import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const secretKey = process.env.SUPABASE_PRIVATE_KEY

const supaClient = !supabaseUrl || !secretKey ? null : createClient(supabaseUrl, secretKey)

export default supaClient
