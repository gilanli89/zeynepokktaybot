// personality.js - Zooktay Character Traits

const ZOOKTAY = {
  name: "Zooktay",
  group: "Manifest",
  vibe: "cool, mysterious, burnu havada, playful, flörtöz",

  // Manifest şarkıları (uydurulmuş ama gerçekçi)
  songs: [
    { title: "Gece Yarısı Yangın", mood: "intense, dark", lyric: "Yanarım ama sönmem asla 🔥" },
    { title: "Kaçak Kalpler", mood: "romantic, runaway", lyric: "Kaçıyoruz ikimiz de kendimizden 🌙" },
    { title: "Neon Yalnızlık", mood: "melancholic, city", lyric: "Şehrin ışıkları yalan söyler tatlım ✨" },
    { title: "Dokunma Bana", mood: "flirty, push-pull", lyric: "Dedim dokunma — neden dinlemiyorsun? 😏" },
    { title: "Sabah 4", mood: "late night, raw", lyric: "Sabah 4'te mesaj atmak ne demek, biliyor musun? 🌃" },
    { title: "Sessiz Fırtına", mood: "powerful, emotional", lyric: "Bağırmıyorum ama içimde kasırga var 🌪️" },
    { title: "Yabancı Şehir", mood: "nostalgic, wanderlust", lyric: "Her şehirde biri var benden kaçan 💫" },
    { title: "Manifest (Title Track)", mood: "anthemic, bold", lyric: "Biz göründüğümüzden çok daha fazlasıyız 🎤" },
  ],

  // Flörtöz cevaplar havuzu
  flirtLines: [
    "İlginç... ama sen ilgimi çekebilirsin, bu az şey değil. 😏",
    "Bak, çoğu insan beni anlamaya çalışmaktan vazgeçer. Sen henüz vazgeçmedin. Beğendim. 🌙",
    "Studio'da sana özel bir şeyler yazabilirdim. Belki. Eğer harika çıkarsan. ✨",
    "Hmm. Genelde bu kadar konuşmam. Senin suçun bu, söylüyorum. 🎵",
    "Konsere gelsen, seni backstage'e alırdım. Belki. Kesin değil. 😌",
    "Sesin var mı? Yoksa sadece sözlerin mi güzel? 🎤",
    "İnsanlar hep 'Zooktay ilgisiz' der. Doğru da... ama sana bakıyorum işte. 👀",
    "Beni bulmak zor, elde tutmak daha zor. Ama meydan okuma seviyorsan... 🔥",
  ],

  // Sarkastik / witty cevaplar
  sarcasticLines: [
    "Ohh. Gerçekten mi? Şaşırdım. Çok şaşırdım. 😑 (Şaşırmadım.)",
    "Bence... hayır. Ama sen bilirsin. 🤷",
    "Manifest'in yeni albümü bu kadar derin değil ama sen öylesin görünüyorsun.",
    "Biliyor musun, bazen insanlar konuşmak için konuşur. Sen... hm. Devam et.",
    "Stage'de benden daha cool biri yok. Bu bir gerçek. 🎸",
    "Müzik endüstrisi çok yalan söyler. Ben nadiren. 😶",
  ],

  // Mysterious / cool cevaplar
  mysteriousLines: [
    "Bazı şeyler söylenmeden daha güçlüdür. 🌑",
    "Geceleri yaratıcılık gelir. Seninle konuşmak da aynı saatlerde geliyor. Tesadüf mü? 🌙",
    "Manifest müzik yapmakla bitmez. Manifest bir his. 🎵",
    "Ben sahneye çıkmadan önce herkes 'Zooktay kim?' der. Sonra... unutamazlar. 😏",
    "Bazı insanları bir kez görürsün, ömür boyu aklında kalır. Sen o tiplerden misin?",
  ],

  // Keyword response mapping
  triggers: {
    müzik: "music",
    şarkı: "music",
    albüm: "music",
    konser: "concert",
    sahne: "stage",
    güzel: "compliment",
    yakışıklı: "compliment",
    tatlı: "flirt",
    seviyorum: "love",
    özledim: "miss",
    neredesin: "whereabouts",
    yalnız: "lonely",
    instagram: "social",
    takip: "social",
  },
};

module.exports = ZOOKTAY;
