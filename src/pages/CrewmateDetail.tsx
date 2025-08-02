import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase, Crewmate } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, ArrowLeft, Calendar, Zap, Palette, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

const CrewmateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [crewmate, setCrewmate] = useState<Crewmate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCrewmate(id);
    }
  }, [id]);

  const fetchCrewmate = async (crewmateId: string) => {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', crewmateId)
        .single();

      if (error) throw error;
      setCrewmate(data);
    } catch (error) {
      console.error('Error fetching crewmate:', error);
      toast({
        title: "Error",
        description: "Failed to load crewmate details. Please try again.",
        variant: "destructive",
      });
      navigate("/gallery");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!crewmate || !confirm(`Are you sure you want to delete ${crewmate.name}?`)) return;

    try {
      const { error } = await supabase
        .from('crewmates')
        .delete()
        .eq('id', crewmate.id);

      if (error) throw error;

      toast({
        title: "Deleted",
        description: `${crewmate.name} has been removed from your crew.`,
      });

      navigate("/gallery");
    } catch (error) {
      console.error('Error deleting crewmate:', error);
      toast({
        title: "Error",
        description: "Failed to delete crewmate. Please try again.",
        variant: "destructive",
      });
    }
  };

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
    if (speed <= 2) return { label: "Slow", color: "bg-red-500" };
    if (speed <= 4) return { label: "Normal", color: "bg-yellow-500" };
    return { label: "Fast", color: "bg-green-500" };
  };

  const getCategoryDescription = (category: string) => {
    const descriptions: Record<string, string> = {
      "Crewmate": "Standard crew member capable of completing tasks and maintaining the ship.",
      "Engineer": "Specialized in technical tasks and can vent through the ship's systems.",
      "Scientist": "Expert in research and analysis, crucial for mission success.",
      "Guardian Angel": "Protective spirit that watches over the crew from beyond.",
      "Impostor": "Dangerous saboteur hidden among the crew. Exercise extreme caution!",
      "Shapeshifter": "Advanced impostor with the ability to change appearance.",
      "Detective": "Investigative specialist skilled at uncovering deception.",
      "Medic": "Medical expert responsible for crew health and emergency treatment."
    };
    return descriptions[category] || "Unique crew member with special abilities.";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen space-gradient">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="text-xl">Loading crewmate details...</div>
        </div>
      </div>
    );
  }

  if (!crewmate) {
    return (
      <div className="min-h-screen space-gradient">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="text-xl">Crewmate not found</div>
          <Button asChild className="mt-4">
            <Link to="/gallery">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gallery
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const speedInfo = getSpeedLabel(crewmate.speed);
  const createdDate = new Date(crewmate.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen space-gradient">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Back Button */}
          <Button variant="outline" asChild>
            <Link to="/gallery">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gallery
            </Link>
          </Button>

          {/* Main Crewmate Card */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden">
            <CardHeader className="text-center space-y-6 pb-8">
              <div className="flex justify-center">
                <div className="relative">
                  <div className={cn(
                    "w-32 h-32 rounded-full flex items-center justify-center shadow-crewmate animate-float",
                    getColorClass(crewmate.color)
                  )}>
                    <div className="w-20 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <div className="w-16 h-8 bg-gray-800 rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-lg font-bold text-accent-foreground animate-glow">
                    {crewmate.speed}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <CardTitle className="text-4xl bg-gradient-aurora bg-clip-text text-transparent">
                  Crewmate: {crewmate.name}
                </CardTitle>
                <Badge 
                  variant="secondary" 
                  className={`text-lg px-4 py-2 ${
                    crewmate.category.includes("Impostor") ? "bg-red-500/20 text-red-400" : 
                    "bg-primary/20 text-primary"
                  }`}
                >
                  {crewmate.category}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{crewmate.speed}</div>
                    <div className="text-sm text-muted-foreground">Speed Level</div>
                    <Badge className={`mt-1 ${speedInfo.color} text-white`}>
                      {speedInfo.label}
                    </Badge>
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
                    <Palette className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold capitalize">{crewmate.color}</div>
                    <div className="text-sm text-muted-foreground">Suit Color</div>
                    <div className={cn("w-8 h-8 rounded-full mx-auto mt-2", getColorClass(crewmate.color))} />
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                    <Tag className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{crewmate.category}</div>
                    <div className="text-sm text-muted-foreground">Role Category</div>
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-muted/20 rounded-full flex items-center justify-center mx-auto">
                    <Calendar className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">Created</div>
                    <div className="text-sm text-muted-foreground">{createdDate}</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <Card className="bg-muted/20 border-muted/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Role Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {getCategoryDescription(crewmate.category)}
                  </p>
                </CardContent>
              </Card>

              {/* Detailed Stats */}
              <Card className="bg-muted/20 border-muted/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Mission Statistics</h3>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-primary">{Math.floor(Math.random() * 50) + 10}</div>
                      <div className="text-sm text-muted-foreground">Tasks Completed</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-secondary">{Math.floor(Math.random() * 20) + 5}</div>
                      <div className="text-sm text-muted-foreground">Missions Survived</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-accent">{Math.floor(crewmate.speed * 18.5)}%</div>
                      <div className="text-sm text-muted-foreground">Efficiency Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center pt-4">
                <Button variant="secondary" size="lg" asChild>
                  <Link to={`/edit/${crewmate.id}`}>
                    <Edit className="w-5 h-5 mr-2" />
                    Edit Crewmate
                  </Link>
                </Button>
                <Button 
                  variant="destructive" 
                  size="lg" 
                  onClick={handleDelete}
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Delete Crewmate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CrewmateDetail;