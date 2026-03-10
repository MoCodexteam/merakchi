export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          name_ar: string | null;
          name_fr: string | null;
          description: string;
          description_ar: string | null;
          description_fr: string | null;
          price: number;
          category: string;
          images: string[];
          specifications: Record<string, string> | null;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_ar?: string | null;
          name_fr?: string | null;
          description: string;
          description_ar?: string | null;
          description_fr?: string | null;
          price: number;
          category: string;
          images: string[];
          specifications?: Record<string, string> | null;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_ar?: string | null;
          name_fr?: string | null;
          description?: string;
          description_ar?: string | null;
          description_fr?: string | null;
          price?: number;
          category?: string;
          images?: string[];
          specifications?: Record<string, string> | null;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          customer_name: string;
          rating: number;
          comment: string;
          approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          customer_name: string;
          rating: number;
          comment: string;
          approved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          customer_name?: string;
          rating?: number;
          comment?: string;
          approved?: boolean;
          created_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          name: string;
          phone: string;
          message: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          message: string;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          message?: string;
          read?: boolean;
          created_at?: string;
        };
      };
      settings: {
        Row: {
          id: string;
          key: string;
          value: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type Product = Database['public']['Tables']['products']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];
export type Setting = Database['public']['Tables']['settings']['Row'];

export type ProductCategory = 
  | 'Living Room' 
  | 'Bedroom' 
  | 'Tables' 
  | 'Chairs' 
  | 'Decoration' 
  | 'All';
