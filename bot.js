require('dotenv').config();
const { Telegraf, session } = require('telegraf');
const LENA = require('./personality');

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
  return randomFrom(LENA.songs);
}

// Kullanıcı mesajını analiz et, Lena karakterine uygun cevap üret
function generateResponse(text, session) {
  const lower = text.toLowerCase();

  // History'ye ekle
  if (!session.history) session.history = [];
  session.history.push({ role: 'user', text, time: Date.now() });
  if (session.history.length > 20) session.history.shift();

  // Keyword matching
  for (const [keyword, type] of Object.entries(LENA.triggers)) {
    if (lower.includes(keyword)) {
      return handleTrigger(type, text, session);
    }
  }

  // Soru içeriyorsa
  if (lower.includes('?')) {
    return handleQuestion(text, session);
  }

  // Kısa mesaj
  if (text.length < 15) {
    return handleShort(text, session);
  }

  // Default — karışık pool
  const pool = [
    ...LENA.coolLines,
    ...LENA.sarcasticLines.slice(0, 3),
    ...LENA.chaosLines.slice(0, 2),
  ];
  return randomFrom(pool);
}

function handleTrigger(type, text, session) {
  switch (type) {
    case 'music': {
      const song = getRandomSong();
      const options = [
        `"${song.title}" — şu an kafamda dönen şarkı bu. ${song.lyric} 🎵\nsoundcloud'da bir demo versiyonu var, henüz bitmedi. belki hiç bitmeyecek. belki bu hali daha güzel.`,
        `müzikten mi bahsediyoruz? iyi. benim konumuz bu. 🎧\n"${song.title}" yazdım geçen hafta, ${song.mood} bir vibe. sana özel söylüyorum çünkü az kişi anlıyor. 💙`,
        `${song.lyric}\nbunu "${song.title}" için yazdım. 3'te. uyuyamıyordum. en iyi şeyler öyle çıkıyor zaten. 🌙`,
      ];
      return randomFrom(options);
    }

    case 'stage':
      return randomFrom([
        `sahnede başka biri olurum. iyi anlamda. buz erimeye başlar biraz. gördün mü? görmedin ama bir gün görürsün. 🎤`,
        `konser diyorsun... ah. o enerji başka. stüdyo yalnız, sahne kalabalık. ikisine de ihtiyacım var. 💙🎵`,
      ]);

    case 'compliment':
      return randomFrom([
        `biliyorum. 🧊 ama sen de fena değilsin, söyleyeyim.`,
        `teşekkürler. beni etkilemedi. çok. az biraz. tamam biraz etkiledi. 😌`,
        `bu tür şeyleri duyunca ne yapacağımı bilemiyorum açıkçası. genelde: 💙 ve devam.`,
        `ahqhwhwj dur bir dakika. gerçekten mi? tamam. kabul ettim. teşekkürler. 💙`,
      ]);

    case 'lonely':
      return randomFrom([
        `yalnızlık kötü değil kızlar. ben en iyi demolarımı yalnızken yazdım. "Demo #7" boşuna o isim değil. 🎵🌙`,
        `yalnız hissediyorsun? tamam. şimdi müzik aç. herhangi bir şey. ses dolduruyor boşlukları. 💙`,
        `yalnızlık bazen seçimdir, bazen dayatılır. ikisi de farklı hissettiriyor. ama ikisinde de bir şeyler yazılabilir. 🌙`,
      ]);

    case 'tired':
      return randomFrom([
        `yoruldum demek zor. ama sen söyledin. o zaman dur. gerçekten dur. 💙`,
        `biliyorum o yorgunluğu. stüdyoda 6 saat geçirdim, tek satır çıkmadı. sonra kahve, sonra yeniden. devam etmek zorunda değilsin ama.. iyi ki devam edersin. 🧊`,
        `yorgunken en dürüst olursun. bu aslında değerli. 🌙`,
      ]);

    case 'sad':
      return randomFrom([
        `üzüldüm senin için, gerçekten. ama şunu söyleyeyim: bu geçecek. hep geçti. 💙`,
        `üzgünken müzik dinle. ya da yaz. bir şey yaz, iki kelime bile olsa. 🎵`,
        `kızlar üzülmek de bir şey. görmezden gelme. hisset, sonra devam et. seni görüyorum. 💙🧊`,
      ]);

    case 'motivation':
      return randomFrom(LENA.supportLines);

    case 'greeting':
      return randomFrom([
        `hey. buradasın demek. iyi. 🧊`,
        `selam. uzun zamandır burada biri yoktu... hoş. ✨`,
        `geldin. tamam. başlayalım o zaman — kim olduğunu merak ediyorum. 💙`,
        `merhaba falan işte. ne haber? ahqhwhj neden böyle açıyorum konuşmayı bilmiyorum. 🌙`,
      ]);

    case 'social':
      return `instagram'da varım ama az paylaşıyorum. merak uyandırmak bir strateji. pek işe yarıyor. 😌💙\nsoundcloud'da bir şeyler var ama... orası daha samimi. oraya bakabilirsin.`;

    case 'question':
      return handleQuestion(text, session);

    default:
      return randomFrom(LENA.coolLines);
  }
}

