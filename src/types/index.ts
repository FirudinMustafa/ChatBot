export interface Kullanici {
  kullaniciAdi: string;
}

export type MesajIcerikTuru = 'text' | 'table' | 'error' | 'system';

export interface TabloVerisi {
  sutunAdlari: string[];
  satirlar: (string | number | null)[][];
}

export interface Mesaj {
  id: string;
  rol: 'user' | 'assistant';
  icerik: string;
  icerikTuru: MesajIcerikTuru;
  tabloVerisi?: TabloVerisi;
  zamanDamgasi: number;
}

export interface SohbetOturumu {
  id: string;
  baslik: string;
  mesajlar: Mesaj[];
  olusturmaTarihi: number;
  guncellemeTarihi: number;
}
