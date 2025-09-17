import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import galaxySpiralImage from "@/assets/milk-hill-galaxy-spiral.jpg";

// Simulate the Milk Hill crop circle data (409 circles)
const generateMilkHillData = () => {
  const circles: { x: number; y: number; radius: number; id: number }[] = [];
  
  // Generate concentric rings with increasing complexity
  const rings = [
    { count: 1, radius: 0, circleSize: 20 },      // Center
    { count: 6, radius: 50, circleSize: 15 },     // Inner ring
    { count: 12, radius: 100, circleSize: 12 },   // Second ring
    { count: 18, radius: 150, circleSize: 10 },   // Third ring
    { count: 24, radius: 200, circleSize: 8 },    // Fourth ring
    { count: 30, radius: 250, circleSize: 6 },    // Fifth ring
  ];

  let id = 0;
  rings.forEach((ring) => {
    if (ring.count === 1) {
      // Center circle
      circles.push({ x: 0, y: 0, radius: ring.circleSize, id: id++ });
    } else {
      // Circles around the ring
      for (let i = 0; i < ring.count; i++) {
        const angle = (i / ring.count) * 2 * Math.PI;
        const x = ring.radius * Math.cos(angle);
        const y = ring.radius * Math.sin(angle);
        circles.push({ x, y, radius: ring.circleSize, id: id++ });
      }
    }
  });

  // Add additional scattered circles to reach 409 total
  const remaining = 409 - circles.length;
  for (let i = 0; i < remaining; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const radius = 300 + Math.random() * 200;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    circles.push({ 
      x, 
      y, 
      radius: 4 + Math.random() * 8, 
      id: id++ 
    });
  }

  return circles;
};

