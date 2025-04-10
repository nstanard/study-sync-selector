
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlashCard as FlashCardType } from "../types";

interface FlashCardProps {
  card: FlashCardType;
  onResponse: (difficulty: 'forgot' | 'hard' | 'good' | 'easy') => void;
}

const FlashCard = ({ card, onResponse }: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setShowAnswers(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
        <Card className="flashcard-inner h-64 w-full cursor-pointer" onClick={flipCard}>
          <CardContent className="flashcard-front absolute inset-0 flex flex-col items-center justify-center p-6 h-full">
            <h3 className="text-xl font-bold mb-2">Question</h3>
            <p className="text-center text-2xl">{card.front}</p>
            <div className="mt-auto">
              <p className="text-sm text-muted-foreground">Click to reveal answer</p>
            </div>
          </CardContent>
          <CardContent className="flashcard-back absolute inset-0 flex flex-col items-center justify-center p-6 h-full">
            <h3 className="text-xl font-bold mb-2">Answer</h3>
            <p className="text-center text-2xl">{card.back}</p>
            <div className="mt-auto">
              <p className="text-sm text-muted-foreground">How well did you know this?</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {showAnswers && (
        <div className="mt-6 flex flex-col gap-2">
          <p className="text-center text-sm">How well did you remember?</p>
          <div className="grid grid-cols-4 gap-3">
            <Button 
              variant="destructive" 
              onClick={() => onResponse('forgot')}
            >
              Forgot
            </Button>
            <Button 
              variant="outline" 
              className="border-amber-500 text-amber-700"
              onClick={() => onResponse('hard')}
            >
              Hard
            </Button>
            <Button 
              variant="outline" 
              className="border-blue-500 text-blue-700"
              onClick={() => onResponse('good')}
            >
              Good
            </Button>
            <Button 
              variant="default" 
              className="bg-green-600"
              onClick={() => onResponse('easy')}
            >
              Easy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashCard;