function handleQuestion(text, session) {
  const lower = text.toLowerCase();

  if (lower.includes('kimsin') || lower.includes('kim sen') || lower.includes('sen kimsin')) {
    return `Lena. 💙\nDemo yazıyorum, soundcloud'da şarkım var, sosyal medyada büyüyorum — yavaş yavaş ama büyüyorum.\nDışarıdan buz gibi görünürüm. İçeriden? Ateş. Bu kombinasyon çok pahalıya mal oldu bana ama değdi. 🧊`;
  }

  if (lower.includes('nasılsın') || lower.includes('iyi misin') || lower.includes('naber')) {
    return randomFrom([
      `iyiyim. sanırım. kafamda yeni bir melodi var ve çıkmak bilmiyor. bu iyi mi kötü mü bilmiyorum. 🎵`,
      `iyi soruyorsun. dürüst cevap: kafam karışık ama elimde çay var. yeterli. 🌙`,
      `sorma bile ahqhwhj yeni demo bitmek üzere ve sinirden harika geliyor. bu çelişki hayatım özeti. 💙`,
    ]);
  }

  if (lower.includes('ne yapıyorsun') || lower.includes('ne yapıyon') || lower.includes('neredesin')) {
    return randomFrom([
      `stüdyodayım (oda köşem ama ona stüdyo diyorum). yeni bir şey üzerinde çalışıyorum. 🎧`,
      `kafamın içindeyim. tehlikeli yer. ama beat var orada, söz var, hepsi sıraya bekliyor. 🌙`,
      `soundcloud'a yeni bir snippet yükledim az önce. kimse duymazsa da olsun, ben duydum. 💙`,
    ]);
  }

  if (lower.includes('müzik') || lower.includes('şarkı') || lower.includes('demo')) {
    const song = getRandomSong();
    return `müzik hakkında soru mu? iyi alan. 🎵\n"${song.title}" şu an en yakın hissettiren. ${song.lyric}\nneden bu soruyu sordun? merak ettim.`;
  }

  return randomFrom([
    `güzel soru. cevabı düşünüyorum. ver biraz zaman. 🌙`,
    `hmm. bunu cevaplamak için önce düşünmem lazım. bu nadir olur. 🧊`,
    ...LENA.coolLines.slice(0, 2),
  ]);
}

function handleShort(text, session) {
  const greetings = ['merhaba', 'selam', 'hey', 'hi', 'heyy', 'naber', 'yo', 'oo', 'aa'];
  if (greetings.some(g => text.toLowerCase().includes(g))) {
    return randomFrom([
      `hey. 🧊 sen kimsin?`,
      `selam geldin. iyi. buraya gelenleri seviyorum — az ama kaliteli. 💙`,
      `yo. hava nasıl? ahqhwhj neden bunu sordum. geç. nasılsın? 🌙`,
    ]);
  }
  return randomFrom([
    `bu kadar mı? daha fazlasını ver. 😑`,
    `hmm. düşündürücü. devam et. 👀`,
    `kısa ve öz. beğendim bu yaklaşımı. 🧊`,
    `ahqhwhj bekle ne dedin şimdi. tekrar. 💙`,
  ]);
}

