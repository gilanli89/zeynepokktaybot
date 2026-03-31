#!/usr/bin/env node
/**
 * Zeynep Bot - Supabase DB Setup Helper
 * 
 * Çalıştır: node setup-db.js
 * 
 * Bu script tablo varlığını kontrol eder ve SQL gösterir.
 * Tablo yoksa Supabase Dashboard'da SQL Editor'da çalıştırman gerekir.
 */
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ SUPABASE_URL veya SUPABASE_SERVICE_KEY .env dosyasında bulunamadı!');
  console.error('   .env dosyanı kontrol et veya .env.example\'dan kopyala.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false }
});

const CREATE_SQL = `
-- Supabase Dashboard > SQL Editor'da çalıştır:
CREATE TABLE IF NOT EXISTS public.zeynep_conversations (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     BIGINT      NOT NULL,
  username    TEXT,
  message     TEXT        NOT NULL,
  response    TEXT        NOT NULL,
  mode        TEXT        DEFAULT 'default',
  created_at  TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_zeynep_conv_user_id
  ON public.zeynep_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_zeynep_conv_created_at
  ON public.zeynep_conversations(created_at DESC);

-- RLS: sadece service key erişebilir (opsiyonel)
-- ALTER TABLE public.zeynep_conversations ENABLE ROW LEVEL SECURITY;
`;

async function main() {
  console.log('🔍 Supabase bağlantısı kontrol ediliyor...');
  console.log('   URL:', SUPABASE_URL);

  const { data, error } = await supabase
    .from('zeynep_conversations')
    .select('count')
    .limit(1);

  if (error && error.code === 'PGRST205') {
    console.log('\n⚠️  zeynep_conversations tablosu bulunamadı!\n');
    console.log('📋 Supabase Dashboard > SQL Editor\'da şu SQL\'i çalıştır:\n');
    console.log('━'.repeat(60));
    console.log(CREATE_SQL);
    console.log('━'.repeat(60));
    console.log('\n🔗 Dashboard: https://supabase.com/dashboard/project/kkyqpuqjqryfrejetufj/sql/new');
    console.log('\nSQL çalıştırdıktan sonra bu script\'i tekrar çalıştır: node setup-db.js');
  } else if (error) {
    console.error('\n❌ Beklenmeyen hata:', error.message);
  } else {
    console.log('\n✅ zeynep_conversations tablosu mevcut ve erişilebilir!');
    console.log('🚀 Bot\'u başlatabilirsin: npm start');
  }
}

main().catch(console.error);
