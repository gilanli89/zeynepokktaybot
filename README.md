# @zeynepokktaybot — Zooktay Bot 🖤🎵

Telegram botu. Manifest müzik grubundan Zooktay karakterini canlandırır.

## Karakter
- Cool, mysterious, burnu havada
- Flörtöz ve playful (18+)
- Gen Z slang + emoji
- "Kaçtıkça kovalanan" vibe

## Komutlar
| Komut | Açıklama |
|-------|----------|
| `/start` | Intro mesajı |
| `/about` | Zooktay bio |
| `/flirt` | Flörtöz bir mesaj |
| `/song` | Random Manifest şarkısı |

## Kurulum

```bash
git clone https://github.com/gilanli89/zeynepokktaybot
cd zeynepokktaybot
npm install
cp .env.example .env
# .env dosyasına BOT_TOKEN ekle
npm start
```

## Railway Deploy

1. [Railway.app](https://railway.app)'a git
2. "New Project" → "Deploy from GitHub repo" seç
3. Bu repoyu bağla
4. Environment Variables'a `BOT_TOKEN` ekle
5. Deploy!

## Dosya Yapısı

```
├── bot.js          # Ana bot logic
├── personality.js  # Zooktay karakter özellikleri
├── .env.example    # Env örneği
├── railway.toml    # Railway config
└── package.json
```
