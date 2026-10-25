import offlineData from "../data/github-contributions.json" with { type: "json" };

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export type ContributionWeek = ContributionDay[];

export interface GithubActivityData {
  weeks: ContributionWeek[];
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  todayCount: number;
}

interface RawContributionsResponse {
  total?: Record<string, number>;
  contributions: ContributionDay[];
}

export function parseContributionDays(rawContributions: ContributionDay[]): GithubActivityData {
  const sorted = rawContributions.slice().sort((a, b) => a.date.localeCompare(b.date));
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  // Target the end of current week (Saturday)
  const dayOfWeek = today.getUTCDay();
  const daysUntilSaturday = 6 - dayOfWeek;
  const satDate = new Date(today.getTime() + daysUntilSaturday * 86400000);
  const satStr = satDate.toISOString().slice(0, 10);

  let endIdx = sorted.findIndex((d) => d.date === satStr);
  if (endIdx === -1) {
    endIdx = sorted.length - 1;
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (sorted[i].date <= satStr) {
        endIdx = i;
        break;
      }
    }
  }

  const startIdx = Math.max(0, endIdx - 364 + 1);
  const slice = sorted.slice(startIdx, endIdx + 1);

  // Group into 7-day weeks
  const weeks: ContributionWeek[] = [];
  for (let i = 0; i < slice.length; i += 7) {
    weeks.push(slice.slice(i, i + 7));
  }

  const finalWeeks = weeks.slice(-52);

  // Pad or trim if data was shorter than 52 weeks
  while (finalWeeks.length < 52) {
    finalWeeks.unshift([]);
  }

  const totalContributions = finalWeeks.flat().reduce((acc, d) => acc + d.count, 0);

  // Compute streaks on history up to today
  const history = sorted.filter((d) => d.date <= todayStr);
  let longestStreak = 0;
  let tempStreak = 0;

  for (const d of history) {
    if (d.count > 0) {
      tempStreak++;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  }

  let currentStreak = 0;
  if (history.length > 0) {
    let idx = history.length - 1;
    // If today has 0 contributions, count streak up to yesterday if yesterday had contributions
    if (history[idx].count === 0 && (history[idx - 1]?.count ?? 0) > 0) {
      idx--;
    }
    while (idx >= 0 && history[idx].count > 0) {
      currentStreak++;
      idx--;
    }
  }

  const todayItem = history.find((d) => d.date === todayStr);
  const todayCount = todayItem ? todayItem.count : 0;

  return {
    weeks: finalWeeks,
    totalContributions,
    currentStreak,
    longestStreak,
    todayCount,
  };
}

export async function getGithubActivity(username = "JuniorCorzo"): Promise<GithubActivityData> {
  const fallbackContributions = (offlineData as RawContributionsResponse).contributions ?? [];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}`,
      {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      }
    );
    clearTimeout(timeoutId);

    if (!response.ok) {
      return parseContributionDays(fallbackContributions);
    }

    const data = (await response.json()) as RawContributionsResponse;
    if (data && Array.isArray(data.contributions) && data.contributions.length > 0) {
      return parseContributionDays(data.contributions);
    }

    return parseContributionDays(fallbackContributions);
  } catch {
    return parseContributionDays(fallbackContributions);
  }
}
