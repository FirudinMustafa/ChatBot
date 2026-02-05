export function saatFormatla(zamanDamgasi: number): string {
  return new Date(zamanDamgasi).toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function tarihGrupla(zamanDamgasi: number): string {
  const simdi = new Date();
  const tarih = new Date(zamanDamgasi);

  const bugun = new Date(simdi.getFullYear(), simdi.getMonth(), simdi.getDate());
  const dun = new Date(bugun.getTime() - 86400000);
  const sadeceTarih = new Date(tarih.getFullYear(), tarih.getMonth(), tarih.getDate());

  if (sadeceTarih.getTime() === bugun.getTime()) return 'Bugün';
  if (sadeceTarih.getTime() === dun.getTime()) return 'Dün';

  const gunFarki = Math.floor((bugun.getTime() - sadeceTarih.getTime()) / 86400000);
  if (gunFarki <= 7) return 'Bu Hafta';
  if (gunFarki <= 30) return 'Bu Ay';

  return 'Daha Eski';
}
