import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { GeometryViewer } from "@/components/GeometryViewer";
import { PhasedArraySimulator } from "@/components/PhasedArraySimulator";
import { PhotoGallery } from "@/components/PhotoGallery";
import { ChatBot } from "@/components/ChatBot";
import { ApiKeyHelp } from "@/components/ApiKeyHelp";
import heroImage from "@/assets/milk-hill-galaxy-spiral.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Mobile-First Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 md:opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background/95" />
        </div>
        
        {/* Mobile-optimized content order */}
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Header content - compact on mobile */}
          <div className="text-center px-4 pt-20 pb-6 md:pt-32 md:pb-12">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-2 md:mb-4 cosmic-text">
              Milk Hill Math
            </h1>
            <h2 className="text-lg md:text-xl lg:text-3xl font-light mb-4 md:mb-6 text-secondary">
              The Crop Circle Array
            </h2>
            <p className="text-sm md:text-lg lg:text-xl mb-6 md:mb-8 text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2">
              Explore how the famous 2001 Milk Hill crop circle reveals the hidden mathematics of phased arrays, 
              acoustic beamforming, and cosmic engineering principles.
            </p>
            
            {/* Touch-optimized buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary-glow glow-hover px-6 py-4 text-base min-h-[48px] touch-manipulation"
                onClick={() => document.getElementById('array-viewer')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Interactive Array
              </Button>
              <Link to="/mathematics">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground glow-secondary px-6 py-4 text-base min-h-[44px] touch-manipulation w-full"
                >
                  Learn the Physics
                </Button>
              </Link>
            </div>
          </div>

          {/* Interactive Geometry Viewer - Prominent on mobile */}
          <div id="array-viewer" className="flex-1 px-2 md:px-6 pb-4 md:pb-8">
            <GeometryViewer />
          </div>
        </div>
        
        {/* Floating elements - hidden on small mobile */}
        <div className="hidden sm:block absolute top-20 left-4 lg:left-20 w-12 lg:w-16 h-12 lg:h-16 rounded-full bg-primary/20 animate-float-glow" />
        <div className="hidden sm:block absolute bottom-20 right-4 lg:right-20 w-8 lg:w-12 h-8 lg:h-12 rounded-full bg-secondary/30 animate-float-glow" style={{ animationDelay: '1s' }} />
        <div className="hidden md:block absolute top-1/2 left-2 lg:left-10 w-6 lg:w-8 h-6 lg:h-8 rounded-full bg-accent/25 animate-float-glow" style={{ animationDelay: '2s' }} />
      </section>

      {/* Phased Array Physics - Moved up for immediate engagement */}
      <section id="physics" className="py-12 md:py-20 px-4 md:px-6 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 cosmic-text">
              Interactive Beam Steering
            </h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
              Touch and drag to control phased array beamforming in real-time
            </p>
          </div>
          
          <PhasedArraySimulator />
        </div>
      </section>

      {/* Photo Gallery Section - After interaction */}
      <PhotoGallery />

      {/* Educational Context Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 cosmic-text">
              The Engineering Blueprint
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding the technical precision behind the world's most complex crop formation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6 glass-morphism">
              <h3 className="text-2xl font-bold mb-4 cosmic-text">Technical Specifications</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Formation Date:</strong> August 13, 2001</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Location:</strong> Milk Hill, Wiltshire, England</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Diameter:</strong> Approximately 1000ft (300m)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Circle Count:</strong> 409 individual elements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Formation Time:</strong> 6 hours of darkness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Weather:</strong> Heavy rainfall during formation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Evidence:</strong> No visible entry tracks or footprints</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 glass-morphism">
              <h3 className="text-2xl font-bold mb-4 cosmic-text">Array Characteristics</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span><strong>Pattern:</strong> 6-fold spiral with connecting arms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span><strong>Geometry:</strong> Logarithmic spiral structure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span><strong>Precision:</strong> Sub-meter accuracy in positioning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span><strong>Scaling:</strong> Variable circle sizes following mathematical progression</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span><strong>Symmetry:</strong> Perfect rotational symmetry</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span><strong>Application:</strong> Matches phased array antenna design principles</span>
                </li>
              </ul>
            </Card>
          </div>

          <Card className="p-6 glass-morphism text-center border-accent/20">
            <h3 className="text-xl font-bold mb-4 cosmic-text">Photography Attribution</h3>
            <p className="text-muted-foreground mb-4">
              All authentic Milk Hill crop circle photographs courtesy of 
              <strong className="text-foreground"> Steve Alexander Photography</strong> and 
              <strong className="text-foreground"> Temporary Temples</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              These images represent some of the highest quality documentation of the 2001 Milk Hill formations, 
              captured using professional aerial photography techniques during the height of the crop circle season.
            </p>
          </Card>
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