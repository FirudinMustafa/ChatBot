import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Mesaj } from '../types';
import { birlesik } from '../utils/cn';
import { saatFormatla } from '../utils/formatDate';
import TabloGosterici from './TableRenderer';

interface MesajBalonuProps {
  mesaj: Mesaj;
}

export default function MesajBalonu({ mesaj }: MesajBalonuProps) {
  const [kopyalandi, kopyalandiAyarla] = useState(false);
  const kullaniciMi = mesaj.rol === 'user';
  const hataMi = mesaj.icerikTuru === 'error';

  const kopyala = async () => {
    try {
      await navigator.clipboard.writeText(mesaj.icerik);
      kopyalandiAyarla(true);
      setTimeout(() => kopyalandiAyarla(false), 2000);
    } catch {
    }
  };

  return (
    <div
      className={birlesik('flex gap-3 group', {
        'justify-end': kullaniciMi,
      })}
    >
      {!kullaniciMi && (
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-1">
          <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
        </div>
      )}

      <div className={birlesik('max-w-[80%] lg:max-w-[70%]', { 'order-1': kullaniciMi })}>
        <div
          className={birlesik('rounded-2xl px-4 py-3 relative', {
            'bg-primary-600 text-white': kullaniciMi,
            'bg-white border border-gray-200 text-gray-800 shadow-sm': !kullaniciMi && !hataMi,
            'bg-red-50 border border-red-200 text-red-700': hataMi,
          })}
        >
          {kullaniciMi ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{mesaj.icerik}</p>
          ) : (
            <div className="text-sm leading-relaxed prose prose-sm max-w-none prose-p:my-1 prose-strong:text-gray-900">
              <ReactMarkdown>{mesaj.icerik}</ReactMarkdown>
            </div>
          )}

          {mesaj.tabloVerisi && <TabloGosterici veri={mesaj.tabloVerisi} />}

          {!kullaniciMi && (
            <button
              onClick={kopyala}
              className="absolute -bottom-8 left-0 flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {kopyalandi ? (
                <>
                  <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-500">Kopyalandı</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Kopyala
                </>
              )}
            </button>
          )}
        </div>

        <div
          className={birlesik('text-xs text-gray-400 mt-1.5 px-1', {
            'text-right': kullaniciMi,
          })}
        >
          {saatFormatla(mesaj.zamanDamgasi)}
        </div>
      </div>

      {kullaniciMi && (
        <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center shrink-0 mt-1 text-white text-xs font-medium">
          S
        </div>
      )}
    </div>
  );
}
