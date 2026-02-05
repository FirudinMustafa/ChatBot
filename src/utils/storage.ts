import { SohbetOturumu, Kullanici } from '../types';

const ANAHTARLAR = {
  KULLANICI: 'bi-agent-kullanici',
  SOHBETLER: 'bi-agent-sohbetler',
  SUANKI_SOHBET: 'bi-agent-suanki-sohbet',
} as const;

export function kayitliKullaniciyiGetir(): Kullanici | null {
  try {
    const veri = localStorage.getItem(ANAHTARLAR.KULLANICI);
    return veri ? JSON.parse(veri) : null;
  } catch {
    return null;
  }
}

export function kullaniciyiKaydet(kullanici: Kullanici | null) {
  if (kullanici) {
    localStorage.setItem(ANAHTARLAR.KULLANICI, JSON.stringify(kullanici));
  } else {
    localStorage.removeItem(ANAHTARLAR.KULLANICI);
  }
}

export function kayitliSohbetleriGetir(): SohbetOturumu[] {
  try {
    const veri = localStorage.getItem(ANAHTARLAR.SOHBETLER);
    return veri ? JSON.parse(veri) : [];
  } catch {
    return [];
  }
}

export function sohbetleriKaydet(sohbetler: SohbetOturumu[]) {
  localStorage.setItem(ANAHTARLAR.SOHBETLER, JSON.stringify(sohbetler));
}

export function suankiSohbetIdGetir(): string | null {
  return localStorage.getItem(ANAHTARLAR.SUANKI_SOHBET);
}

export function suankiSohbetIdKaydet(id: string | null) {
  if (id) {
    localStorage.setItem(ANAHTARLAR.SUANKI_SOHBET, id);
  } else {
    localStorage.removeItem(ANAHTARLAR.SUANKI_SOHBET);
  }
}
