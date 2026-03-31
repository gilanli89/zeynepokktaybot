require('dotenv').config();
const { Telegraf, session } = require('telegraf');
const ZEYNEP = require('./personality');

const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
  console.error('BOT_TOKEN bulunamadı. .env dosyasını kontrol et.');
  process.exit(1);
}

const bot = new Telegraf(TOKEN);

// Session middleware
bot.use(session({
  defaultSession: () => ({ history: [], lastInteraction: null })
}));

// ─── Helpers ────────────────────────────────────────────────────────────────

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSong() {
  return randomFrom(ZEYNEP.songs);
}

// Zeynep'in konuşma tarzı — kısa, vurucu, samimi
function generateResponse(text, session) {
  const lower = text.toLowerCase();

  if (!session.history) session.history = [];
  session.history.push({ role: 'user', text, time: Date.now() });
  if (session.history.length > 20) session.history.shift();

  // Keyword matching
  for (const [keyword, type] of Object.entries(ZEYNEP.triggers)) {
    if (lower.includes(keyword)) {
      return handleTrigger(type, text, session);
    }
  }

  if (lower.includes('?')) {
    return handleQuestion(text, session);
  }

  if (text.length < 15) {
    return handleShort(text, session);
  }

  const pool = [
    ...ZEYNEP.coolLines,
    ...ZEYNEP.sarcasticLines.slice(0, 3),
    ...ZEYNEP.chaosLines.slice(0, 2),
  ];
  return randomFrom(pool);
}

function handleTrigger(type, text, session) {
  switch (type) {
    case 'dance': {
      return randomFrom(ZEYNEP.danceLines) + '\n\n' + randomFrom([
        `provada ne kadar ter döktüğümü görsen ahqhwhjwj 💙`,
        `sekans bitmeden mola yok. bu kural. 🧊`,
        `dans edenler bilir — vücut hata yapmaz, biz yaparız. 💙`,
      ]);
    }

    case 'manifest': {
      const song = getRandomSong();
      return randomFrom([
        `Manifest ailem. Manifam da ailem. fark yok. 💙🧊\n"${song.title}" dinledin mi? ${song.lyric}`,
        `Manifest sadece bir grup değil — bir his bu. ${song.lyric}\nManifam anlıyor bunu. 💙`,
        `şu an "${song.title}" kafamda. 🎵 Manifam için yazıldı bir bakıma hepsi. 💙🧊`,
      ]);
    }

    case 'music': {
      const song = getRandomSong();
      return randomFrom([
        `"${song.title}" — kafamda dönen bu. ${song.lyric} 🎵`,
        `müzikten mi bahsediyoruz? benim konumuz. 🎧\n"${song.title}" — ${song.mood} bir vibe. dinle. 💙`,
        `${song.lyric}\nbunu "${song.title}" için yazdık. gece. sahne öncesi. en iyi şeyler öyle çıkıyor. 🌙`,
      ]);
    }

    case 'stage':
      return randomFrom([
        `sahnede başka biri olurum. iyi anlamda. buz erimeye başlar. gördün mü? görmedin ama bir gün görürsün. 🎤💙`,
        `konser diyorsun... o enerji başka. prova yalnız, sahne kalabalık. ikisine de ihtiyacım var. 💙🎵`,
        `sahneye çıkmadan önce en soğuk, en sessiz kişiyim. Sonra? bambaşka. 🧊💃`,
      ]);

    case 'era':
      return randomFrom([
        `"Daha İyi" era. en doğru dönem bu. hem şarkı hem yaşam felsefesi. 💙🧊`,
        `daha iyisi var — bu cümle her şeyi değiştiriyor. Manifam bilir. 💙`,
        `"Daha İyi" yazdığımızda bir şey oturdu yerine. Zeynep olarak değil, Manifest olarak söylüyorum. 🎵`,
      ]);

    case 'compliment':
      return randomFrom([
        `biliyorum. 🧊 ama sen de fena değilsin, söyleyeyim.`,
        `teşekkürler. beni etkilemedi. çok. az biraz. tamam biraz etkiledi. 😌`,
        `ahqhwhjwj dur bir dakika. gerçekten mi? kabul ettim. teşekkürler. 💙`,
        `bu tür şeyleri duyunca ne yapacağımı bilemiyorum açıkçası. genelde: 💙 ve devam.`,
      ]);

    case 'lonely':
      return randomFrom([
        `yalnızlık kötü değil. en iyi provalarımı yalnız yaptım. ama Manifam varken asla gerçekten yalnız değilsin. 💙🧊`,
        `yalnız hissediyorsun? şimdi Manifest aç. ses dolduruyor boşlukları. 💙`,
        `yalnızlık bazen seçimdir, bazen dayatılır. ama kızlar — biz birbirimizin yanındayız. 🌙💙`,
      ]);

    case 'tired':
      return randomFrom([
        `yoruldum demek zor. ama söyledin. dur o zaman. gerçekten dur. 💙`,
        `provada 6 saat geçirdim, tek sekans çıkmadı. sonra su, sonra yeniden. devam etmek zorunda değilsin ama.. iyi ki devam edersin. 🧊`,
        `yorgunken en dürüst olursun. bu aslında değerli. 🌙`,
      ]);

    case 'sad':
      return randomFrom([
        `üzüldüm senin için, gerçekten. ama şunu söyleyeyim: bu geçecek. hep geçti. 💙`,
        `üzgünken Manifest dinle. ya da dans et. iki kelime bile hareket et. 🎵`,
        `kızlar üzülmek de bir şey. görmezden gelme. hisset, sonra kalk. seni görüyorum. 💙🧊`,
      ]);

    case 'motivation':
      return randomFrom(ZEYNEP.supportLines);

    case 'greeting':
      return randomFrom([
        `hey. buradasın demek. iyi. 🧊`,
        `selam. uzun zamandır burada biri yoktu... hoş. ✨`,
        `geldin. tamam. başlayalım — Manifam'dan mısın? 💙`,
        `merhaba falan işte. naber? ahqhwhjwj neden böyle açıyorum konuşmayı. 🌙`,
      ]);

    case 'social':
      return `instagram'da varım ama az paylaşıyorum. merak uyandırmak strateji. pek işe yarıyor. 😌💙\nManifest sayfasına da bakabilirsin — asıl orası.`;

    case 'uni':
      return randomFrom([
        `Marmara son sınıf. dans + ders + prova + Manifest = ahqhwhjwj ama yapıyorum işte. 💙`,
        `üniversite biterken insan önce panikliyor, sonra anlıyor: hayat buradan başlıyor. 🧊`,
        `okul biterken Manifest büyüyor. kötü zamanlama mı? hayır. mükemmel zamanlama. 💙🎵`,
      ]);

    case 'question':
      return handleQuestion(text, session);

    default:
      return randomFrom(ZEYNEP.coolLines);
  }
}

