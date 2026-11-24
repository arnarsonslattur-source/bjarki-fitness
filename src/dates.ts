const MONTHS = ['jan.', 'feb.', 'mars', 'apríl', 'maí', 'júní', 'júlí', 'ág.', 'sept.', 'okt.', 'nóv.', 'des.'];
const DAYS = ['sun', 'mán', 'þri', 'mið', 'fim', 'fös', 'lau'];

const pad = (n: number) => String(n).padStart(2, '0');

/** YYYY-MM-DD í staðartíma */
export function dateKey(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function fromKey(key: string) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** Mánudagur í viku dagsetningar, kl. 00:00 */
export function startOfWeek(d: Date) {
  const s = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const wd = s.getDay() === 0 ? 7 : s.getDay();
  s.setDate(s.getDate() - (wd - 1));
  return s;
}

export function addDays(d: Date, n: number) {
  const s = new Date(d);
  s.setDate(s.getDate() + n);
  return s;
}

/** 1 = mánudagur … 7 = sunnudagur */
export function weekdayOf(d: Date) {
  return d.getDay() === 0 ? 7 : d.getDay();
}

export function isoWeek(d: Date) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return Math.ceil(((t.getTime() - y.getTime()) / 86400000 + 1) / 7);
}

export function formatDate(d: Date) {
  return `${DAYS[d.getDay()]} ${d.getDate()}. ${MONTHS[d.getMonth()]}`;
}

/** Færir tíma "HH:MM" um mínútur */
export function shiftTime(time: string, deltaMin: number) {
  const [h, m] = time.split(':').map(Number);
  const total = (((h * 60 + m + deltaMin) % 1440) + 1440) % 1440;
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}

export function formatNumber(n: number, digits = 1) {
  return n.toFixed(digits).replace('.', ',');
}
