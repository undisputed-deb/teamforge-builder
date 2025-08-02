import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase, Crewmate } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import CrewmateCard from "@/components/CrewmateCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, TrendingUp, Award } from "lucide-react";

const Gallery = () => {
  const [crewmates, setCrewmates] = useState<Crewmate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCrewmates();
  }, []);

  const fetchCrewmates = async () => {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCrewmates(data || []);
    } catch (error) {
      console.error('Error fetching crewmates:', error);
      toast({
        title: "Error",
        description: "Failed to load crewmates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this crewmate?")) return;

    try {
      const { error } = await supabase
        .from('crewmates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCrewmates(crewmates.filter(c => c.id !== id));
      toast({
        title: "Deleted",
        description: "Crewmate has been removed from your crew.",
      });
    } catch (error) {
      console.error('Error deleting crewmate:', error);
      toast({
        title: "Error",
        description: "Failed to delete crewmate. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Statistics calculations
  const totalCrewmates = crewmates.length;
  const avgSpeed = totalCrewmates > 0 
    ? (crewmates.reduce((sum, c) => sum + c.speed, 0) / totalCrewmates).toFixed(1)
    : 0;
  
  const colorDistribution = crewmates.reduce((acc, c) => {
    acc[c.color] = (acc[c.color] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mostPopularColor = Object.entries(colorDistribution)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || "None";

  const categoryDistribution = crewmates.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Success metric calculation
  const impostorCount = crewmates.filter(c => c.category.includes("Impostor")).length;
  const engineerCount = crewmates.filter(c => c.category === "Engineer").length;
  const avgSpeedNum = parseFloat(avgSpeed.toString());
  
  const successScore = Math.min(100, 
    (avgSpeedNum * 15) + 
    (engineerCount * 10) + 
    (totalCrewmates * 5) - 
    (impostorCount * 20)
  );

  const getSuccessLevel = (score: number) => {
    if (score >= 80) return { level: "Legendary Crew", color: "text-yellow-400", bgColor: "bg-yellow-400/20" };
    if (score >= 60) return { level: "Elite Crew", color: "text-blue-400", bgColor: "bg-blue-400/20" };
    if (score >= 40) return { level: "Capable Crew", color: "text-green-400", bgColor: "bg-green-400/20" };
    return { level: "Rookie Crew", color: "text-gray-400", bgColor: "bg-gray-400/20" };
  };

  const successLevel = getSuccessLevel(successScore);

  if (isLoading) {
    return (
      <div className="min-h-screen space-gradient">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="text-xl">Loading your crew...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-gradient">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-aurora bg-clip-text text-transparent">
              Your Crewmate Gallery!
            </h1>
            {totalCrewmates === 0 ? (
              <p className="text-xl text-muted-foreground">You haven't made a crewmate yet!</p>
            ) : (
              <p className="text-xl text-muted-foreground">
                Managing {totalCrewmates} crewmate{totalCrewmates !== 1 ? 's' : ''} ready for space missions
              </p>
            )}
          </div>

          {/* Statistics Section */}
          {totalCrewmates > 0 && (
            <div className="grid md:grid-cols-4 gap-6">
              <Card className={`bg-card/80 backdrop-blur-sm border-border/50 ${successLevel.bgColor}`}>
                <CardContent className="p-6 text-center">
                  <Award className={`w-8 h-8 mx-auto mb-2 ${successLevel.color}`} />
                  <div className="text-2xl font-bold">{successScore}%</div>
                  <div className={`text-sm font-medium ${successLevel.color}`}>{successLevel.level}</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{totalCrewmates}</div>
                  <div className="text-sm text-muted-foreground">Total Crewmates</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold">{avgSpeed}</div>
                  <div className="text-sm text-muted-foreground">Average Speed</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 bg-secondary rounded-full"></div>
                  <div className="text-2xl font-bold capitalize">{mostPopularColor}</div>
                  <div className="text-sm text-muted-foreground">Popular Color</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Category Distribution */}
          {totalCrewmates > 0 && (
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-center">Crew Composition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {Object.entries(categoryDistribution).map(([category, count]) => (
                    <div key={category} className="space-y-2">
                      <div className="text-2xl font-bold text-primary">{count}</div>
                      <div className="text-sm text-muted-foreground">{category}</div>
                      <div className="text-xs text-muted-foreground">
                        {((count / totalCrewmates) * 100).toFixed(0)}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Create Button */}
          <div className="text-center">
            <Button size="lg" asChild className="shadow-space">
              <Link to="/create">
                <Plus className="w-5 h-5 mr-2" />
                Create New Crewmate
              </Link>
            </Button>
          </div>

          {/* Crewmates Grid */}
          {totalCrewmates === 0 ? (
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No crewmates yet!</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first crewmate to start building your space crew.
                </p>
                <Button asChild>
                  <Link to="/create">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Crewmate
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {crewmates.map((crewmate) => (
                <CrewmateCard
                  key={crewmate.id}
                  crewmate={crewmate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;