const GeometryViewer = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewMode, setViewMode] = useState<"array" | "mathematical" | "artistic">("array");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedCircle, setSelectedCircle] = useState<any | null>(null);
  const [showPhoto, setShowPhoto] = useState(false);
  const [photoOpacity, setPhotoOpacity] = useState(0.7);

  const circleData = generateMilkHillData();

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Get container dimensions for responsive design
    const container = svgRef.current.parentElement;
    const containerRect = container?.getBoundingClientRect();
    const width = containerRect?.width || 800;
    const height = Math.min(window.innerHeight * 0.6, width * 0.75); // Mobile-friendly aspect ratio
    
    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    // Create zoom behavior with mobile-friendly settings
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoom);

    const g = svg.append("g");

    // Create scales
    const xExtent = d3.extent(circleData, d => d.x) as [number, number];
    const yExtent = d3.extent(circleData, d => d.y) as [number, number];
    
    const padding = Math.min(width, height) * 0.1;
    
    const xScale = d3.scaleLinear()
      .domain(xExtent)
      .range([padding, width - padding]);
    
    const yScale = d3.scaleLinear()
      .domain(yExtent)
      .range([padding, height - padding]);

    // Add background grid for array mode
    if (viewMode === "array") {
      const gridLines = g.append("g").attr("class", "grid");
      const gridSpacing = Math.min(width, height) / 15; // Responsive grid spacing
      
      // Vertical lines
      for (let x = padding; x <= width - padding; x += gridSpacing) {
        gridLines.append("line")
          .attr("x1", x)
          .attr("y1", padding)
          .attr("x2", x)
          .attr("y2", height - padding)
          .attr("stroke", "hsl(var(--border))")
          .attr("stroke-width", 0.5)
          .attr("opacity", 0.3);
      }
      
      // Horizontal lines
      for (let y = padding; y <= height - padding; y += gridSpacing) {
        gridLines.append("line")
          .attr("x1", padding)
          .attr("y1", y)
          .attr("x2", width - padding)
          .attr("y2", y)
          .attr("stroke", "hsl(var(--border))")
          .attr("stroke-width", 0.5)
          .attr("opacity", 0.3);
      }
    }

    // Draw circles with responsive sizing
    const minRadius = Math.max(2, Math.min(width, height) / 200);
    
    g.selectAll(".circle")
      .data(circleData)
      .enter()
      .append("circle")
      .attr("class", "circle crop-circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", d => {
        const baseRadius = viewMode === "artistic" ? d.radius : Math.max(minRadius, d.radius * 0.6);
        return Math.min(baseRadius, minRadius * 4); // Cap max size for mobile
      })
      .style("fill", () => {
        switch(viewMode) {
          case "array": return "hsl(var(--primary))";
          case "mathematical": return "hsl(var(--accent))";
          case "artistic": return "hsl(var(--secondary))";
          default: return "hsl(var(--primary))";
        }
      })
      .style("stroke", () => {
        switch(viewMode) {
          case "array": return "hsl(var(--primary-glow))";
          case "mathematical": return "hsl(var(--accent-glow))";
          case "artistic": return "hsl(var(--secondary-glow))";
          default: return "hsl(var(--primary-glow))";
        }
      })
      .style("stroke-width", 1)
      .style("opacity", 0.8)
      .on("click touchstart", function(event, d) {
        event.preventDefault();
        setSelectedCircle(d);
        d3.select(this)
          .style("fill", "hsl(var(--accent))")
          .style("stroke", "hsl(var(--accent-glow))")
          .style("stroke-width", 2);
      });

    // Add center point indicator
    g.append("circle")
      .attr("cx", xScale(0))
      .attr("cy", yScale(0))
      .attr("r", minRadius * 1.5)
      .style("fill", "hsl(var(--accent))")
      .style("stroke", "hsl(var(--accent-glow))")
      .style("stroke-width", 2);

    // Handle window resize
    const handleResize = () => {
      const newContainer = svgRef.current?.parentElement;
      const newRect = newContainer?.getBoundingClientRect();
      if (newRect) {
        svg.attr("width", newRect.width);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, [viewMode, circleData, selectedCircle, showPhoto, photoOpacity]);

  return (
    <div className="w-full bg-card/50 backdrop-blur-md rounded-lg border border-border/50 p-3 md:p-6">
      {/* Mobile-optimized header */}
      <div className="flex flex-col gap-3 mb-4 md:mb-6">
        <div className="text-center md:text-left">
          <h3 className="text-lg md:text-2xl font-bold cosmic-text">Interactive Array Explorer</h3>
          <p className="text-xs md:text-sm text-muted-foreground">409 circles • Touch to explore • Pinch to zoom</p>
        </div>
        
        {/* Touch-friendly mode switcher */}
        <div className="flex gap-1 md:gap-2 overflow-x-auto">
          <Button
            variant={viewMode === 'array' ? 'default' : 'outline'}
            onClick={() => setViewMode('array')}
            className="glow-hover text-xs md:text-sm px-3 md:px-4 py-2 min-h-[44px] flex-shrink-0 touch-manipulation"
          >
            Array View
          </Button>
          <Button
            variant={viewMode === 'mathematical' ? 'default' : 'outline'}
            onClick={() => setViewMode('mathematical')}
            className="glow-hover text-xs md:text-sm px-3 md:px-4 py-2 min-h-[44px] flex-shrink-0 touch-manipulation"
          >
            Mathematical
          </Button>
          <Button
            variant={viewMode === 'artistic' ? 'default' : 'outline'}
            onClick={() => setViewMode('artistic')}
            className="glow-hover text-xs md:text-sm px-3 md:px-4 py-2 min-h-[44px] flex-shrink-0 touch-manipulation"
          >
            Artistic
          </Button>
        </div>
      </div>

      {/* Responsive SVG container */}
      <div className="relative bg-background/30 rounded-lg border border-border/30 overflow-hidden">
        <svg 
          ref={svgRef} 
          className="w-full bg-gradient-to-br from-background to-muted/20 touch-manipulation select-none" 
          style={{ 
            height: 'clamp(300px, 60vh, 600px)',
            WebkitUserSelect: 'none',
            touchAction: 'pan-x pan-y'
          }}
        />
        
        {showPhoto && (
          <img
            src={galaxySpiralImage}
            alt="Milk Hill Crop Circle"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300"
            style={{ opacity: photoOpacity }}
          />
        )}
      </div>

      {/* Mobile-optimized controls */}
      <div className="flex flex-col gap-2 md:gap-4 mt-3 md:mt-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPhoto(!showPhoto)}
            className="glow-hover text-xs md:text-sm px-3 py-2 min-h-[44px] touch-manipulation"
          >
            {showPhoto ? 'Hide Photo' : 'Show Photo'}
          </Button>
          
          {showPhoto && (
            <div className="flex items-center gap-2">
              <label className="text-xs md:text-sm text-muted-foreground">Opacity:</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={photoOpacity}
                onChange={(e) => setPhotoOpacity(parseFloat(e.target.value))}
                className="w-16 md:w-20 h-6 accent-primary touch-manipulation"
              />
            </div>
          )}
        </div>
        
        <div className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
          <div>Zoom: {Math.round(zoomLevel * 100)}% • Pan with touch/mouse</div>
          {selectedCircle && (
            <div className="mt-1">
              Selected: Circle {selectedCircle.id} (radius: {selectedCircle.radius.toFixed(1)})
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { GeometryViewer };