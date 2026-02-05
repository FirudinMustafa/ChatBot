import { useState } from 'react';
import { girisKullan } from '../context/AuthContext';
import { sohbetKullan } from '../hooks/useChat';
import YanMenu from '../components/Sidebar';
import SohbetBasligi from '../components/ChatHeader';
import MesajListesi from '../components/MessageList';
import SohbetGirdisi from '../components/ChatInput';
import BosDurum from '../components/EmptyState';

export default function SohbetSayfasi() {
  const { kullanici, cikisYap } = girisKullan();

  const {
    sohbetler,
    suankiSohbet,
    suankiSohbetId,
    yukleniyor,
    yeniSohbetOlustur,
    sohbetSec,
    sohbetiSil,
    tumSohbetleriSil,
    mesajGonder,
  } = sohbetKullan();

  const [menuAcik, menuAcikAyarla] = useState(false);

  const mesajIsle = (mesaj: string) => {
    mesajGonder(mesaj);
  };

  const oneriIsle = (metin: string) => {
    mesajGonder(metin);
  };

  return (
    <div className="h-screen flex bg-slate-50">
      <YanMenu
        sohbetler={sohbetler}
        suankiSohbetId={suankiSohbetId}
        acikMi={menuAcik}
        kapatFn={() => menuAcikAyarla(false)}
        yeniSohbetFn={yeniSohbetOlustur}
        sohbetSecFn={sohbetSec}
        sohbetSilFn={sohbetiSil}
        hepsiniTemizleFn={tumSohbetleriSil}
        cikisYapFn={cikisYap}
        kullaniciAdi={kullanici?.kullaniciAdi || 'Kullanıcı'}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <SohbetBasligi menuAcKapaFn={() => menuAcikAyarla(true)} />

        {suankiSohbet && suankiSohbet.mesajlar.length > 0 ? (
          <MesajListesi mesajlar={suankiSohbet.mesajlar} yukleniyor={yukleniyor} />
        ) : (
          <BosDurum oneriFn={oneriIsle} />
        )}

        <SohbetGirdisi gonderFn={mesajIsle} devreDisi={yukleniyor} />
      </main>
    </div>
  );
}
