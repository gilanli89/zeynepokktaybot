-- zeynep_conversations tablosu oluştur
-- Bu SQL'i Supabase Dashboard > SQL Editor'da çalıştır
-- ya da: node setup-db.js

CREATE TABLE IF NOT EXISTS public.zeynep_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id BIGINT NOT NULL,
  username TEXT,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  mode TEXT DEFAULT 'default',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Index for faster user lookups
CREATE INDEX IF NOT EXISTS idx_zeynep_conversations_user_id ON public.zeynep_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_zeynep_conversations_created_at ON public.zeynep_conversations(created_at DESC);

-- RLS (Row Level Security) - service key bypasses this
ALTER TABLE public.zeynep_conversations ENABLE ROW LEVEL SECURITY;

-- Policy: sadece service key (admin) erişebilir
CREATE POLICY "Service role only" ON public.zeynep_conversations
  FOR ALL USING (false);
