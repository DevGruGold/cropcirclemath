import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Send, Image, Bot, User, Key, X, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [showApiInput, setShowApiInput] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini AI
  const initializeAI = () => {
    if (!apiKey) {
      toast.error("Please enter your Gemini API key first");
      return null;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    } catch (error) {
      toast.error("Invalid API key. Please check your Gemini API key.");
      return null;
    }
  };

  // Save API key to localStorage and hide input
  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey);
      setShowApiInput(false);
      toast.success("API key saved! You can now chat with the AI.");
    }
  };

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setShowApiInput(false);
    }
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle image selection
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Convert base64 to proper format for Gemini
  const base64ToGenerativePart = (base64Data: string, mimeType: string) => {
    return {
      inlineData: {
        data: base64Data.split(',')[1], // Remove data:image/jpeg;base64, prefix
        mimeType,
      },
    };
  };

  // Send message to Gemini
  const sendMessage = async () => {
    if (!inputText.trim() && !selectedImage) return;

    const model = initializeAI();
    if (!model) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText || "Analyze this image",
      image: selectedImage || undefined,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setSelectedImage(null);
    setIsLoading(true);

    try {
      let result;
      
      if (selectedImage) {
        // Multimodal request with image
        const imagePart = base64ToGenerativePart(selectedImage, "image/jpeg");
        const prompt = inputText || "Analyze this image in the context of crop circles, mathematics, physics, or array patterns. What do you see?";
        result = await model.generateContent([prompt, imagePart]);
      } else {
        // Text-only request with crop circle context
        const contextPrompt = `You are an AI assistant for "Milk Hill Math: The Crop Circle Array" - a site exploring the intersection of crop circles, phased array physics, acoustics, and plasma science. 

        The user is asking: ${inputText}
        
        Please provide helpful information about crop circles, mathematics, physics, array theory, or related scientific concepts. Be engaging and educational while maintaining the cosmic/mysterious theme of the site.`;
        
        result = await model.generateContent(contextPrompt);
      }

      const response = await result.response;
      const text = response.text();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to get response. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Clear API key
  const clearApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey("");
    setShowApiInput(true);
    setMessages([]);
  };

  return (
    <>
      {/* Chat Bot Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-aurora shadow-glow-primary hover:shadow-glow-accent z-50"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>

      {/* Chat Bot Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl h-[600px] glass-morphism flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-card-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-aurora animate-stellar-rotate" />
                <div>
                  <h3 className="font-bold text-lg cosmic-text">Cosmic AI Assistant</h3>
                  <p className="text-sm text-muted-foreground">Powered by Gemini • Multimodal</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!showApiInput && (
                  <Button variant="ghost" size="sm" onClick={clearApiKey}>
                    <Key className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* API Key Input */}
            {showApiInput && (
              <div className="p-4 bg-accent/5 border-b border-card-border">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Enter your Gemini API Key</h4>
                    <p className="text-xs text-muted-foreground">
                      Get your free API key from Google AI Studio. Your key is stored locally in your browser.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="Enter Gemini API key..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleApiKeySubmit()}
                      className="flex-1"
                    />
                    <Button onClick={handleApiKeySubmit} disabled={!apiKey.trim()}>
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              {messages.length === 0 && !showApiInput && (
                <div className="text-center text-muted-foreground py-8">
                  <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">
                    Ask me about crop circles, phased arrays, physics, or upload images for analysis!
                  </p>
                </div>
              )}

              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-aurora">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground ml-auto'
                            : 'bg-card border border-card-border'
                        }`}
                      >
                        {message.image && (
                          <img
                            src={message.image}
                            alt="Uploaded image"
                            className="max-w-full h-auto rounded mb-2 max-h-48 object-cover"
                          />
                        )}
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>

                    {message.role === 'user' && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-secondary">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-aurora">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-card border border-card-border p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">Thinking...</p>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Input Area */}
            {!showApiInput && (
              <div className="p-4 border-t border-card-border">
                {/* Image Preview */}
                {selectedImage && (
                  <div className="mb-3 relative inline-block">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="max-h-20 rounded border border-card-border"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={() => setSelectedImage(null)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    className="shrink-0"
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                  
                  <Input
                    placeholder="Ask about crop circles, physics, or upload an image..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  
                  <Button
                    onClick={sendMessage}
                    disabled={(!inputText.trim() && !selectedImage) || isLoading}
                    className="shrink-0 glow-hover"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export { ChatBot };