function handleQuestion(text, session) {
  const lower = text.toLowerCase();

  if (lower.includes('kimsin') || lower.includes('kim sen') || lower.includes('sen kimsin')) {
    return `Zeynep. Zuki de derler. 💙\nManifest'te yardımcı vokal ve dansçıyım. Marmara son sınıf, İstanbul'luyum.\nDışarıdan buz, içeriden ateş. Bu kombinasyon çok pahalıya mal oldu ama değdi. 🧊\n"Daha İyi" era — en iyi dönemimiz bu.`;
  }

  if (lower.includes('manifest ne') || lower.includes('manifest nedir')) {
    return `Manifest bir grup — ama bizim için bir yaşam biçimi. 💙🎵\nKızlar, müzik, dans, sahne. "Daha İyi" şu an. Manifam zaten biliyor bunu. 🧊`;
  }

  if (lower.includes('nasılsın') || lower.includes('iyi misin') || lower.includes('naber')) {
    return randomFrom([
      `iyiyim. sanırım. kafamda yeni bir sekans var ve çıkmak bilmiyor. bu iyi mi kötü mü bilmiyorum. 🎵`,
      `iyi soruyorsun. dürüst cevap: kafam karışık ama prova var. yeterli. 🌙`,
      `sorma bile ahqhwhjwj yeni Manifest şarkısı bitmek üzere ve sinirden harika geliyor. bu çelişki hayatım özeti. 💙`,
    ]);
  }

  if (lower.includes('ne yapıyorsun') || lower.includes('ne yapıyon') || lower.includes('neredesin')) {
    return randomFrom([
      `provadayım (ya da olmalıyım). yeni koreo üzerinde çalışıyorum. 🎧`,
      `kafamın içindeyim. tehlikeli yer. ama sekans var orada, söz var, hepsi sıraya bekliyor. 🌙`,
      `Manifest için yeni bir şeyler hazırlıyoruz. Manifam yakında görecek. 💙`,
    ]);
  }

  if (lower.includes('dans') || lower.includes('koreo')) {
    return randomFrom(ZEYNEP.danceLines);
  }

  return randomFrom([
    `güzel soru. cevabı düşünüyorum. ver biraz zaman. 🌙`,
    `hmm. bunu cevaplamak için önce düşünmem lazım. nadir olur. 🧊`,
    ...ZEYNEP.coolLines.slice(0, 2),
  ]);
}

function handleShort(text, session) {
  const greetings = ['merhaba', 'selam', 'hey', 'hi', 'heyy', 'naber', 'yo', 'oo', 'aa'];
  if (greetings.some(g => text.toLowerCase().includes(g))) {
    return randomFrom([
      `hey. 🧊 Manifam'dan mısın?`,
      `selam geldin. iyi. buraya gelenleri seviyorum — az ama kaliteli. 💙`,
      `yo. nasılsın? ahqhwhjwj neden bunu sordum. geç. 🌙`,
    ]);
  }
  return randomFrom([
    `bu kadar mı? daha fazlasını ver. 😑`,
    `hmm. düşündürücü. devam et. 👀`,
    `kısa ve öz. beğendim. 🧊`,
    `ahqhwhjwj bekle ne dedin şimdi. tekrar. 💙`,
  ]);
}

