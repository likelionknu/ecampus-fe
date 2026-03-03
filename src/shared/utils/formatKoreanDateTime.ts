function formatFromDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const minute = String(date.getMinutes()).padStart(2, "0");
  const hour24 = date.getHours();
  const period = hour24 < 12 ? "오전" : "오후";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

  return `${year}년 ${month}월 ${day}일 ${period} ${hour12}시 ${minute}분`;
}

export function formatKoreanDateTime(value: string): string {
  const normalized = value.trim();

  // Handles inputs like: 2026-03-03T01:51:40.664772
  const parts = normalized.match(
    /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/,
  );

  if (parts) {
    const year = Number(parts[1]);
    const month = Number(parts[2]);
    const day = Number(parts[3]);
    const hour24 = Number(parts[4]);
    const minute = parts[5];
    const period = hour24 < 12 ? "오전" : "오후";
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

    return `${year}년 ${month}월 ${day}일 ${period} ${hour12}시 ${minute}분`;
  }

  const fallbackDate = new Date(normalized);
  if (Number.isNaN(fallbackDate.getTime())) {
    return value;
  }

  return formatFromDate(fallbackDate);
}
