

import dayjs from 'dayjs';

/**
 * แปลงวันที่จาก string เป็น dayjs object
 * @param date วันที่ที่ต้องการแปลง
 * @param format รูปแบบของวันที่ (default "DD-MM-YYYY")
 * @returns dayjs object หรือ undefined ถ้า date เป็น null หรือ undefined
 */
export const parseDate = (date: string | null | undefined, format: string = "DD-MM-YYYY") => {
  return date === null || date === undefined ? undefined : dayjs(date, format);
};