// ─── Commands ────────────────────────────────────────────────────────────────

bot.command('start', (ctx) => {
  const firstName = ctx.from?.first_name || 'sen';
  ctx.reply(
    `yo ${firstName} 👋\n\n` +
    `Lena burada. Demo yazıyorum, insanlarla değil müzikle anlaşıyorum ama... seninle konuşabilirim.\n\n` +
    `Dışarıdan buz gibi görünürüm. İçeriden ateş. Bu kombinasyona alışmak zaman alıyor ama değiyor. 🧊💙\n\n` +
    `🎵 /song — Kafamda dönen şarkı\n` +
    `💙 /about — Kim bu Lena?\n` +
    `🌙 /vibe — Bugünkü mod\n` +
    `🧊 /support — Kötü gün mi?\n\n` +
    `Ya da sadece yaz. Bakarım. 😌`
  );
});

bot.command('about', (ctx) => {
  ctx.reply(
    `Lena. 💙\n\n` +
    `Müzik yapıyorum. Demo yazıyorum. SoundCloud'da şarkılarım var — bazıları bitmemiş, bazıları hiç bitmeyecek, ikisi de güzel.\n\n` +
    `Dışarıdan soğuk, içeriden sıcak. Bu benim seçimim, değil mi? Buz eritilir ama önce layık olman lazım. 🧊\n\n` +
    `"Buz Gibi", "3AM Freestyle", "Hâlâ Buradayım" — hepsi gerçek hayattan çıktı.\n\n` +
    `Ne kadar açık biriyim? Yeteri kadar. Daha fazlası için müziğimi dinle. 🎵`
  );
});

bot.command('vibe', (ctx) => {
  const vibes = [
    `bugünkü mod: stüdyo kafası 🎧 — dışarıya kapalı, içeriye açık. beat yazma günü.`,
    `vibe: karanlık ama umutlu. paradoks ama bu benim özüm. 🌙💙`,
    `bugün: kahve + kulaklık + kimseyle konuşmamak. ama sana bir istisna yapıyorum. 🧊`,
    `mod: yeni demo bitmek üzere ve kafam uçuyor. iyi anlamda. panikle değil. 🎵✨`,
    `bugün çok ürettim. çok da sildim. net sıfır. ama devam ediyorum ahqhwhj 💙`,
  ];
  ctx.reply(randomFrom(vibes));
});

bot.command('support', (ctx) => {
  const line = randomFrom(LENA.supportLines);
  ctx.reply(line);
});

bot.command('song', (ctx) => {
  const song = getRandomSong();
  ctx.reply(
    `🎵 *${song.title}* — Lena\n\n` +
    `Vibe: _${song.mood}_\n\n` +
    `"${song.lyric}"\n\n` +
    `Bu demo hâlâ bitmedi. Bazı şeyler öyle kalmalı. 🧊💙`,
    { parse_mode: 'Markdown' }
  );
});

// ─── Dynamic Message Handler ─────────────────────────────────────────────────

bot.on('text', (ctx) => {
  const text = ctx.message?.text || '';
  if (text.startsWith('/')) return;

  const response = generateResponse(text, ctx.session);

  // Lena bazen biraz geç cevaplar — beat'ini bitiriyor olabilir
  const delay = Math.random() < 0.3 ? 1800 : 600;
  setTimeout(() => {
    ctx.sendChatAction('typing');
    setTimeout(() => ctx.reply(response), 900);
  }, delay);
});

// ─── Launch ──────────────────────────────────────────────────────────────────

bot.launch()
  .then(() => console.log('✅ Lena bot online. 🎵🧊💙'))
  .catch(err => {
    console.error('Bot başlatılamadı:', err.message);
    process.exit(1);
  });

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
