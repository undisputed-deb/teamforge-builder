import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Crewmate } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface CrewmateCardProps {
  crewmate: Crewmate;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

const CrewmateCard = ({ crewmate, onDelete, showActions = true }: CrewmateCardProps) => {
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      red: "bg-red-500",
      blue: "bg-blue-500", 
      green: "bg-green-500",
      pink: "bg-pink-500",
      orange: "bg-orange-500",
      yellow: "bg-yellow-500",
      black: "bg-gray-900",
      white: "bg-gray-100",
      purple: "bg-purple-500",
      brown: "bg-amber-700",
      cyan: "bg-cyan-500",
      lime: "bg-lime-500"
    };
    return colorMap[color] || "bg-primary";
  };

  const getSpeedLabel = (speed: number) => {
    if (speed <= 2) return "Slow";
    if (speed <= 4) return "Normal";
    return "Fast";
  };

  return (
    <Card className="group hover:shadow-crewmate transition-all duration-300 hover:scale-105 bg-card/80 backdrop-blur-sm border-border/50">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Crewmate Visual */}
          <div className="relative">
            <div className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center shadow-lg",
              getColorClass(crewmate.color)
            )}>
              <div className="w-12 h-8 bg-white/90 rounded-full flex items-center justify-center">
                <div className="w-8 h-6 bg-gray-800 rounded-full"></div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
              {crewmate.speed}
            </div>
          </div>

          {/* Crewmate Info */}
          <div className="text-center space-y-2">
            <h3 className="font-bold text-lg text-foreground">{crewmate.name}</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Speed: {getSpeedLabel(crewmate.speed)}</p>
              <p>Color: {crewmate.color}</p>
              <p>Category: {crewmate.category}</p>
            </div>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex gap-2 w-full">
              <Button variant="outline" size="sm" asChild className="flex-1">
                <Link to={`/crewmate/${crewmate.id}`}>
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Link>
              </Button>
              <Button variant="secondary" size="sm" asChild className="flex-1">
                <Link to={`/edit/${crewmate.id}`}>
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Link>
              </Button>
              {onDelete && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(crewmate.id)}
                  className="px-3"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CrewmateCard;