import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import galaxySpiralImage from "@/assets/milk-hill-galaxy-spiral.jpg";
import landscapeViewImage from "@/assets/milk-hill-landscape-view.jpg"; 
import closeUpImage from "@/assets/milk-hill-close-up.jpg";
import groundViewImage from "@/assets/milk-hill-ground-view.jpg";
import aerialOverviewImage from "@/assets/milk-hill-aerial-overview.jpg";

const photos = [
  {
    id: 1,
    src: galaxySpiralImage,
    title: "The Galaxy Spiral Formation",
    date: "August 12, 2001",
    description: "Aerial view of the massive 409-circle formation spanning nearly 1000ft in diameter",
    type: "Aerial Overview",
    location: "Milk Hill, Wiltshire"
  },
  {
    id: 2,
    src: landscapeViewImage,
    title: "Landscape Perspective",
    date: "July 12, 2001",
    description: "Ground-level view showing the formation's scale against the Wiltshire countryside",
    type: "Landscape",
    location: "Milk Hill, Wiltshire"
  },
  {
    id: 3,
    src: closeUpImage,
    title: "Close-up Detail",
    date: "August 12, 2001",
    description: "Detailed view of individual circles showing the precision of the flattened wheat patterns",
    type: "Detail",
    location: "Milk Hill, Wiltshire"
  },
  {
    id: 4,
    src: groundViewImage,
    title: "Ground-level Documentation", 
    date: "August 12, 2001",
    description: "On-site documentation showing the formation from ground perspective",
    type: "Ground View",
    location: "Milk Hill, Wiltshire"
  },
  {
    id: 5,
    src: aerialOverviewImage,
    title: "Complete Formation",
    date: "July 12, 2001", 
    description: "Full aerial capture of the geometric precision and spiral structure",
    type: "Aerial",
    location: "Milk Hill, Wiltshire"
  }
];

export const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 cosmic-text">
            Authentic Documentation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real photographs of the famous 2001 Milk Hill crop circle formations, courtesy of Temporary Temples
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {photos.map((photo) => (
              <CarouselItem key={photo.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="group cursor-pointer overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div onClick={() => setSelectedPhoto(photo)}>
                        <div className="relative overflow-hidden">
                          <img 
                            src={photo.src} 
                            alt={photo.title}
                            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <Badge 
                            variant="secondary" 
                            className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm"
                          >
                            {photo.type}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2 text-foreground">
                            {photo.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {photo.description}
                          </p>
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>{photo.date}</span>
                            <span>{photo.location}</span>
                          </div>
                        </CardContent>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                      {selectedPhoto && (
                        <div className="space-y-4">
                          <img 
                            src={selectedPhoto.src} 
                            alt={selectedPhoto.title}
                            className="w-full h-auto rounded-lg"
                          />
                          <div className="space-y-2">
                            <h3 className="text-2xl font-bold">{selectedPhoto.title}</h3>
                            <p className="text-muted-foreground">{selectedPhoto.description}</p>
                            <div className="flex gap-4 text-sm">
                              <span><strong>Date:</strong> {selectedPhoto.date}</span>
                              <span><strong>Location:</strong> {selectedPhoto.location}</span>
                              <span><strong>Type:</strong> {selectedPhoto.type}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-4">
                              © Temporary Temples - Steve Alexander Photography
                            </p>
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
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            These authentic photographs document the extraordinary precision and scale of the 2001 Milk Hill formations. 
            The famous "Galaxy Spiral" consisting of 409 individual circles remains one of the most complex crop formations ever recorded.
          </p>
        </div>
      </div>
    </section>
  );
};