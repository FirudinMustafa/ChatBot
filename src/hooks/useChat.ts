import { useState, useCallback, useEffect } from 'react';
import { SohbetOturumu, Mesaj } from '../types';
import {
  kayitliSohbetleriGetir,
  sohbetleriKaydet,
  suankiSohbetIdGetir,
  suankiSohbetIdKaydet,
} from '../utils/storage';
import { mesajGonderApi } from '../services/api';

function rastgeleIdOlustur(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function sohbetKullan() {
  const [sohbetler, sohbetleriAyarla] = useState<SohbetOturumu[]>(() => kayitliSohbetleriGetir());
  const [suankiSohbetId, suankiIdAyarla] = useState<string | null>(() => suankiSohbetIdGetir());
  const [yukleniyor, yukleniyorAyarla] = useState(false);

  const suankiSohbet = sohbetler.find((s) => s.id === suankiSohbetId) || null;

  useEffect(() => {
    sohbetleriKaydet(sohbetler);
  }, [sohbetler]);

  useEffect(() => {
    suankiSohbetIdKaydet(suankiSohbetId);
  }, [suankiSohbetId]);

  const yeniSohbetOlustur = useCallback(() => {
    const yeniOturum: SohbetOturumu = {
      id: rastgeleIdOlustur(),
      baslik: 'Yeni Sohbet',
      mesajlar: [],
      olusturmaTarihi: Date.now(),
      guncellemeTarihi: Date.now(),
    };
    sohbetleriAyarla((onceki) => [yeniOturum, ...onceki]);
    suankiIdAyarla(yeniOturum.id);
    return yeniOturum.id;
  }, []);

  const sohbetSec = useCallback((id: string) => {
    suankiIdAyarla(id);
  }, []);

  const sohbetiSil = useCallback(
    (id: string) => {
      sohbetleriAyarla((onceki) => onceki.filter((s) => s.id !== id));
      if (suankiSohbetId === id) {
        suankiIdAyarla(null);
      }
    },
    [suankiSohbetId]
  );

  const tumSohbetleriSil = useCallback(() => {
    sohbetleriAyarla([]);
    suankiIdAyarla(null);
  }, []);

  const mesajGonder = useCallback(
    async (icerik: string) => {
      let oturumId = suankiSohbetId;

      if (!oturumId) {
        const id = rastgeleIdOlustur();
        const yeniOturum: SohbetOturumu = {
          id,
          baslik: icerik.slice(0, 40) + (icerik.length > 40 ? '...' : ''),
          mesajlar: [],
          olusturmaTarihi: Date.now(),
          guncellemeTarihi: Date.now(),
        };
        sohbetleriAyarla((onceki) => [yeniOturum, ...onceki]);
        suankiIdAyarla(id);
        oturumId = id;
      }

      const kullaniciMesaji: Mesaj = {
        id: rastgeleIdOlustur(),
        rol: 'user',
        icerik,
        icerikTuru: 'text',
        zamanDamgasi: Date.now(),
      };

      sohbetleriAyarla((onceki) =>
        onceki.map((s) => {
          if (s.id !== oturumId) return s;
          const ilkMesajMi = s.mesajlar.length === 0;
          return {
            ...s,
            baslik: ilkMesajMi
              ? icerik.slice(0, 40) + (icerik.length > 40 ? '...' : '')
              : s.baslik,
            mesajlar: [...s.mesajlar, kullaniciMesaji],
            guncellemeTarihi: Date.now(),
          };
        })
      );

      yukleniyorAyarla(true);

      try {
        const cevap = await mesajGonderApi(icerik);
        sohbetleriAyarla((onceki) =>
          onceki.map((s) => {
            if (s.id !== oturumId) return s;
            return {
              ...s,
              mesajlar: [...s.mesajlar, cevap],
              guncellemeTarihi: Date.now(),
            };
          })
        );
      } catch {
        const hataMesaji: Mesaj = {
          id: rastgeleIdOlustur(),
          rol: 'assistant',
          icerik: 'Bir hata oluştu. Lütfen tekrar deneyin.',
          icerikTuru: 'error',
          zamanDamgasi: Date.now(),
        };
        sohbetleriAyarla((onceki) =>
          onceki.map((s) => {
            if (s.id !== oturumId) return s;
            return {
              ...s,
              mesajlar: [...s.mesajlar, hataMesaji],
              guncellemeTarihi: Date.now(),
            };
          })
        );
      } finally {
        yukleniyorAyarla(false);
      }
    },
    [suankiSohbetId]
  );

  return {
    sohbetler,
    suankiSohbet,
    suankiSohbetId,
    yukleniyor,
    yeniSohbetOlustur,
    sohbetSec,
    sohbetiSil,
    tumSohbetleriSil,
    mesajGonder,
  };
}
