import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CrewmateCreate, CrewmateUpdate } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface CrewmateFormProps {
  initialData?: Partial<CrewmateCreate>;
  onSubmit: (data: CrewmateCreate) => void;
  onCancel: () => void;
  isLoading?: boolean;
  isEditing?: boolean;
}

const CrewmateForm = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isLoading = false,
  isEditing = false 
}: CrewmateFormProps) => {
  const [formData, setFormData] = useState<CrewmateCreate>({
    name: initialData?.name || "",
    speed: initialData?.speed || 3,
    color: initialData?.color || "blue",
    category: initialData?.category || "Crewmate"
  });

  const colors = [
    "red", "blue", "green", "pink", "orange", "yellow", 
    "black", "white", "purple", "brown", "cyan", "lime"
  ];

  const categories = [
    "Crewmate", "Engineer", "Scientist", "Guardian Angel", 
    "Impostor", "Shapeshifter", "Detective", "Medic"
  ];

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
      brown: "bg-amber-700",
      purple: "bg-purple-500",
      cyan: "bg-cyan-500",
      lime: "bg-lime-500"
    };
    return colorMap[color] || "bg-primary";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
    }
  };

  const getCategoryAttributes = (category: string) => {
    const attributeMap: Record<string, { speedRange: [number, number], availableColors: string[] }> = {
      "Crewmate": { speedRange: [2, 5], availableColors: colors },
      "Engineer": { speedRange: [3, 6], availableColors: ["blue", "cyan", "green", "white"] },
      "Scientist": { speedRange: [2, 4], availableColors: ["white", "blue", "green", "purple"] },
      "Guardian Angel": { speedRange: [4, 6], availableColors: ["white", "yellow", "cyan", "pink"] },
      "Impostor": { speedRange: [3, 6], availableColors: ["red", "black", "purple", "brown"] },
      "Shapeshifter": { speedRange: [4, 6], availableColors: ["black", "purple", "red", "brown"] },
      "Detective": { speedRange: [3, 5], availableColors: ["blue", "green", "brown", "black"] },
      "Medic": { speedRange: [2, 4], availableColors: ["white", "pink", "green", "cyan"] }
    };
    return attributeMap[category] || attributeMap["Crewmate"];
  };

  const currentAttributes = getCategoryAttributes(formData.category);
  const availableColors = currentAttributes.availableColors;
  const [minSpeed, maxSpeed] = currentAttributes.speedRange;

  // Auto-adjust values when category changes
  const handleCategoryChange = (newCategory: string) => {
    const newAttributes = getCategoryAttributes(newCategory);
    const newFormData = { ...formData, category: newCategory };
    
    // Adjust speed if current speed is outside new range
    if (formData.speed < newAttributes.speedRange[0]) {
      newFormData.speed = newAttributes.speedRange[0];
    } else if (formData.speed > newAttributes.speedRange[1]) {
      newFormData.speed = newAttributes.speedRange[1];
    }
    
    // Adjust color if current color is not available
    if (!newAttributes.availableColors.includes(formData.color)) {
      newFormData.color = newAttributes.availableColors[0];
    }
    
    setFormData(newFormData);
  };

  return (
    <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-center text-2xl bg-gradient-aurora bg-clip-text text-transparent">
          {isEditing ? "Update Your Crewmate" : "Create a New Crewmate"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Crewmate Preview */}
          <div className="flex justify-center">
            <div className="relative">
              <div className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center shadow-lg animate-float",
                getColorClass(formData.color)
              )}>
                <div className="w-16 h-10 bg-white/90 rounded-full flex items-center justify-center">
                  <div className="w-10 h-6 bg-gray-800 rounded-full"></div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm font-bold text-accent-foreground animate-glow">
                {formData.speed}
              </div>
            </div>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Crewmate Name</Label>
            <Input
              id="name"
              placeholder="Enter crewmate name..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-input/50 border-border/50"
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">Category</Label>
            <Select value={formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="bg-input/50 border-border/50">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Speed Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Speed: {formData.speed} ({formData.speed <= 2 ? "Slow" : formData.speed <= 4 ? "Normal" : "Fast"})
            </Label>
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: maxSpeed - minSpeed + 1 }, (_, i) => minSpeed + i).map((speed) => (
                <Button
                  key={speed}
                  type="button"
                  variant={formData.speed === speed ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData({ ...formData, speed })}
                  className="w-12 h-12"
                >
                  {speed}
                </Button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Color: {formData.color}</Label>
            <div className="grid grid-cols-6 gap-3">
              {availableColors.map((color) => (
                <Button
                  key={color}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData({ ...formData, color })}
                  className={cn(
                    "w-12 h-12 p-0 border-2",
                    formData.color === color 
                      ? "border-primary scale-110 shadow-crewmate" 
                      : "border-border/50 hover:border-primary/50"
                  )}
                >
                  <div className={cn("w-8 h-8 rounded-full", getColorClass(color))} />
                </Button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={isLoading || !formData.name.trim()}
            >
              {isLoading ? "Saving..." : isEditing ? "Update Crewmate" : "Create Crewmate"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CrewmateForm;