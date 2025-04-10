
import { FlashCard } from "../types";

// Implementation of the SuperMemo-2 algorithm for spaced repetition
export const calculateNextReview = (
  card: FlashCard, 
  quality: 0 | 1 | 2 | 3 | 4 | 5
): FlashCard => {
  // Quality: 0=worst, 5=best
  let { repetitions, interval, efactor } = card;

  // Update EFactor (easiness factor)
  efactor = Math.max(
    1.3,
    efactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  // Update repetition count and interval
  if (quality < 3) {
    // If response was incorrect, reset repetitions
    repetitions = 0;
    interval = 1;
  } else {
    // Correct response, increase interval
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * efactor);
    }
  }

  // Calculate next review date
  const nextStudy = new Date();
  nextStudy.setDate(nextStudy.getDate() + interval);

  return {
    ...card,
    lastStudied: new Date(),
    nextStudy,
    repetitions,
    interval,
    efactor,
  };
};

// Convert quality feedback to algorithm input
export const difficultyToQuality = (difficulty: string): 0 | 1 | 2 | 3 | 4 | 5 => {
  switch (difficulty) {
    case "forgot": return 0;
    case "hard": return 2;
    case "good": return 3;
    case "easy": return 5;
    default: return 3;
  }
};

// Prioritize cards due for review based on spaced repetition
export const prioritizeCards = (cards: FlashCard[]): FlashCard[] => {
  return [...cards].sort((a, b) => {
    // First priority: cards that have never been studied
    if (!a.lastStudied && !b.lastStudied) return 0;
    if (!a.lastStudied) return -1;
    if (!b.lastStudied) return 1;

    // Second priority: cards that are due (or overdue)
    const now = new Date();
    const aIsDue = a.nextStudy && a.nextStudy <= now;
    const bIsDue = b.nextStudy && b.nextStudy <= now;

    if (aIsDue && !bIsDue) return -1;
    if (!aIsDue && bIsDue) return 1;

    // Third priority: cards with earliest next study date
    if (a.nextStudy && b.nextStudy) {
      return a.nextStudy.getTime() - b.nextStudy.getTime();
    }

    return 0;
  });
};
