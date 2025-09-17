import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { GeometryViewer } from "@/components/GeometryViewer";
import { PhasedArraySimulator } from "@/components/PhasedArraySimulator";
import galaxySpiralImage from "@/assets/milk-hill-galaxy-spiral.jpg";
import landscapeViewImage from "@/assets/milk-hill-landscape-view.jpg";
import aerialOverviewImage from "@/assets/milk-hill-aerial-overview.jpg";

interface ArrayConfiguration {
  id: number;
  name: string;
  type: string;
  location: string;
  date: string;
  image: string;
  description: string;
  arrayType: "spiral" | "concentric" | "linear" | "hexagonal";
  elements: number;
  frequency: string;
  beamwidth: string;
  characteristics: string[];
}

const arrayConfigurations: ArrayConfiguration[] = [
  {
    id: 1,
    name: "Milk Hill Galaxy Spiral",
    type: "6-Armed Spiral Array",
    location: "Milk Hill, Wiltshire",
    date: "August 12, 2001",
    image: galaxySpiralImage,
    description: "Most complex crop formation ever recorded, featuring 409 circles in a 6-armed logarithmic spiral pattern optimized for multi-beam steering",
    arrayType: "spiral",
    elements: 409,
    frequency: "2.4-12 GHz",
    beamwidth: "±85°",
    characteristics: [
      "6-arm logarithmic spiral geometry",
      "Variable element spacing",
      "Multi-beam capability",
      "Wide angle coverage",
      "Phase coherent design"
    ]
  },
  {
    id: 2,
    name: "Concentric Ring Array",
    type: "Circular Phased Array",
    location: "Wiltshire, England",
    date: "July 2001",
    image: landscapeViewImage,
    description: "Perfect concentric circular array formation demonstrating classic circular aperture beam patterns with excellent azimuthal symmetry",
    arrayType: "concentric",
    elements: 156,
    frequency: "1.2-8 GHz",
    beamwidth: "360° azimuthal",
    characteristics: [
      "Concentric ring geometry",
      "Uniform azimuthal coverage",
      "Bessel function beam pattern",
      "Omnidirectional capability",
      "High side-lobe suppression"
    ]
  },
  {
    id: 3,
    name: "Hexagonal Cluster Array",
    type: "Triangular Lattice Array",
    location: "Wiltshire, England", 
    date: "August 2001",
    image: aerialOverviewImage,
    description: "Hexagonal close-packed array structure providing optimal spatial sampling and beam steering with minimal grating lobes",
    arrayType: "hexagonal",
    elements: 91,
    frequency: "3-15 GHz",
    beamwidth: "±60°",
    characteristics: [
      "Triangular lattice spacing",
      "Minimal grating lobes",
      "High spatial efficiency",
      "Beam steering optimization",
      "Close-packed geometry"
    ]
  }
];

export const ArrayExplorer = () => {
  const [selectedArray, setSelectedArray] = useState<ArrayConfiguration | null>(null);

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 cosmic-text">
            Array Configuration Explorer
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive analysis of crop circle formations showing advanced phased array characteristics and beam steering capabilities
          </p>
        </div>

        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {arrayConfigurations.map((config) => (
              <CarouselItem key={config.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="group cursor-pointer overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div onClick={() => setSelectedArray(config)}>
                        <div className="relative overflow-hidden">
                          <img 
                            src={config.image} 
                            alt={config.name}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <Badge 
                            variant="secondary" 
                            className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm"
                          >
                            {config.elements} elements
                          </Badge>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{config.name}</CardTitle>
                          <p className="text-sm text-primary font-medium">{config.type}</p>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-muted-foreground mb-4">
                            {config.description}
                          </p>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Frequency Range:</span>
                              <span className="font-mono">{config.frequency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Beam Coverage:</span>
                              <span className="font-mono">{config.beamwidth}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-muted-foreground pt-2">
                              <span>{config.date}</span>
                              <span>{config.location}</span>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
                      {selectedArray && (
                        <div className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <img 
                                src={selectedArray.image} 
                                alt={selectedArray.name}
                                className="w-full h-64 object-cover rounded-lg"
                              />
                            </div>
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-2xl font-bold mb-2">{selectedArray.name}</h3>
                                <p className="text-primary font-semibold mb-2">{selectedArray.type}</p>
                                <p className="text-muted-foreground">{selectedArray.description}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-semibold">Elements:</span>
                                  <p>{selectedArray.elements}</p>
                                </div>
                                <div>
                                  <span className="font-semibold">Frequency:</span>
                                  <p className="font-mono">{selectedArray.frequency}</p>
                                </div>
                                <div>
                                  <span className="font-semibold">Coverage:</span>
                                  <p className="font-mono">{selectedArray.beamwidth}</p>
                                </div>
                                <div>
                                  <span className="font-semibold">Date:</span>
                                  <p>{selectedArray.date}</p>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">Array Characteristics</h4>
                                <ul className="space-y-1 text-sm">
                                  {selectedArray.characteristics.map((char, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                      {char}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="border-t pt-6">
                            <h4 className="text-xl font-semibold mb-4">Interactive Array Analysis</h4>
                            
                            <div className="grid lg:grid-cols-2 gap-6">
                              <div>
                                <h5 className="font-semibold mb-2">Geometry Visualization</h5>
                                <div className="border rounded-lg overflow-hidden">
                                  <GeometryViewer />
                                </div>
                              </div>
                              
                              <div>
                                <h5 className="font-semibold mb-2">Beam Pattern Analysis</h5>
                                <div className="border rounded-lg overflow-hidden">
                                  <PhasedArraySimulator />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-xs text-muted-foreground pt-4 border-t">
                            <p>Array configuration analysis based on geometric measurements and theoretical phased array principles</p>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
            Each formation demonstrates sophisticated array engineering principles including optimal element spacing, 
            beam steering capabilities, and radiation pattern control. Click any array to explore its interactive analysis.
          </p>
        </div>
      </div>
    </section>
  );
};