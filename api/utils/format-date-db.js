import dayjs from 'dayjs';

export default function formatDateDB(date = null) {
  let dateFormat = dayjs();
  if (date) {
    dateFormat = dayjs(date);
  }
  return dateFormat.format('YYYY-MM-DD HH:mm:ss');
}
