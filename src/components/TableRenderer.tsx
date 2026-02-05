import { TabloVerisi } from '../types';

interface TabloGostericiProps {
  veri: TabloVerisi;
}

export default function TabloGosterici({ veri }: TabloGostericiProps) {
  if (!veri.sutunAdlari || !veri.satirlar || veri.satirlar.length === 0) {
    return <p className="text-sm text-gray-400 italic">Sonuç verisi bulunamadı</p>;
  }

  return (
    <div className="mt-3 rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200">
        <span className="text-xs font-medium text-gray-500">
          Sorgu Sonuçları ({veri.satirlar.length} kayıt)
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              {veri.sutunAdlari.map((sutun, indeks) => (
                <th
                  key={indeks}
                  className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap border-b border-gray-200"
                >
                  {sutun}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {veri.satirlar.map((satir, satirIndeks) => (
              <tr
                key={satirIndeks}
                className="hover:bg-gray-50/50 transition-colors"
              >
                {satir.map((hucre, hucreIndeks) => (
                  <td
                    key={hucreIndeks}
                    className="px-3 py-2 text-gray-700 whitespace-nowrap"
                  >
                    {hucre !== null && hucre !== undefined ? String(hucre) : '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
