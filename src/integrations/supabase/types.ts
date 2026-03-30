export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      listings: {
        Row: {
          address: string | null
          bedrooms: number
          city: string
          created_at: string
          host_id: string
          host_name: string
          id: string
          is_active: boolean
          is_demo: boolean
          latitude: number | null
          longitude: number | null
          mamad_notes: string | null
          neighborhood: string
          pets_allowed: boolean
          phone: string
          price_per_night: number | null
          price_type: string
          sleeping_notes: string | null
          smoking_allowed: boolean
          total_beds: number
          updated_at: string
        }
        Insert: {
          address?: string | null
          bedrooms?: number
          city: string
          created_at?: string
          host_id: string
          host_name: string
          id?: string
          is_active?: boolean
          is_demo?: boolean
          latitude?: number | null
          longitude?: number | null
          mamad_notes?: string | null
          neighborhood: string
          pets_allowed?: boolean
          phone: string
          price_per_night?: number | null
          price_type?: string
          sleeping_notes?: string | null
          smoking_allowed?: boolean
          total_beds?: number
          updated_at?: string
        }
        Update: {
          address?: string | null
          bedrooms?: number
          city?: string
          created_at?: string
          host_id?: string
          host_name?: string
          id?: string
          is_active?: boolean
          is_demo?: boolean
          latitude?: number | null
          longitude?: number | null
          mamad_notes?: string | null
          neighborhood?: string
          pets_allowed?: boolean
          phone?: string
          price_per_night?: number | null
          price_type?: string
          sleeping_notes?: string | null
          smoking_allowed?: boolean
          total_beds?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          onboarding_completed: boolean
          updated_at: string
          whatsapp_phone: string | null
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          onboarding_completed?: boolean
          updated_at?: string
          whatsapp_phone?: string | null
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          onboarding_completed?: boolean
          updated_at?: string
          whatsapp_phone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      listings_public: {
        Row: {
          address: string | null
          bedrooms: number | null
          city: string | null
          created_at: string | null
          host_id: string | null
          host_name: string | null
          id: string | null
          is_active: boolean | null
          is_demo: boolean | null
          latitude: number | null
          longitude: number | null
          mamad_notes: string | null
          neighborhood: string | null
          pets_allowed: boolean | null
          price_per_night: number | null
          price_type: string | null
          sleeping_notes: string | null
          smoking_allowed: boolean | null
          total_beds: number | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          bedrooms?: number | null
          city?: string | null
          created_at?: string | null
          host_id?: string | null
          host_name?: string | null
          id?: string | null
          is_active?: boolean | null
          is_demo?: boolean | null
          latitude?: number | null
          longitude?: number | null
          mamad_notes?: string | null
          neighborhood?: string | null
          pets_allowed?: boolean | null
          price_per_night?: number | null
          price_type?: string | null
          sleeping_notes?: string | null
          smoking_allowed?: boolean | null
          total_beds?: number | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          bedrooms?: number | null
          city?: string | null
          created_at?: string | null
          host_id?: string | null
          host_name?: string | null
          id?: string | null
          is_active?: boolean | null
          is_demo?: boolean | null
          latitude?: number | null
          longitude?: number | null
          mamad_notes?: string | null
          neighborhood?: string | null
          pets_allowed?: boolean | null
          price_per_night?: number | null
          price_type?: string | null
          sleeping_notes?: string | null
          smoking_allowed?: boolean | null
          total_beds?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_whatsapp_url: { Args: { listing_id: string }; Returns: string }
      user_owns_listing_photo: { Args: { file_name: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
