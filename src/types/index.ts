
export interface FlashCard {
  id: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastStudied: Date | null;
  nextStudy: Date | null;
  repetitions: number;
  interval: number;
  efactor: number;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  cards: FlashCard[];
}
