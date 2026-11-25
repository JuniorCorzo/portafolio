import readingTimesData from "../data/reading-times.json";

interface ReadingTimeEntry {
  minutes: number;
  words: number;
  hash: string;
}

const readingTimes: Record<string, ReadingTimeEntry> = readingTimesData;

export function getReadingTime(
  slug: string,
  frontmatterMinutes?: number,
): number {
  return frontmatterMinutes ?? readingTimes[slug]?.minutes ?? 5;
}
