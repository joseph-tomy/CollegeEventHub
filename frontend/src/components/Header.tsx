import { Button } from "@/components/ui/button";
import { Calendar, Users, Settings } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CollegeEventHub</h1>
              <p className="text-sm text-muted-foreground">Event Management Platform</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#events" className="text-foreground hover:text-primary transition-colors">
              Events
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button size="sm" className="bg-gradient-primary text-white border-0">
              <Settings className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;