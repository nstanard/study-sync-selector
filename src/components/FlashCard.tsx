
import { useState, useEffect, useRef } from "react";
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
  const [displayCard, setDisplayCard] = useState<FlashCardType>(card);
  const isTransitioning = useRef(false);

  // Update display card when card changes, but only if not flipped
  useEffect(() => {
    if (!isFlipped && !isTransitioning.current) {
      setDisplayCard(card);
    }
  }, [card, isFlipped]);

  // Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false);
    setShowAnswers(false);
  }, [card.id]);

  const flipCard = () => {
    if (isTransitioning.current) return;
    
    isTransitioning.current = true;
    setIsFlipped(!isFlipped);
    
    if (!isFlipped) {
      setShowAnswers(true);
    } else {
      // Wait for flip animation to complete before changing content
      setTimeout(() => {
        setDisplayCard(card);
        isTransitioning.current = false;
      }, 300); // Match this to your CSS transition duration
    }
  };

  const handleResponse = (difficulty: 'forgot' | 'hard' | 'good' | 'easy') => {
    isTransitioning.current = true;
    setIsFlipped(false);
    
    // Wait for flip animation to complete before calling onResponse
    setTimeout(() => {
      onResponse(difficulty);
      isTransitioning.current = false;
    }, 300); // Match this to your CSS transition duration
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className={`flashcard ${isFlipped ? 'flipped' : ''} transition-transform duration-300`}>
        <Card className="flashcard-inner h-64 w-full cursor-pointer" onClick={flipCard}>
          <CardContent className="flashcard-front absolute inset-0 flex flex-col items-center justify-center p-6 h-full">
            <h3 className="text-xl font-bold mb-2">Question</h3>
            <p className="text-center text-2xl">{displayCard.front}</p>
            <div className="mt-auto">
              <p className="text-sm text-muted-foreground">Click to reveal answer</p>
            </div>
          </CardContent>
          <CardContent className="flashcard-back absolute inset-0 flex flex-col items-center justify-center p-6 h-full">
            <h3 className="text-xl font-bold mb-2">Answer</h3>
            <p className="text-center text-2xl">{displayCard.back}</p>
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
              onClick={() => handleResponse('forgot')}
            >
              Forgot
            </Button>
            <Button 
              variant="outline" 
              className="border-amber-500 text-amber-700"
              onClick={() => handleResponse('hard')}
            >
              Hard
            </Button>
            <Button 
              variant="outline" 
              className="border-blue-500 text-blue-700"
              onClick={() => handleResponse('good')}
            >
              Good
            </Button>
            <Button 
              variant="default" 
              className="bg-green-600"
              onClick={() => handleResponse('easy')}
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
