import {
  MS_IN_DAY,
  MONTH_MARCH,
  MONTH_JUNE,
  MONTH_AUGUST,
  MONTH_SEPTEMBER,
  MONTH_NOVEMBER,
  MONTH_DECEMBER,
  SEASON_START_DAY,
  POINTS_DAY_ONE,
  POINTS_DAY_TWO,
  POINTS_PREVIOUS_DAY_WEIGHT,
  THOUSAND,
  MILLION,
  MONTH_MAY,
} from "@/lib/constants";
import type { Season } from "@/lib/types";

function getSeason(date: Date): Season {
  const oneBasedMonth = date.getMonth() + 1;
  const isSpring = oneBasedMonth >= MONTH_MARCH && oneBasedMonth <= MONTH_MAY;
  const isSummer = oneBasedMonth >= MONTH_JUNE && oneBasedMonth <= MONTH_AUGUST;
  const isAutumn =
    oneBasedMonth >= MONTH_SEPTEMBER && oneBasedMonth <= MONTH_NOVEMBER;
  if (isSpring) return "spring";
  if (isSummer) return "summer";
  if (isAutumn) return "autumn";
  return "winter";
}

function seasonStart(date: Date): Date {
  const calendarYear = date.getFullYear();
  const season = getSeason(date);
  let seasonStartMonthOneBased = MONTH_MARCH;
  let seasonStartYear = calendarYear;
  if (season === "summer") seasonStartMonthOneBased = MONTH_JUNE;
  else if (season === "autumn") seasonStartMonthOneBased = MONTH_SEPTEMBER;
  else if (season === "winter") {
    seasonStartMonthOneBased = MONTH_DECEMBER;
    const oneBasedMonth = date.getMonth() + 1;
    if (oneBasedMonth !== MONTH_DECEMBER) {
      // For January/February, winter season started on Dec 1 of previous year
      seasonStartYear = calendarYear - 1;
    }
  }
  return new Date(
    Date.UTC(seasonStartYear, seasonStartMonthOneBased - 1, SEASON_START_DAY)
  );
}

export function dayOfSeason(date: Date): number {
  const seasonStartDateUtc = seasonStart(date);
  const midnightUtcOfDate = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const midnightUtcOfSeasonStart = +seasonStartDateUtc;
  const daysSinceSeasonStart =
    Math.floor((midnightUtcOfDate - midnightUtcOfSeasonStart) / MS_IN_DAY) +
    SEASON_START_DAY;
  return Math.max(SEASON_START_DAY, daysSinceSeasonStart);
}

export function calculateDailyPoints(date: Date): number {
  const dayNumberWithinSeason = dayOfSeason(date);
  if (dayNumberWithinSeason === SEASON_START_DAY) return POINTS_DAY_ONE;
  if (dayNumberWithinSeason === SEASON_START_DAY + 1) return POINTS_DAY_TWO;

  // P(n) = P(n-2) + 0.6 * P(n-1)
  let pointsTwoDaysAgo = POINTS_DAY_ONE;
  let pointsYesterday = POINTS_DAY_TWO;
  let pointsToday = pointsYesterday;
  for (
    let currentDay = SEASON_START_DAY + 2;
    currentDay <= dayNumberWithinSeason;
    currentDay++
  ) {
    pointsToday =
      pointsTwoDaysAgo + POINTS_PREVIOUS_DAY_WEIGHT * pointsYesterday;
    pointsTwoDaysAgo = pointsYesterday;
    pointsYesterday = pointsToday;
  }
  return Math.round(pointsToday);
}

export function formatPointsShort(points: number): string {
  if (points >= MILLION) {
    return `${(points / MILLION).toFixed(1)}M`;
  }
  if (points > THOUSAND) {
    return `${Math.round(points / THOUSAND)}K`;
  }
  return String(points);
}
