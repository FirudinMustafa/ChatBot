import { Mesaj, TabloVerisi } from '../types';

function rastgeleIdOlustur(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function bekle(ms: number): Promise<void> {
  return new Promise(cozumle => setTimeout(cozumle, ms));
}

const sahteCevaplar: { yazi: string; tabloVerisi?: TabloVerisi }[] = [
  {
    yazi: "Son 30 gündeki satış verilerinizi analiz ettim. Toplam satış tutarı **₺1,245,890** olarak gerçekleşmiş. En yüksek satış **Elektronik** kategorisinde görülüyor.",
    tabloVerisi: {
      sutunAdlari: ['Kategori', 'Satış Adedi', 'Toplam Tutar', 'Ortalama'],
      satirlar: [
        ['Elektronik', 342, '₺520,400', '₺1,521'],
        ['Giyim', 567, '₺340,200', '₺600'],
        ['Gıda', 1205, '₺245,100', '₺203'],
        ['Mobilya', 89, '₺140,190', '₺1,575'],
      ],
    },
  },
  {
    yazi: "Veritabanında toplam **2,458** aktif müşteri bulunmaktadır. Bu ay **127** yeni müşteri kaydı oluşturulmuş. Geçen aya kıyasla %12 artış var.",
  },
  {
    yazi: "Aylık gelir raporu aşağıdaki gibidir. **Ocak** ayında en yüksek gelir elde edilmiş.",
    tabloVerisi: {
      sutunAdlari: ['Ay', 'Gelir', 'Gider', 'Kâr'],
      satirlar: [
        ['Ocak', '₺890,000', '₺650,000', '₺240,000'],
        ['Şubat', '₺780,000', '₺590,000', '₺190,000'],
        ['Mart', '₺920,000', '₺700,000', '₺220,000'],
        ['Nisan', '₺850,000', '₺620,000', '₺230,000'],
        ['Mayıs', '₺960,000', '₺710,000', '₺250,000'],
      ],
    },
  },
  {
    yazi: "Stok durumunu kontrol ettim. **15** üründe stok kritik seviyenin altında. Acil sipariş verilmesi önerilir.",
    tabloVerisi: {
      sutunAdlari: ['Ürün Kodu', 'Ürün Adı', 'Mevcut Stok', 'Kritik Seviye'],
      satirlar: [
        ['PRD-001', 'Laptop Model X', 3, 10],
        ['PRD-015', 'Klavye K200', 5, 15],
        ['PRD-042', 'Monitor 27"', 2, 8],
        ['PRD-078', 'Mouse M100', 4, 12],
      ],
    },
  },
  {
    yazi: "Son 7 günde **89** sipariş tamamlanmış, **12** sipariş beklemede, **3** sipariş iptal edilmiş. Tamamlanma oranı **%85.6** ile hedefin üzerinde.",
  },
  {
    yazi: "En çok satan ilk 5 ürünü listeledim. **Wireless Kulaklık** açık ara önde.",
    tabloVerisi: {
      sutunAdlari: ['Sıra', 'Ürün', 'Satış Adedi', 'Gelir'],
      satirlar: [
        [1, 'Wireless Kulaklık', 456, '₺182,400'],
        [2, 'USB-C Hub', 389, '₺116,700'],
        [3, 'Mekanik Klavye', 312, '₺249,600'],
        [4, 'Webcam HD', 278, '₺83,400'],
        [5, 'Laptop Standı', 245, '₺73,500'],
      ],
    },
  },
];

let cevapSayaci = 0;

export async function girisYapApi(
  kullaniciAdi: string,
  sifre: string
): Promise<{ basarili: boolean; mesaj: string }> {
  await bekle(800);

  if (kullaniciAdi === 'Zess' && sifre === 'Zess') {
    return { basarili: true, mesaj: 'Giriş başarılı' };
  }

  return { basarili: false, mesaj: 'Kullanıcı adı veya şifre hatalı' };
}

export async function mesajGonderApi(_mesaj: string): Promise<Mesaj> {
  await bekle(1000 + Math.random() * 1500);

  const sahte = sahteCevaplar[cevapSayaci % sahteCevaplar.length];
  cevapSayaci++;

  return {
    id: rastgeleIdOlustur(),
    rol: 'assistant',
    icerik: sahte.yazi,
    icerikTuru: sahte.tabloVerisi ? 'table' : 'text',
    tabloVerisi: sahte.tabloVerisi,
    zamanDamgasi: Date.now(),
  };
}
