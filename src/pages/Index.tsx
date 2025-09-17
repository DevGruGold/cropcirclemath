import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background/95" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 cosmic-text">
            Milk Hill Math
          </h1>
          <h2 className="text-xl md:text-3xl font-light mb-6 text-secondary">
            The Crop Circle Array
          </h2>
          <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore how the famous 2001 Milk Hill crop circle reveals the hidden mathematics of phased arrays, 
            acoustic beamforming, and cosmic engineering principles.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary-glow glow-hover px-6 py-3 text-base"
              onClick={() => document.getElementById('physics')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore the Array
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground glow-secondary px-6 py-3 text-base"
              onClick={() => window.location.href = '/mathematics'}
            >
              Learn the Physics
            </Button>
          </div>
        </div>

        {/* Interactive Geometry Viewer */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <GeometryViewer />
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-16 h-16 rounded-full bg-primary/20 animate-float-glow" />
        <div className="absolute bottom-20 right-20 w-12 h-12 rounded-full bg-secondary/30 animate-float-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-10 w-8 h-8 rounded-full bg-accent/25 animate-float-glow" style={{ animationDelay: '2s' }} />
      </section>

      {/* Photo Gallery Section */}
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