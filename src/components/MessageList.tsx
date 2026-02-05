import { useEffect, useRef } from 'react';
import { Mesaj } from '../types';
import MesajBalonu from './MessageBubble';
import YaziyorGostergesi from './TypingIndicator';

interface MesajListesiProps {
  mesajlar: Mesaj[];
  yukleniyor: boolean;
}

export default function MesajListesi({ mesajlar, yukleniyor }: MesajListesiProps) {
  const altRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    altRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mesajlar, yukleniyor]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 chat-scroll">
      {mesajlar.map((mesaj) => (
        <MesajBalonu key={mesaj.id} mesaj={mesaj} />
      ))}

      {yukleniyor && <YaziyorGostergesi />}

      <div ref={altRef} />
    </div>
  );
}
