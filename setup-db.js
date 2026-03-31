#!/usr/bin/env node
// Supabase tablosunu oluşturmak için çalıştır: node setup-db.js
require('dotenv').config();
const https = require('https');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('SUPABASE_URL veya SUPABASE_SERVICE_KEY .env dosyasında bulunamadı!');
  process.exit(1);
}

const sql = `
CREATE TABLE IF NOT EXISTS public.zeynep_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id BIGINT NOT NULL,
  username TEXT,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  mode TEXT DEFAULT 'default',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_zeynep_conversations_user_id 
  ON public.zeynep_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_zeynep_conversations_created_at 
  ON public.zeynep_conversations(created_at DESC);
`;

// Supabase'te doğrudan SQL çalıştırmak için pg endpoint kullan
const url = new URL('/rest/v1/rpc/query', SUPABASE_URL);
const payload = JSON.stringify({ query: sql });

const options = {
  hostname: url.hostname,
  path: url.pathname + url.search,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`,
  }
};

console.log('Supabase bağlantısı test ediliyor...');
console.log('URL:', SUPABASE_URL);

// Test: tablonun zaten var olup olmadığını kontrol et
const testUrl = new URL('/rest/v1/zeynep_conversations?limit=1', SUPABASE_URL);
const testOptions = {
  hostname: testUrl.hostname,
  path: testUrl.pathname + testUrl.search,
  method: 'GET',
  headers: {
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`,
  }
};

const req = https.request(testOptions, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ zeynep_conversations tablosu zaten mevcut!');
    } else if (res.statusCode === 404 || data.includes('PGRST205')) {
      console.log('⚠️  Tablo bulunamadı. Lütfen aşağıdaki SQL\'i Supabase Dashboard > SQL Editor\'da çalıştırın:');
      console.log('\n--- SQL ---');
      console.log(sql);
      console.log('--- SQL ---\n');
    } else {
      console.log('Status:', res.statusCode);
      console.log('Response:', data);
    }
  });
});

req.on('error', (err) => {
  console.error('Bağlantı hatası:', err.message);
});
req.end();
