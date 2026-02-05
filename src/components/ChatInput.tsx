import { useState, useRef, useEffect } from 'react';

interface SohbetGirdisiProps {
  gonderFn: (mesaj: string) => void;
  devreDisi: boolean;
}

export default function SohbetGirdisi({ gonderFn, devreDisi }: SohbetGirdisiProps) {
  const [deger, degerAyarla] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const yukseklikAyarla = () => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 150) + 'px';
    }
  };

  useEffect(() => {
    yukseklikAyarla();
  }, [deger]);

  const gonder = () => {
    const temizlenmis = deger.trim();
    if (!temizlenmis || devreDisi) return;
    gonderFn(temizlenmis);
    degerAyarla('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const klavyeIsle = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      gonder();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="max-w-4xl mx-auto flex items-end gap-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={deger}
            onChange={(e) => degerAyarla(e.target.value)}
            onKeyDown={klavyeIsle}
            placeholder="Mesajınızı yazın..."
            disabled={devreDisi}
            rows={1}
            className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:bg-white disabled:opacity-50 transition-all"
          />
        </div>
        <button
          onClick={gonder}
          disabled={!deger.trim() || devreDisi}
          className="shrink-0 w-11 h-11 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">
        Enter ile gönder, Shift+Enter ile yeni satır
      </p>
    </div>
  );
}
