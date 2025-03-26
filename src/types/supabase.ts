export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          role: string | null
          bio: string | null
          location: string | null
          interests: string[] | null
          active_projects: {
            name: string
            description: string
            status: 'planning' | 'in-progress' | 'launched'
          }[] | null
          communities: string[] | null
          onboarding_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          role?: string | null
          bio?: string | null
          location?: string | null
          interests?: string[] | null
          active_projects?: Json | null
          communities?: string[] | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          role?: string | null
          bio?: string | null
          location?: string | null
          interests?: string[] | null
          active_projects?: Json | null
          communities?: string[] | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}