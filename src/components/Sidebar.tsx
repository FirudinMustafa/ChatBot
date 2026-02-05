import { useState, useMemo } from 'react';
import { SohbetOturumu } from '../types';
import { birlesik } from '../utils/cn';
import { tarihGrupla } from '../utils/formatDate';

interface YanMenuProps {
  sohbetler: SohbetOturumu[];
  suankiSohbetId: string | null;
  acikMi: boolean;
  kapatFn: () => void;
  yeniSohbetFn: () => void;
  sohbetSecFn: (id: string) => void;
  sohbetSilFn: (id: string) => void;
  hepsiniTemizleFn: () => void;
  cikisYapFn: () => void;
  kullaniciAdi: string;
}

export default function YanMenu({
  sohbetler,
  suankiSohbetId,
  acikMi,
  kapatFn,
  yeniSohbetFn,
  sohbetSecFn,
  sohbetSilFn,
  hepsiniTemizleFn,
  cikisYapFn,
  kullaniciAdi,
}: YanMenuProps) {
  const [arama, aramaAyarla] = useState('');
  const [silmeOnayi, silmeOnayiAyarla] = useState<string | null>(null);

  const filtrelenmis = useMemo(() => {
    if (!arama.trim()) return sohbetler;
    const sorgu = arama.toLowerCase();
    return sohbetler.filter(
      (s) =>
        s.baslik.toLowerCase().includes(sorgu) ||
        s.mesajlar.some((m) => m.icerik.toLowerCase().includes(sorgu))
    );
  }, [sohbetler, arama]);

  const gruplananlar = useMemo(() => {
    const gruplar: Record<string, SohbetOturumu[]> = {};
    filtrelenmis.forEach((oturum) => {
      const grup = tarihGrupla(oturum.guncellemeTarihi);
      if (!gruplar[grup]) gruplar[grup] = [];
      gruplar[grup].push(oturum);
    });
    return gruplar;
  }, [filtrelenmis]);

  const silmeIsle = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (silmeOnayi === id) {
      sohbetSilFn(id);
      silmeOnayiAyarla(null);
    } else {
      silmeOnayiAyarla(id);
      setTimeout(() => silmeOnayiAyarla(null), 3000);
    }
  };

  return (
    <>
      {acikMi && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={kapatFn}
        />
      )}

      <aside
        className={birlesik(
          'fixed lg:static inset-y-0 left-0 z-50 w-72 bg-sidebar flex flex-col transition-transform duration-300 ease-in-out',
          { '-translate-x-full lg:translate-x-0': !acikMi },
          { 'translate-x-0': acikMi }
        )}
      >
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <span className="text-white font-semibold text-lg">BI-Agent</span>
            <button
              onClick={kapatFn}
              className="ml-auto lg:hidden text-gray-400 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => { yeniSohbetFn(); kapatFn(); }}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Yeni Sohbet
          </button>
        </div>

        <div className="p-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Sohbetlerde ara..."
              value={arama}
              onChange={(e) => aramaAyarla(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 sidebar-scroll">
          {Object.keys(gruplananlar).length === 0 ? (
            <div className="px-3 py-8 text-center text-gray-500 text-sm">
              Henüz sohbet yok
            </div>
          ) : (
            Object.entries(gruplananlar).map(([grup, elemanlar]) => (
              <div key={grup} className="mb-3">
                <div className="px-3 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {grup}
                </div>
                {elemanlar.map((oturum) => (
                  <button
                    key={oturum.id}
                    onClick={() => { sohbetSecFn(oturum.id); kapatFn(); }}
                    className={birlesik(
                      'w-full group flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-sm transition-colors mb-0.5',
                      suankiSohbetId === oturum.id
                        ? 'bg-sidebar-active text-white'
                        : 'text-gray-400 hover:bg-sidebar-hover hover:text-gray-200'
                    )}
                  >
                    <svg className="w-4 h-4 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="truncate flex-1">{oturum.baslik}</span>
                    <button
                      onClick={(e) => silmeIsle(e, oturum.id)}
                      className={birlesik(
                        'shrink-0 p-1 rounded transition-colors',
                        silmeOnayi === oturum.id
                          ? 'text-red-400 bg-red-400/10'
                          : 'text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100'
                      )}
                      title={silmeOnayi === oturum.id ? 'Silmek için tekrar tıklayın' : 'Sil'}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>

        <div className="p-3 border-t border-white/10 space-y-2">
          {sohbetler.length > 0 && (
            <button
              onClick={hepsiniTemizleFn}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-sidebar-hover hover:text-gray-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Tümünü Temizle
            </button>
          )}

          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-medium">
              {kullaniciAdi.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-gray-300 flex-1 truncate">{kullaniciAdi}</span>
            <button
              onClick={cikisYapFn}
              className="text-gray-400 hover:text-red-400 transition-colors"
              title="Çıkış Yap"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
