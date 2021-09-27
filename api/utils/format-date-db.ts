import dayjs, { Dayjs } from 'dayjs';

export default function formatDateDB(date: string | Dayjs = null): string {
  let dateFormat = dayjs();
  if (date) {
    dateFormat = dayjs(date);
  }
  return dateFormat.format('YYYY-MM-DD HH:mm:ss');
}
