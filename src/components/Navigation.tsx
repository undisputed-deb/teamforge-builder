import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Plus, Home, Sparkles } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card/50 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-nebula flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-aurora bg-clip-text text-transparent">
              Crewmate Creator
            </span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </Button>
            
            <Button
              variant={isActive("/create") ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/create">
                <Plus className="w-4 h-4 mr-2" />
                Create
              </Link>
            </Button>
            
            <Button
              variant={isActive("/gallery") ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/gallery">
                <Users className="w-4 h-4 mr-2" />
                Gallery
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;