
import { Book, Calculator, Flask, Languages } from "lucide-react";
import { Subject } from "../types";
import { Card, CardContent } from "@/components/ui/card";

interface SubjectCardProps {
  subject: Subject;
  isSelected: boolean;
  onClick: () => void;
}

const SubjectCard = ({ subject, isSelected, onClick }: SubjectCardProps) => {
  const getIcon = () => {
    switch (subject.icon) {
      case "languages":
        return <Languages />;
      case "flask":
        return <Flask />;
      case "calculator":
        return <Calculator />;
      case "book":
        return <Book />;
      default:
        return <Book />;
    }
  };

  const baseClass = "transition-all duration-200 cursor-pointer p-4 flex gap-3 items-center rounded-lg";
  const selectedClass = isSelected 
    ? "bg-primary bg-opacity-10 border-primary" 
    : "hover:bg-muted border-transparent";

  return (
    <Card 
      className={`${baseClass} ${selectedClass} ${isSelected ? "ring-2 ring-primary" : ""}`}
      onClick={onClick}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${subject.color}`}>
        {getIcon()}
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{subject.name}</h3>
        <p className="text-sm text-muted-foreground">{subject.cards.length} cards</p>
      </div>
    </Card>
  );
};

export default SubjectCard;
