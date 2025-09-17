import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About", path: "/about" },
    { id: "physics", label: "Physics", path: "/physics" },
    { id: "geometry", label: "Geometry", path: "/geometry" },
    { id: "mathematics", label: "Mathematics", path: "/mathematics" },
  ];

  const handleScrollTo = (elementId: string) => {
    // If we're not on the home page, navigate to home first, then scroll
    if (location.pathname !== "/") {
      navigate("/");
      // Use setTimeout to allow the navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return;
    }
    
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isActive = (path: string) => {
    if (path.startsWith("/#")) {
      return location.pathname === "/" && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-card-border/30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-aurora animate-stellar-rotate" />
            <span className="text-xl font-bold cosmic-text">Milk Hill Math</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`
                  px-3 py-2 rounded-lg transition-all duration-300 font-medium text-sm
                  ${isActive(item.path)
                    ? 'text-primary bg-primary/10 glow-hover' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Button 
            variant="outline"
            size="sm"
            onClick={() => navigate('/physics')}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-hover touch-manipulation"
          >
            Explore Physics
          </Button>
        </div>
      </div>
    </nav>
  );
};

export { Navigation };