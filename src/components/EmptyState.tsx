interface BosDurumProps {
  oneriFn: (metin: string) => void;
}

const ornekSorular = [
  'Son 30 günün satış raporunu göster',
  'Aktif müşteri sayısı kaç?',
  'Stok durumu kritik olan ürünler',
  'Aylık gelir-gider karşılaştırması',
];

export default function BosDurum({ oneriFn }: BosDurumProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-lg text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Merhaba! Ben Ercüment
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          SQL asistanınızım. Veritabanınız hakkında sorularınızı doğal dilde sorabilirsiniz.
          Size doğru SQL sorgularını oluşturup sonuçları getireceğim.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ornekSorular.map((metin) => (
            <button
              key={metin}
              onClick={() => oneriFn(metin)}
              className="text-left px-4 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-primary-200 text-sm text-gray-600 hover:text-gray-800 transition-all shadow-sm hover:shadow"
            >
              <span className="text-primary-500 mr-1.5">&#8594;</span>
              {metin}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
