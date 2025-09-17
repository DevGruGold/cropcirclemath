import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4 cosmic-text">404</h1>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The cosmic pathway you seek does not exist in this dimension of the array.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/">
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary-glow glow-hover transition-all"
            >
              Return to Home Array
            </Button>
          </Link>
          
          <p className="text-sm text-muted-foreground">
            Route accessed: <code className="bg-muted px-2 py-1 rounded text-xs font-mono">{location.pathname}</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
