import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { girisKullan } from '../context/AuthContext';
import Bildirim from '../components/Toast';

export default function GirisSayfasi() {
  const [kullaniciAdi, kullaniciAdiAyarla] = useState('');
  const [sifre, sifreAyarla] = useState('');
  const [yukleniyor, yukleniyorAyarla] = useState(false);
  const [hata, hataAyarla] = useState<string | null>(null);

  const { girisYap } = girisKullan();
  const yonlendir = useNavigate();

  const formGonder = async (e: FormEvent) => {
    e.preventDefault();
    hataAyarla(null);

    if (!kullaniciAdi.trim() || !sifre.trim()) {
      hataAyarla('Lütfen kullanıcı adı ve şifre girin.');
      return;
    }

    yukleniyorAyarla(true);
    try {
      const sonuc = await girisYap(kullaniciAdi.trim(), sifre.trim());
      if (sonuc.basarili) {
        yonlendir('/chat', { replace: true });
      } else {
        hataAyarla(sonuc.mesaj);
      }
    } catch {
      hataAyarla('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      yukleniyorAyarla(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {hata && <Bildirim mesaj={hata} tur="error" kapatFn={() => hataAyarla(null)} />}

      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold">BI-Agent</h1>
          </div>

          <h2 className="text-4xl font-bold leading-tight mb-4">
            Verilerinizi
            <br />
            Doğal Dille
            <br />
            Sorgulayın
          </h2>

          <p className="text-lg text-primary-100 mb-10 max-w-md leading-relaxed">
            Karmaşık SQL sorguları yazmak yerine, sorularınızı Türkçe olarak sorun.
            Akıllı asistanımız sizin için doğru sorguları oluştursun.
          </p>

          <div className="space-y-4">
            {[
              { ikon: 'M13 10V3L4 14h7v7l9-11h-7z', yazi: 'Hızlı ve kolay veri sorgulama' },
              { ikon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', yazi: 'Detaylı veri analizleri' },
              { ikon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', yazi: 'Doğal dil ile SQL sorguları' },
            ].map((ozellik) => (
              <div key={ozellik.yazi} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={ozellik.ikon} />
                  </svg>
                </div>
                <span className="text-sm text-primary-100">{ozellik.yazi}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-800">BI-Agent</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Hoş Geldiniz</h2>
            <p className="text-gray-500 mt-1">Hesabınıza giriş yapın</p>
          </div>

          <form onSubmit={formGonder} className="space-y-5">
            <div>
              <label htmlFor="kullaniciAdi" className="block text-sm font-medium text-gray-700 mb-1.5">
                Kullanıcı Adı
              </label>
              <input
                id="kullaniciAdi"
                type="text"
                value={kullaniciAdi}
                onChange={(e) => kullaniciAdiAyarla(e.target.value)}
                placeholder="Kullanıcı adınızı girin"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="sifre" className="block text-sm font-medium text-gray-700 mb-1.5">
                Şifre
              </label>
              <input
                id="sifre"
                type="password"
                value={sifre}
                onChange={(e) => sifreAyarla(e.target.value)}
                placeholder="Şifrenizi girin"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={yukleniyor}
              className="w-full py-2.5 px-4 bg-primary-600 text-white rounded-xl font-medium text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {yukleniyor ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Giriş yapılıyor...
                </span>
              ) : (
                'Giriş Yap'
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-8">
            BI-Agent SQL Asistanı v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
