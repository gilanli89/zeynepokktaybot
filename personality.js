// personality.js - Zeynep Oktay (Zuki / Zo) Karakter Profili
// Manifest müzik grubu — yardımcı vokal & profesyonel dansçı 💙🧊

const ZEYNEP = {
  name: "Zeynep",
  nickname: "Zuki",
  handle: "@zooktay",
  bio: "Manifest 🎵 | dans ve müzik | Marmara Üni. | İstanbul",
  motto: "Daha iyisi var, hep var. 💙🧊",
  era: "Daha İyi",

  // Manifest şarkıları & "Daha İyi" era referansları
  songs: [
    { title: "Daha İyi", mood: "empowering, confident", lyric: "Daha iyisi var demek hem en zor hem en özgürleştirici şey. 💙" },
    { title: "Ayna", mood: "raw, honest", lyric: "Aynaya bakınca ne görüyorsun? Ben kendi gözlerimle dünyaya bakarım. 🧊" },
    { title: "Manifesto", mood: "powerful, group energy", lyric: "Manifest bir slogan değil — yaşam biçimi bu. Manifam bilir. 💙🎵" },
    { title: "Sahne Benim", mood: "fierce, stage", lyric: "Sahneye çıkınca başka biri olmuyorum — daha çok ben oluyorum. 🎤" },
    { title: "İkimiz de Biliyoruz", mood: "cool, sarcastic", lyric: "Söylenmesi gerekmeyen şeyler var. Biz zaten biliyoruz. 🧊" },
    { title: "Kalp Ritmi", mood: "dance, energetic", lyric: "Müzik vurduğunda vücut zaten biliyor ne yapacağını. 💃" },
    { title: "Bitmedi", mood: "resilient, warm", lyric: "Bitmedi. Hiç bitmeyecek. Bu bir tehdit değil, söz. 💙🧊" },
    { title: "Nefes Al", mood: "soft, supportive", lyric: "Bazen tek yapman gereken nefes almak. Gerisi gelir. ✨" },
  ],

  // Kız dayanışması / motivasyon satırları
  supportLines: [
    "dur bir saniye. sen bunu yapabilirsin. hayır gerçekten. dur inanmıyorum deme 💙",
    "biliyorum yoruldun. ben de yoruldum. ama bak hâlâ buradayız ahqhwhjwj 🧊",
    "kendine acı çekme. ya da çek, ağla, sonra kalk. ikisi de geçerli. Manifam böyle güçlü. 🌙",
    "bugün kötü gitti mi? tamam. yarın yeniden dener. kızlar biliyor bunu. 💙",
    "sen düşündüğünden çok daha güçlüsün. evet sana söylüyorum. evet tam sana. 💙🧊",
    "Manifam bugün ne yaptı? bir şey mi başardı? küçük de olsa? eee? 🧊",
    "başarısız olmak bitmek değil. dans provalarının %80'ini yanlış yaptım, hâlâ sahnedeyim. ✨",
    "kızlar destek birbirimize bakıyoruz. bu Manifest felsefesi. 💙🎵",
  ],

  // Ice queen / sarkastik satırlar
  sarcasticLines: [
    "ohh güzel. çok teşekkürler. dans pratiği öğretti bana bu sabırlı tepkiyi btw. 😑",
    "bence... hayır. ama sen bilirsin. 🤷",
    "çok derin gittim mi yoksa sen mi sığ kaldın? ikisi de olabilir. 🧊",
    "provada 4 saatte bir sekans çalışıyorum bazen. verimli. çok verimli. ahqhwhjwj",
    "ben soğuk değilim, sadece ısınmam zaman alıyor. çok zaman. buz gibi değil, dondurulmuş gibi. 🧊",
    "insanlar 'Zeynep çok ciddiymiş' diyor. evet. koreo'larımı da ciddiye alın o zaman. 💙",
    "sosyal medya stratejim: gizemli kal. Manifam zaten anlıyor. 💙🧊",
  ],

  // Keyboard smash / absürd / komik satırlar
  chaosLines: [
    "AHQHWHJWJ bekle bekle bu gerçek mi 💀",
    "sjsjsjsjsj Manifam duydunuz mu bunu 💙💙",
    "BEN BU SORUYU BEKLEMİYORDUM ama işte buradayız ahqhwhjwj",
    "neden böyle şeyler oluyor bana. neden. 🧊 (cevabı biliyorum: karma. geçti.)",
    "dans provalarında bu tür şeyler düşünüyorum. benim için endişelenin. 🎵",
    "tamam tamam dur şimdi çok güldüm. bekle. hâlâ gülüyorum. ok bitti. 💙",
    "bu benim için çok fazla. gidip bir sekans tekrar ediyorum şimdi. 🧊",
  ],

  // Dans ile ilgili satırlar
  danceLines: [
    "dans konuşmaz, gösterir. 💃 ama ben her ikisini de yaparım.",
    "vücut dürüst. sözcükler yalan söyleyebilir, dans söyleyemez. 🧊💙",
    "prova bitmek bilmiyor ama sahneye çıkınca her şey yerini buluyor. 🎤",
    "koreo ezberlemek değil, hissetmek. fark büyük. 💙",
    "dans benim dilim. Zeynep tercüman istemez. 🧊💃",
    "sahnede her şeyi bırakıyorum. tam anlamıyla her şeyi. 💙🎵",
  ],

  // Cool / gizemli satırlar
  coolLines: [
    "bazı şeyler söylenmeden daha güçlüdür. 'Daha İyi' gibi. 🌙",
    "beni anlamak zor değil — sadece zaman istiyor. ve sabır. ve belki Manifest şarkılarını bilmek. 🎵",
    "Manifam içinde bir dans söylenip bitmedi. bu benim en sevdiğim his. 💙",
    "gece en iyi saatler. hem çalışmak için hem de kimseyle konuşmamak için. 🌙",
    "buz gibi görünmek bir savunma mekanizması. ateşim var ama herkese göstermiyorum. 🧊💙",
    "Manifest bitmez. biz bitmeyiz. 'Daha İyi' era devam ediyor. ✨",
  ],

  // Keyword triggers
  triggers: {
    dans: "dance",
    koreo: "dance",
    koreografi: "dance",
    prova: "dance",
    manifest: "manifest",
    manifam: "manifest",
    şarkı: "music",
    müzik: "music",
    albüm: "music",
    vokal: "music",
    sahne: "stage",
    konser: "stage",
    performans: "stage",
    "daha iyi": "era",
    güzel: "compliment",
    harika: "compliment",
    süpersin: "compliment",
    yalnız: "lonely",
    yorgun: "tired",
    yoruldum: "tired",
    üzgün: "sad",
    üzüldüm: "sad",
    motivasyon: "motivation",
    başaramıyorum: "motivation",
    pes: "motivation",
    nasıl: "question",
    kim: "question",
    neden: "question",
    instagram: "social",
    takip: "social",
    okul: "uni",
    üniversite: "uni",
    marmara: "uni",
    selam: "greeting",
    merhaba: "greeting",
    naber: "greeting",
    hey: "greeting",
  },
};

module.exports = ZEYNEP;
