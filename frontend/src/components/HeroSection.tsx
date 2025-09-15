import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-campus.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-subtle">
      {/* Removed background image */}
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <Badge className="mb-4 bg-warm-accent-light text-warm-accent-foreground">
            🎓 College Event Management
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Connect, Learn, and 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Grow</span> 
            <br />Together
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Discover and participate in amazing college events. From academic conferences 
            to cultural celebrations, find your next adventure and build lasting connections.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Button size="lg" className="bg-gradient-primary text-white border-0 shadow-glow">
              <Calendar className="h-5 w-5 mr-2" />
              Explore Events
            </Button>
            <Button size="lg" variant="outline">
              <Users className="h-5 w-5 mr-2" />
              Join Community
            </Button>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-8 text-sm">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">50+ Active Events</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">2,000+ Students</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">Year-round Events</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;