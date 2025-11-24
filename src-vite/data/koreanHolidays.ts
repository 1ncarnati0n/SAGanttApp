/**
 * 한국 공휴일 데이터 (2024-2026)
 * 음력 공휴일은 양력 날짜로 변환하여 포함
 */

export interface Holiday {
  date: string; // YYYY-MM-DD 형식
  name: string;
}

export const koreanHolidays2025: Holiday[] = [
  { date: '2025-01-01', name: '신정' },
  { date: '2025-01-28', name: '설날 연휴' },
  { date: '2025-01-29', name: '설날' },
  { date: '2025-01-30', name: '설날 연휴' },
  { date: '2025-03-01', name: '삼일절' },
  { date: '2025-03-03', name: '대체공휴일(삼일절)' },
  { date: '2025-05-05', name: '어린이날' },
  { date: '2025-05-06', name: '부처님오신날' },
  { date: '2025-06-06', name: '현충일' },
  { date: '2025-08-15', name: '광복절' },
  { date: '2025-10-05', name: '추석 연휴' },
  { date: '2025-10-06', name: '추석' },
  { date: '2025-10-07', name: '추석 연휴' },
  { date: '2025-10-08', name: '대체공휴일(추석)' },
  { date: '2025-10-03', name: '개천절' },
  { date: '2025-10-09', name: '한글날' },
  { date: '2025-12-25', name: '크리스마스' },
];

export const koreanHolidays2026: Holiday[] = [
  { date: '2026-01-01', name: '신정' },
  { date: '2026-02-16', name: '설날 연휴' },
  { date: '2026-02-17', name: '설날' },
  { date: '2026-02-18', name: '설날 연휴' },
  { date: '2026-03-01', name: '삼일절' },
  { date: '2026-05-05', name: '어린이날' },
  { date: '2026-05-25', name: '부처님오신날' },
  { date: '2026-06-06', name: '현충일' },
  { date: '2026-08-15', name: '광복절' },
  { date: '2026-09-24', name: '추석 연휴' },
  { date: '2026-09-25', name: '추석' },
  { date: '2026-09-26', name: '추석 연휴' },
  { date: '2026-10-03', name: '개천절' },
  { date: '2026-10-09', name: '한글날' },
  { date: '2026-12-25', name: '크리스마스' },
];

// 모든 공휴일을 날짜 문자열 Set으로 변환 (빠른 조회를 위해)
const allHolidaysSet = new Set<string>([
  ...koreanHolidays2025.map(h => h.date),
  ...koreanHolidays2026.map(h => h.date),
]);

/**
 * 주말인지 확인 (토요일, 일요일)
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 = 일요일, 6 = 토요일
}

/**
 * 한국 공휴일인지 확인
 */
export function isKoreanHoliday(date: Date): boolean {
  const dateStr = date.toISOString().split('T')[0];
  return allHolidaysSet.has(dateStr);
}

/**
 * 주말 또는 공휴일인지 확인
 */
export function isDayOff(date: Date): boolean {
  return isWeekend(date) || isKoreanHoliday(date);
}

/**
 * 특정 날짜의 공휴일 이름 가져오기
 */
export function getHolidayName(date: Date): string | null {
  const dateStr = date.toISOString().split('T')[0];

  const allHolidays = [
    ...koreanHolidays2025,
    ...koreanHolidays2026,
  ];

  const holiday = allHolidays.find(h => h.date === dateStr);
  return holiday ? holiday.name : null;
}
