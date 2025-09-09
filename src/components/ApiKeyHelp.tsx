import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Key, Sparkles } from "lucide-react";

const ApiKeyHelp = () => {
  return (
    <Card className="p-6 glass-morphism border-accent/30">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-aurora flex items-center justify-center shrink-0">
          <Sparkles className="h-6 w-6" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2 cosmic-text">Get Your Free Gemini API Key</h3>
          <p className="text-muted-foreground mb-4">
            The AI chatbot uses Google's Gemini AI for multimodal conversations. Get your free API key to unlock:
          </p>
          
          <ul className="space-y-2 text-sm text-muted-foreground mb-4">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Text conversations about crop circles, physics, and mathematics
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
              Image analysis for crop circle patterns and geometric structures
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              Deep discussions about phased array theory and plasma physics
            </li>
          </ul>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => window.open('https://aistudio.google.com/app/apikey', '_blank')}
              className="glow-hover"
            >
              <Key className="h-4 w-4 mr-2" />
              Get API Key
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
            
            <Button
              variant="outline"
              onClick={() => window.open('https://ai.google.dev/gemini-api/docs', '_blank')}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              View Documentation
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-3">
            Your API key is stored locally in your browser and never shared. Free tier includes generous usage limits.
          </p>
        </div>
      </div>
    </Card>
  );
};

export { ApiKeyHelp };