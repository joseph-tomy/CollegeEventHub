import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Calendar } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <Calendar className="h-24 w-24 mx-auto text-primary mb-4" />
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Event Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button asChild className="bg-gradient-primary text-white border-0 w-full">
            <a href="/">
              <Home className="h-4 w-4 mr-2" />
              Return to Events
            </a>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <a href="#contact">Contact Support</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
