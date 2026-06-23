-- ════════════════════════════════════════════════════
-- TradeLingo AI — Schema inicial
-- ════════════════════════════════════════════════════

-- Extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── PERFILES ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username     TEXT,
  avatar_url   TEXT,
  telegram_id  TEXT,
  notify_hour  INTEGER DEFAULT 9 CHECK (notify_hour >= 0 AND notify_hour <= 23),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── MÓDULOS DEL CURSO ─────────────────────────────────
CREATE TABLE IF NOT EXISTS modules (
  id           SERIAL PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  description  TEXT NOT NULL,
  order_index  INTEGER NOT NULL,
  required_xp  INTEGER DEFAULT 0,
  icon         TEXT DEFAULT '📚',
  color        TEXT DEFAULT '#3b82f6'
);

-- ── LECCIONES ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lessons (
  id           SERIAL PRIMARY KEY,
  module_id    INTEGER REFERENCES modules(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  order_index  INTEGER NOT NULL,
  content      JSONB NOT NULL DEFAULT '{}',
  xp_reward    INTEGER DEFAULT 20
);

-- ── PROGRESO POR LECCIÓN ──────────────────────────────
CREATE TABLE IF NOT EXISTS user_lesson_progress (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id    INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
  completed    BOOLEAN DEFAULT FALSE,
  score        INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, lesson_id)
);

-- ── ESTADÍSTICAS DEL USUARIO ──────────────────────────
CREATE TABLE IF NOT EXISTS user_stats (
  user_id         UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  total_xp        INTEGER DEFAULT 0,
  level           INTEGER DEFAULT 1,
  streak_days     INTEGER DEFAULT 0,
  last_activity   DATE,
  longest_streak  INTEGER DEFAULT 0
);

-- ── INSIGNIAS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS badges (
  id           SERIAL PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  description  TEXT NOT NULL,
  icon         TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_badges (
  user_id    UUID REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id   INTEGER REFERENCES badges(id) ON DELETE CASCADE,
  earned_at  TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

-- ── CONVERSACIONES CON IA ─────────────────────────────
CREATE TABLE IF NOT EXISTS ai_conversations (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE,
  module_id   INTEGER REFERENCES modules(id) ON DELETE SET NULL,
  messages    JSONB DEFAULT '[]',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── LOG DE NOTIFICACIONES ─────────────────────────────
CREATE TABLE IF NOT EXISTS notification_log (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id   UUID REFERENCES profiles(id) ON DELETE CASCADE,
  sent_at   TIMESTAMPTZ DEFAULT NOW(),
  channel   TEXT CHECK (channel IN ('telegram', 'email')),
  status    TEXT CHECK (status IN ('sent', 'failed'))
);

-- ════════════════════════════════════════════════════
-- ÍNDICES
-- ════════════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON user_lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_lesson_id ON user_lesson_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON ai_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_log_user_id ON notification_log(user_id);

-- ════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ════════════════════════════════════════════════════
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_log ENABLE ROW LEVEL SECURITY;

-- Policies: cada usuario solo ve y edita sus propios datos
CREATE POLICY "Perfil propio" ON profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Progreso propio" ON user_lesson_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Stats propias" ON user_stats
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Badges propios" ON user_badges
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Conversaciones propias" ON ai_conversations
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Notificaciones propias" ON notification_log
  FOR ALL USING (auth.uid() = user_id);

-- Módulos y lecciones: lectura pública para usuarios autenticados
CREATE POLICY "Leer módulos" ON modules
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Leer lecciones" ON lessons
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Leer badges" ON badges
  FOR SELECT USING (auth.role() = 'authenticated');

-- ════════════════════════════════════════════════════
-- TRIGGER: crear perfil y stats al registrarse
-- ════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO user_stats (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
