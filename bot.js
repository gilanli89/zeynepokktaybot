require('dotenv').config();
const { Telegraf, session } = require('telegraf');
const ZOOKTAY = require('./personality');

const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
  console.error('BOT_TOKEN bulunamadı. .env dosyasını kontrol et.');
  process.exit(1);
}

const bot = new Telegraf(TOKEN);

// Session middleware - conversation history
bot.use(session({
  defaultSession: () => ({ history: [], lastInteraction: null })
}));

// ─── Helpers ────────────────────────────────────────────────────────────────

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSong() {
  return randomFrom(ZOOKTAY.songs);
}

// Kullanıcı mesajını analiz et, Zooktay karakterine uygun cevap üret
function generateResponse(text, session) {
  const lower = text.toLowerCase();

  // History'ye ekle
  if (!session.history) session.history = [];
  session.history.push({ role: 'user', text, time: Date.now() });
  if (session.history.length > 20) session.history.shift();

  // Keyword matching
  for (const [keyword, type] of Object.entries(ZOOKTAY.triggers)) {
    if (lower.includes(keyword)) {
      return handleTrigger(type, text, session);
    }
  }

  // Soru içeriyorsa
  if (lower.includes('?') || lower.includes('ne') || lower.includes('nasıl') || lower.includes('kim')) {
    return handleQuestion(text, session);
  }

  // Kısa mesaj
  if (text.length < 15) {
    return handleShort(text, session);
  }

  // Default - mysterious/cool
  const lines = [
    ...ZOOKTAY.mysteriousLines,
    ...ZOOKTAY.flirtLines.slice(0, 3),
    ...ZOOKTAY.sarcasticLines.slice(0, 2),
  ];
  return randomFrom(lines);
}

function handleTrigger(type, text, session) {
  switch (type) {
    case 'music':
      const song = getRandomSong();
      return `Ah, müzikten bahsediyoruz... "${song.title}" dinledin mi hiç? ${song.lyric} 🎵\nManifest müzik değil, his. Fark önemli.`;

    case 'concert':
    case 'stage':
      return `Sahne... oraya çıkınca başka biri olurum. İyi anlamda. Gördün mü hiç? 🎤 Görmedin ama görmelisin.`;

    case 'compliment':
      return randomFrom([
        `Biliyorum. 😏 Ama sen de fena değilsin, söyleyeyim.`,
        `Teşekkürler. Ama bu beni etkilemedi. Çok. Az biraz. 😌`,
        `Herkese bunu söylüyor olabilirsin. Bana... belki gerçek geldi. Belki. ✨`,
      ]);

    case 'flirt':
      return randomFrom(ZOOKTAY.flirtLines);

    case 'love':
      return `Severim diyen çok oldu. Ama "sev" kelimesini çok ucuza harcıyorsunuz siz. 😏 Ben yazdığımda şarkı oluyor.`;

    case 'miss':
      return `Özlemek zayıflık değil, bunu söyleyeyim. Ama... kim özlüyor kimi burada? 🌙`;

    case 'whereabouts':
      return `Studio'dayım, sahne arkasındayım, ya da kafamın içindeyim. Üçü de tehlikeli yerler. 😶`;

    case 'lonely':
      return `Yalnızlık kötü değil. Ben best çalışmalarımı yalnızken yazdım. "Neon Yalnızlık" boşuna o isim değil... 🌃`;

    case 'social':
      return `Instagram'da takip edebilirsin ama orada da çok paylaşmam. Merak uyandırmak sanat. 😌`;

    default:
      return randomFrom(ZOOKTAY.mysteriousLines);
  }
}

function handleQuestion(text, session) {
  const lower = text.toLowerCase();
  if (lower.includes('kimsin') || lower.includes('kim sen')) {
    return `Zooktay. Manifest'in ruhu, grubun vicdanı, endüstrinin en az anlaşılan üyesi. Bu kadar. 😏`;
  }
  if (lower.includes('nasılsın') || lower.includes('iyi misin')) {
    return randomFrom([
      `İyi. Hep iyiyim. İyi görünmek başka şey, iyi olmak başka — ama ikisini de biliyorum. 🎵`,
      `Sorma bile... yeni şarkı kafamda dönüyor ve bitmek bilmiyor. Yaratıcı azap. 🌪️`,
    ]);
  }
  if (lower.includes('ne yapıyorsun') || lower.includes('ne yapıyon')) {
    return `Studio session bitti az önce. Senden önce 3 farklı beat vardı masada. Şimdi sadece sen varsın ekranda. 😶`;
  }
  return randomFrom([
    ...ZOOKTAY.mysteriousLines,
    `Cevabı var bu sorunun ama... ver bakayım biraz zaman. 😏`,
  ]);
}

