import { DateTime } from 'luxon';

export function formatDate(input: string): string {
  const dt = DateTime.fromISO(input, { locale: 'nl' });
  if (dt.isValid) {
    return dt.toLocaleString(DateTime.DATE_MED);
  }
  return input;
}
