import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { GeometryViewer } from "@/components/GeometryViewer";
import { PhasedArraySimulator } from "@/components/PhasedArraySimulator";
import { ChatBot } from "@/components/ChatBot";
import { ApiKeyHelp } from "@/components/ApiKeyHelp";
import heroImage from "@/assets/milk-hill-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 cosmic-text">
            Milk Hill Math
          </h1>
          <h2 className="text-2xl md:text-4xl font-light mb-8 text-secondary">
            The Crop Circle Array
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Explore how the famous 2001 Milk Hill crop circle reveals the hidden mathematics of phased arrays, 
            acoustic beamforming, and cosmic engineering principles.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary-glow glow-hover px-8 py-4 text-lg"
              onClick={() => document.getElementById('geometry')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore the Array
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground glow-secondary px-8 py-4 text-lg"
              onClick={() => window.location.href = '/mathematics'}
            >
              Learn the Physics
            </Button>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-16 h-16 rounded-full bg-primary/20 animate-float-glow" />
        <div className="absolute bottom-20 right-20 w-12 h-12 rounded-full bg-secondary/30 animate-float-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-10 w-8 h-8 rounded-full bg-accent/25 animate-float-glow" style={{ animationDelay: '2s' }} />
      </section>

      {/* Interactive Geometry Section */}
      <section id="geometry" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 cosmic-text">
              The Sacred Geometry
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the 409 precisely positioned circles that form nature's most sophisticated array antenna
            </p>
          </div>
          
          <GeometryViewer />
        </div>
      </section>

      {/* Phased Array Section */}
      <section id="physics" className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 cosmic-text">
              Phased Array Physics
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience how the crop circle geometry creates directional beams, just like HAARP or modern radar systems
            </p>
          </div>
          
          <PhasedArraySimulator />
        </div>
      </section>

      {/* AI Assistant Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 cosmic-text">
              Ask the Cosmic AI
            </h2>
            <p className="text-xl text-muted-foreground">
              Powered by Google Gemini • Multimodal • Expert in crop circles and physics
            </p>
          </div>
          
          <ApiKeyHelp />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            Exploring the intersection of mystery and mathematics
          </p>
        </div>
      </footer>

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Index;