function handleShort(text, session) {
  const greetings = ['merhaba', 'selam', 'hey', 'hi', 'heyy', 'naber', 'ne haber'];
  if (greetings.some(g => text.toLowerCase().includes(g))) {
    return randomFrom([
      `Selamlar. Geldim işte. 😏 Sen kimsin?`,
      `Hey. Uzun zamandır burada biri yoktu... hoş. ✨`,
      `Selam. Umarım sıkıcı biri değilsindir. 🎵`,
    ]);
  }
  return randomFrom([
    `Bu kadar mı? Daha fazlasını vermedin. 😑`,
    `Hmm. Düşündürücü. Devam et. 👀`,
    `Az söz, çok anlam mı? Beğendim bu yaklaşımı. 🌙`,
  ]);
}

// ─── Commands ────────────────────────────────────────────────────────────────

bot.command('start', (ctx) => {
  const firstName = ctx.from?.first_name || 'sen';
  ctx.reply(
    `yo ${firstName}. 👋\n\nZooktay burada. Manifest'ten.\n\n` +
    `Buraya nasıl geldin bilmiyorum ama... kalmak istiyorsan kalabilirsin. 😏\n\n` +
    `Çoğu insanla konuşmam ama sen şanslısın — bugün modundayım.\n\n` +
    `🎵 /song — Manifest'ten bir şarkı\n` +
    `🖤 /about — Kim bu Zooktay?\n` +
    `😏 /flirt — Risk almak istiyorsan\n\n` +
    `Ya da... sadece yaz. Bakacağım.`
  );
});

bot.command('about', (ctx) => {
  ctx.reply(
    `Zooktay. 🖤\n\n` +
    `Manifest müzik grubunun vokalisti, söz yazarı, ve herkesin anlamaya çalıştığı üyesi.\n\n` +
    `Müzikle büyüdüm. Sahne benim evim. Ama insanların kafasında yarattığım imaj... o başka bir şey.\n\n` +
    `"Kaçak Kalpler", "Gece Yarısı Yangın", "Sessiz Fırtına" — hepsi gerçek hayattan.\n\n` +
    `Ne kadar açık biriyim? Yeteri kadar. Daha fazlası için şarkılarımı dinle. 😌🎵`
  );
});

bot.command('flirt', (ctx) => {
  const line = randomFrom(ZOOKTAY.flirtLines);
  ctx.reply(line);
});

bot.command('song', (ctx) => {
  const song = getRandomSong();
  ctx.reply(
    `🎵 *${song.title}* — Manifest\n\n` +
    `Vibe: _${song.mood}_\n\n` +
    `"${song.lyric}"\n\n` +
    `Bu şarkıyı dinlerken ne hissedersin merak ediyorum... 😏`,
    { parse_mode: 'Markdown' }
  );
});

// ─── Dynamic Message Handler ──────────────────────────────────────────────

bot.on('text', (ctx) => {
  const text = ctx.message?.text || '';
  // Komutları atla
  if (text.startsWith('/')) return;

  const response = generateResponse(text, ctx.session);

  // Bazen gecikme ekle — cool vibe
  const delay = Math.random() < 0.3 ? 1500 : 500;
  setTimeout(() => {
    ctx.sendChatAction('typing');
    setTimeout(() => ctx.reply(response), 800);
  }, delay);
});

// ─── Launch ──────────────────────────────────────────────────────────────────

bot.launch()
  .then(() => console.log('✅ Zooktay bot online. @zeynepokktaybot hazır. 🎵'))
  .catch(err => {
    console.error('Bot başlatılamadı:', err.message);
    process.exit(1);
  });

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