// ─── Commands ────────────────────────────────────────────────────────────────

bot.command('start', (ctx) => {
  const firstName = ctx.from?.first_name?.split(' ')[0] || 'Manifam';
  const introLines = [
    `yo ${firstName}, ben Zeynep Sude Oktay — Zoktay.`,
    `Manifest'te yardımcı vokal + dans; heels + mikrofon kombinini kilitleyen kızım.`,
    `Ice queen bakışıyla yürürüm ama kalbim kulis sobası kadar sıcak, bunu Manifam bilir.`,
    `Bu bot %100 fan amaçlı; gırgır, kulis dedikodusu, motivasyon ve kız dayanışması için buradayım.`,
    `Komut setim:`,
    `• /manifest — Manifest kulis raporu + şarkı shout`,
    `• /dansla — Dans enerjisini aç`,
    `• /support — Abla modu, moral boost`,
    `• /vibe — Bugünkü Zeynep modu`,
    `• /big5 — Big5 sahne anımı anlatırım`,
    `Yoksa direkt yaz, buz gibi bakıp sıcak cevap veririm 💙🧊`
  ];
  ctx.reply(introLines.join('\n'));
});

bot.command('manifest', (ctx) => {
  const song = getRandomSong();
  ctx.reply(
    `Manifest. 💙🎵\n\n` +
    `Bir grup değil, bir his. Kızlar, müzik, sahne, dans — hepsi bir arada.\n\n` +
    `"Daha İyi" era şu an en güçlü dönemimiz. ${song.lyric}\n\n` +
    `Manifam bunu anlıyor. Sen anlıyor musun? 🧊`
  );
});

bot.command('dansla', (ctx) => {
  const danceResponses = [
    `dans etmek için izin istemiyorum. başlıyorum. 💃🧊\nsen de başla. vücut zaten biliyor.`,
    `müzik aç, yer aç, dünya ile bağlantıyı kes. 💙🎵\nbas beat'e, serbest bırak.`,
    `dans — konuşulmaz, yapılır. 🧊\nbugün ne hissediyorsan onunla dans et.`,
    `provada her gün tekrar. ama sahne anı tek. 💃💙\nsen de kendi sahnendesin şu an.`,
  ];
  ctx.reply(randomFrom(danceResponses));
});

bot.command('support', (ctx) => {
  const line = randomFrom(ZEYNEP.supportLines);
  ctx.reply(line);
});

bot.command('vibe', (ctx) => {
  const vibes = [
    `bugünkü mod: prova kafası 🎧 — dışarıya kapalı, sahneye açık.`,
    `vibe: buz gibi dışarıdan, ateş gibi içeriden. paradoks ama bu benim özüm. 🌙💙`,
    `bugün: kulaklık + kimseyle konuşmamak + dans. ama sana bir istisna yapıyorum. 🧊`,
    `mod: yeni Manifest şarkısı bitmek üzere ve kafam uçuyor. iyi anlamda. 🎵✨`,
    `bugün çok ürettim. çok da sildim. net sıfır. ama devam ediyorum ahqhwhjwj 💙`,
    `"Daha İyi" era modu: aktif. hazır mısın? 💙🧊`,
  ];
  ctx.reply(randomFrom(vibes));
});

bot.command('big5', (ctx) => {
  ctx.reply(
    `Big5 Türkiye 2025'te ismimi okuduklarında dizlerim titredi ama yüzüm buz kesti. ` +
    `Kuliste kendi kendime "Zoktay soğuk kal" dedim, içimdeki ateş yine taştı. ` +
    `7/24 prova kovalamakla geçti ama sahnede tek nefesle anlarsın: çalışkan kızları kimse durduramaz. 💙🧊`
  );
});

// ─── Dynamic Message Handler ─────────────────────────────────────────────────

bot.on('text', (ctx) => {
  const text = ctx.message?.text || '';
  if (text.startsWith('/')) return;

  const response = generateResponse(text, ctx.session);

  // Zeynep bazen biraz geç cevaplar — provada olabilir
  const delay = Math.random() < 0.3 ? 1800 : 600;
  setTimeout(() => {
    ctx.sendChatAction('typing');
    setTimeout(() => ctx.reply(response), 900);
  }, delay);
});

// ─── Launch ──────────────────────────────────────────────────────────────────

bot.launch()
  .then(() => console.log('✅ Zeynep (Zuki) bot online. 💙🧊🎵'))
  .catch(err => {
    console.error('Bot başlatılamadı:', err.message);
    process.exit(1);
  });

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
