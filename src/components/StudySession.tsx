
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FlashCard as FlashCardType, Subject } from "../types";
import FlashCard from "./FlashCard";
import { calculateNextReview, difficultyToQuality } from "../utils/spacedRepetition";

interface StudySessionProps {
  subjects: Subject[];
  selectedSubjects: string[];
  onUpdateCard: (updatedCard: FlashCardType) => void;
  onFinish: () => void;
}

const StudySession = ({
  subjects,
  selectedSubjects,
  onUpdateCard,
  onFinish,
}: StudySessionProps) => {
  // Get all cards from selected subjects
  const allCards = subjects
    .filter(subject => selectedSubjects.includes(subject.id))
    .flatMap(subject => subject.cards);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [studiedCards, setStudiedCards] = useState<string[]>([]);

  const currentCard = allCards[currentCardIndex];
  const totalCards = allCards.length;
  const remainingCards = totalCards - studiedCards.length;

  const handleCardResponse = (difficulty: 'forgot' | 'hard' | 'good' | 'easy') => {
    if (currentCard) {
      const quality = difficultyToQuality(difficulty);
      const updatedCard = calculateNextReview(currentCard, quality);
      onUpdateCard(updatedCard);
      
      setStudiedCards([...studiedCards, currentCard.id]);
      
      // Move to next card or finish if done
      if (currentCardIndex < allCards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        onFinish();
      }
    }
  };

  if (!currentCard || totalCards === 0) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8 p-6">
        <CardContent className="text-center">
          <h3 className="text-xl font-bold mb-4">No cards to study</h3>
          <p className="mb-4">Select some subjects to start studying!</p>
          <Button onClick={onFinish}>Back to Subjects</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Study Session</h2>
          <span className="text-sm text-muted-foreground">
            Card {currentCardIndex + 1} of {totalCards}
          </span>
        </div>
        <div className="w-full bg-muted h-2 rounded-full mt-2">
          <div 
            className="bg-primary h-2 rounded-full"
            style={{ width: `${((currentCardIndex + 1) / totalCards) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <FlashCard 
        card={currentCard} 
        onResponse={handleCardResponse}
      />
    </div>
  );
};

export default StudySession;
