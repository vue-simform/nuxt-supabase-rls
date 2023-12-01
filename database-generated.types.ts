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
      org_project: {
        Row: {
          org_id: number
          project_id: number
        }
        Insert: {
          org_id: number
          project_id: number
        }
        Update: {
          org_id?: number
          project_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "org_project_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["org_id"]
          },
          {
            foreignKeyName: "org_project_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          }
        ]
      }
      organisations: {
        Row: {
          org_id: number
          org_name: string
        }
        Insert: {
          org_id?: number
          org_name: string
        }
        Update: {
          org_id?: number
          org_name?: string
        }
        Relationships: []
      }
      project_user: {
        Row: {
          project_id: number
          user_id: string
        }
        Insert: {
          project_id: number
          user_id: string
        }
        Update: {
          project_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_user_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          is_public: boolean | null
          project_id: number
          project_name: string
        }
        Insert: {
          is_public?: boolean | null
          project_id?: number
          project_name: string
        }
        Update: {
          is_public?: boolean | null
          project_id?: number
          project_name?: string
        }
        Relationships: []
      }
      user_organisation: {
        Row: {
          org_id: number
          role: string | null
          user_id: string
        }
        Insert: {
          org_id: number
          role?: string | null
          user_id: string
        }
        Update: {
          org_id?: number
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_organisation_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["org_id"]
          },
          {
            foreignKeyName: "user_organisation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
