export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          cert_url: string | null
          certificate_id: string | null
          cohort_id: string | null
          created_at: string
          id: string
          issuer_id: string | null
          serial: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          cert_url?: string | null
          certificate_id?: string | null
          cohort_id?: string | null
          created_at?: string
          id?: string
          issuer_id?: string | null
          serial?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          cert_url?: string | null
          certificate_id?: string | null
          cohort_id?: string | null
          created_at?: string
          id?: string
          issuer_id?: string | null
          serial?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "achievements_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "issued_certificates_certificate_id_fkey"
            columns: ["certificate_id"]
            isOneToOne: false
            referencedRelation: "certificates"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          active: boolean | null
          course_id: string | null
          created_at: string
          id: string
          name: string | null
          template: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          course_id?: string | null
          created_at?: string
          id?: string
          name?: string | null
          template?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          course_id?: string | null
          created_at?: string
          id?: string
          name?: string | null
          template?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      cohorts: {
        Row: {
          course_id: string | null
          created_at: string
          description: string | null
          end_at: string | null
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          end_at?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          end_at?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cohorts_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          about: string | null
          cover: string | null
          created_at: string
          description: string | null
          id: string
          name: string | null
          status: string | null
          thumb: string | null
          updated_at: string | null
        }
        Insert: {
          about?: string | null
          cover?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          status?: string | null
          thumb?: string | null
          updated_at?: string | null
        }
        Update: {
          about?: string | null
          cover?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          status?: string | null
          thumb?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          cohort_id: string | null
          created_at: string
          id: string
          profile_id: string | null
          updated_at: string | null
        }
        Insert: {
          cohort_id?: string | null
          created_at?: string
          id?: string
          profile_id?: string | null
          updated_at?: string | null
        }
        Update: {
          cohort_id?: string | null
          created_at?: string
          id?: string
          profile_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      levels: {
        Row: {
          course_id: string | null
          created_at: string
          description: string | null
          id: string
          name: string | null
          number: number | null
          unlock_at: string | null
          updated_at: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          number?: number | null
          unlock_at?: string | null
          updated_at?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          number?: number | null
          unlock_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "levels_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      recordings: {
        Row: {
          content_type: string | null
          created_at: string
          default: boolean | null
          filename: string | null
          id: string
          room_id: string | null
          size: number | null
          updated_at: string | null
        }
        Insert: {
          content_type?: string | null
          created_at?: string
          default?: boolean | null
          filename?: string | null
          id?: string
          room_id?: string | null
          size?: number | null
          updated_at?: string | null
        }
        Update: {
          content_type?: string | null
          created_at?: string
          default?: boolean | null
          filename?: string | null
          id?: string
          room_id?: string | null
          size?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recordings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          active: boolean | null
          created_at: string
          id: string
          room_end_at: string | null
          room_id: string | null
          room_key: string | null
          room_name: string | null
          room_start_at: string | null
          room_url: string | null
          status: string | null
          target_id: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          id?: string
          room_end_at?: string | null
          room_id?: string | null
          room_key?: string | null
          room_name?: string | null
          room_start_at?: string | null
          room_url?: string | null
          status?: string | null
          target_id?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string
          id?: string
          room_end_at?: string | null
          room_id?: string | null
          room_key?: string | null
          room_name?: string | null
          room_start_at?: string | null
          room_url?: string | null
          status?: string | null
          target_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rooms_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "targets"
            referencedColumns: ["id"]
          },
        ]
      }
      target_groups: {
        Row: {
          archived: boolean | null
          created_at: string
          description: string | null
          id: string
          level_id: string | null
          milestone: boolean | null
          name: string | null
          sort_index: number | null
          updated_at: string | null
          visibility: string | null
        }
        Insert: {
          archived?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          level_id?: string | null
          milestone?: boolean | null
          name?: string | null
          sort_index?: number | null
          updated_at?: string | null
          visibility?: string | null
        }
        Update: {
          archived?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          level_id?: string | null
          milestone?: boolean | null
          name?: string | null
          sort_index?: number | null
          updated_at?: string | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "target_groups_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
        ]
      }
      targets: {
        Row: {
          archived: boolean | null
          content: string | null
          created_at: string
          description: string | null
          id: string
          is_workshop: boolean | null
          link_to_complete: string | null
          name: string | null
          sort_index: number | null
          target_group_id: string | null
          updated_at: string | null
          visibility: string | null
        }
        Insert: {
          archived?: boolean | null
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_workshop?: boolean | null
          link_to_complete?: string | null
          name?: string | null
          sort_index?: number | null
          target_group_id?: string | null
          updated_at?: string | null
          visibility?: string | null
        }
        Update: {
          archived?: boolean | null
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_workshop?: boolean | null
          link_to_complete?: string | null
          name?: string | null
          sort_index?: number | null
          target_group_id?: string | null
          updated_at?: string | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "targets_target_group_id_fkey"
            columns: ["target_group_id"]
            isOneToOne: false
            referencedRelation: "target_groups"
            referencedColumns: ["id"]
          },
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
      bounce_type: "soft" | "hard" | "complaint"
      campaign_status:
        | "draft"
        | "running"
        | "scheduled"
        | "paused"
        | "cancelled"
        | "finished"
      campaign_type: "regular" | "optin"
      content_type: "richtext" | "html" | "plain" | "markdown"
      list_optin: "single" | "double"
      list_type: "public" | "private" | "temporary"
      subscriber_status: "enabled" | "disabled" | "blocklisted"
      subscription_status: "unconfirmed" | "confirmed" | "unsubscribed"
      template_type: "campaign" | "tx"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

