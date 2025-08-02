import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Crewmate = {
  id: string
  name: string
  speed: number
  color: string
  category: string
  created_at: string
}

export type CrewmateCreate = Omit<Crewmate, 'id' | 'created_at'>
export type CrewmateUpdate = Partial<CrewmateCreate>