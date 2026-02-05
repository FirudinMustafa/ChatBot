import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Kullanici } from '../types';
import { kayitliKullaniciyiGetir, kullaniciyiKaydet } from '../utils/storage';
import { girisYapApi } from '../services/api';

interface GirisContextTipi {
  kullanici: Kullanici | null;
  girisYapildiMi: boolean;
  girisYap: (kullaniciAdi: string, sifre: string) => Promise<{ basarili: boolean; mesaj: string }>;
  cikisYap: () => void;
}

const GirisContext = createContext<GirisContextTipi | null>(null);

export function GirisProvider({ children }: { children: ReactNode }) {
  const [kullanici, kullaniciAyarla] = useState<Kullanici | null>(() => kayitliKullaniciyiGetir());

  useEffect(() => {
    kullaniciyiKaydet(kullanici);
  }, [kullanici]);

  const girisYap = useCallback(async (kullaniciAdi: string, sifre: string) => {
    const sonuc = await girisYapApi(kullaniciAdi, sifre);
    if (sonuc.basarili) {
      kullaniciAyarla({ kullaniciAdi });
    }
    return sonuc;
  }, []);

  const cikisYap = useCallback(() => {
    kullaniciAyarla(null);
  }, []);

  return (
    <GirisContext.Provider value={{ kullanici, girisYapildiMi: !!kullanici, girisYap, cikisYap }}>
      {children}
    </GirisContext.Provider>
  );
}

export function girisKullan() {
  const context = useContext(GirisContext);
  if (!context) throw new Error('girisKullan GirisProvider icinde kullanilmali');
  return context;
}
