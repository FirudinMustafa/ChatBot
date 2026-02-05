import { useEffect } from 'react';
import { birlesik } from '../utils/cn';

interface BildirimProps {
  mesaj: string;
  tur?: 'success' | 'error';
  kapatFn: () => void;
}

export default function Bildirim({ mesaj, tur = 'error', kapatFn }: BildirimProps) {
  useEffect(() => {
    const zamanlayici = setTimeout(kapatFn, 4000);
    return () => clearTimeout(zamanlayici);
  }, [kapatFn]);

  return (
    <div className="fixed top-4 right-4 z-[100] animate-slide-in">
      <div
        className={birlesik(
          'flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium',
          {
            'bg-red-50 text-red-700 border border-red-200': tur === 'error',
            'bg-emerald-50 text-emerald-700 border border-emerald-200': tur === 'success',
          }
        )}
      >
        {tur === 'error' ? (
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
        <span>{mesaj}</span>
        <button onClick={kapatFn} className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
