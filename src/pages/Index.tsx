
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import SubjectCard from "@/components/SubjectCard";
import StudySession from "@/components/StudySession";
import { subjects as initialSubjects } from "../data/mockData";
import { Subject, FlashCard } from "../types";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isStudying, setIsStudying] = useState(false);
  const [showAllSubjects, setShowAllSubjects] = useState(true);

  const toggleSubjectSelection = (subjectId: string) => {
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
    } else {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };

  const handleStartStudy = () => {
    if (selectedSubjects.length === 0) {
      toast({
        title: "No subjects selected",
        description: "Please select at least one subject to study.",
        variant: "destructive",
      });
      return;
    }
    setIsStudying(true);
  };

  const handleFinishStudy = () => {
    setIsStudying(false);
  };

  const handleUpdateCard = (updatedCard: FlashCard) => {
    const updatedSubjects = subjects.map(subject => {
      const updatedCards = subject.cards.map(card => 
        card.id === updatedCard.id ? updatedCard : card
      );
      return {
        ...subject,
        cards: updatedCards,
      };
    });
    setSubjects(updatedSubjects);
  };

  if (isStudying) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <NavBar />
        <main className="flex-1 container mx-auto p-4 md:p-6">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={handleFinishStudy}
          >
            ← Back to subjects
          </Button>
          <StudySession 
            subjects={subjects}
            selectedSubjects={selectedSubjects}
            onUpdateCard={handleUpdateCard}
            onFinish={handleFinishStudy}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Study Materials</h1>
            <p className="text-muted-foreground">Select subjects to study</p>
          </div>
          <Button 
            disabled={selectedSubjects.length === 0}
            onClick={handleStartStudy}
            className="bg-primary hover:bg-primary/90"
          >
            Start Studying {selectedSubjects.length > 0 ? `(${selectedSubjects.length})` : ''}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subjects.map(subject => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              isSelected={selectedSubjects.includes(subject.id)}
              onClick={() => toggleSubjectSelection(subject.id)}
            />
          ))}
        </div>

        {selectedSubjects.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Selected Subjects</h2>
            <div className="flex flex-wrap gap-2">
              {selectedSubjects.map(subjectId => {
                const subject = subjects.find(s => s.id === subjectId)!;
                return (
                  <div 
                    key={subject.id}
                    className={`px-3 py-1 rounded-full text-sm ${subject.color}`}
                  >
                    {subject.name}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
