export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          avatar_url: string | null;
          telegram_id: string | null;
          notify_hour: number | null;
          created_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          avatar_url?: string | null;
          telegram_id?: string | null;
          notify_hour?: number | null;
          created_at?: string;
        };
        Update: {
          username?: string | null;
          avatar_url?: string | null;
          telegram_id?: string | null;
          notify_hour?: number | null;
        };
      };
      modules: {
        Row: {
          id: number;
          slug: string;
          title: string;
          description: string;
          order_index: number;
          required_xp: number;
          icon: string;
          color: string;
        };
        Insert: {
          slug: string;
          title: string;
          description: string;
          order_index: number;
          required_xp?: number;
          icon?: string;
          color?: string;
        };
        Update: {
          title?: string;
          description?: string;
          order_index?: number;
          required_xp?: number;
          icon?: string;
          color?: string;
        };
      };
      lessons: {
        Row: {
          id: number;
          module_id: number;
          title: string;
          order_index: number;
          content: LessonContent;
          xp_reward: number;
        };
        Insert: {
          module_id: number;
          title: string;
          order_index: number;
          content: LessonContent;
          xp_reward?: number;
        };
        Update: {
          title?: string;
          order_index?: number;
          content?: LessonContent;
          xp_reward?: number;
        };
      };
      user_lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: number;
          completed: boolean;
          score: number;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: number;
          completed?: boolean;
          score?: number;
          completed_at?: string | null;
        };
        Update: {
          completed?: boolean;
          score?: number;
          completed_at?: string | null;
        };
      };
      user_stats: {
        Row: {
          user_id: string;
          total_xp: number;
          level: number;
          streak_days: number;
          last_activity: string | null;
          longest_streak: number;
        };
        Insert: {
          user_id: string;
          total_xp?: number;
          level?: number;
          streak_days?: number;
          last_activity?: string | null;
          longest_streak?: number;
        };
        Update: {
          total_xp?: number;
          level?: number;
          streak_days?: number;
          last_activity?: string | null;
          longest_streak?: number;
        };
      };
      badges: {
        Row: {
          id: number;
          slug: string;
          title: string;
          description: string;
          icon: string;
        };
        Insert: {
          slug: string;
          title: string;
          description: string;
          icon: string;
        };
        Update: {
          title?: string;
          description?: string;
          icon?: string;
        };
      };
      user_badges: {
        Row: {
          user_id: string;
          badge_id: number;
          earned_at: string;
        };
        Insert: {
          user_id: string;
          badge_id: number;
          earned_at?: string;
        };
        Update: never;
      };
      ai_conversations: {
        Row: {
          id: string;
          user_id: string;
          module_id: number | null;
          messages: ChatMessage[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          module_id?: number | null;
          messages?: ChatMessage[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          messages?: ChatMessage[];
          updated_at?: string;
        };
      };
      notification_log: {
        Row: {
          id: string;
          user_id: string;
          sent_at: string;
          channel: "telegram" | "email";
          status: "sent" | "failed";
        };
        Insert: {
          id?: string;
          user_id: string;
          sent_at?: string;
          channel: "telegram" | "email";
          status: "sent" | "failed";
        };
        Update: never;
      };
    };
  };
}

export interface LessonContent {
  explanation: string;
  example: string;
  quiz: QuizQuestion[];
  exercise: Exercise;
  summary: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

export interface Exercise {
  prompt: string;
  type: "multiple_choice" | "text_input" | "scenario";
  answer?: string;
  options?: string[];
  correct_index?: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
