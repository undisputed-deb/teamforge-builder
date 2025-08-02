import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Plus, Sparkles, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen space-gradient">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20" />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold bg-gradient-aurora bg-clip-text text-transparent animate-shimmer">
                Welcome to the Crewmate Creator!
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Here is where you can create your very own set of crewmates before sending them off into space!
              </p>
            </div>
            
            {/* Floating Crewmate Examples */}
            <div className="flex justify-center items-center space-x-8 py-8">
              {[
                { color: "bg-red-500", speed: 5 },
                { color: "bg-blue-500", speed: 3 },
                { color: "bg-green-500", speed: 4 },
                { color: "bg-pink-500", speed: 2 },
                { color: "bg-yellow-500", speed: 6 }
              ].map((crewmate, index) => (
                <div 
                  key={index} 
                  className="relative animate-float"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-crewmate ${crewmate.color}`}>
                    <div className="w-10 h-6 bg-white/90 rounded-full flex items-center justify-center">
                      <div className="w-6 h-4 bg-gray-800 rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                    {crewmate.speed}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 shadow-space">
                <Link to="/create">
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Crewmate
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild className="shadow-space">
                <Link to="/gallery">
                  <Users className="w-5 h-5 mr-2" />
                  View Gallery
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-crewmate transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Create Crewmates</h3>
                <p className="text-muted-foreground">
                  Customize name, speed, color, and category. Choose from different roles like Engineer, Scientist, or Impostor!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-crewmate transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold">Manage Your Crew</h3>
                <p className="text-muted-foreground">
                  View all your crewmates in one place, edit their attributes, and track your crew statistics.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-crewmate transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold">Advanced Features</h3>
                <p className="text-muted-foreground">
                  Category-based restrictions, crew success metrics, and detailed analytics for your space team.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;