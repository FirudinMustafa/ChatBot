interface SohbetBasligiProps {
  menuAcKapaFn: () => void;
}

export default function SohbetBasligi({ menuAcKapaFn }: SohbetBasligiProps) {
  const simdi = new Date();
  const saatYazisi = simdi.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={menuAcKapaFn}
          className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <h1 className="font-semibold text-gray-800">SQL Asistanı — Ercüment</h1>
        </div>
      </div>
      <div className="text-sm text-gray-500 font-medium tabular-nums">{saatYazisi}</div>
    </header>
  );
}
