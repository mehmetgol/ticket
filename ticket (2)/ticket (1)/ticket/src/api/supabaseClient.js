import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ymutnueoeqemsawwdvup.supabase.co'
const supabaseKey = 'sb_publishable_KWgmbM8xefag_5avyLlVFw_6PbokuYn'

export const supabase = createClient(supabaseUrl, supabaseKey)