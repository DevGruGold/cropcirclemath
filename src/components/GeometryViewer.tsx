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
  const [viewMode, setViewMode] = useState<"wheat" | "array">("wheat");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedCircle, setSelectedCircle] = useState<number | null>(null);
  const [showPhoto, setShowPhoto] = useState(false);
  const [photoOpacity, setPhotoOpacity] = useState(0.7);

  const circleData = generateMilkHillData();

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 600;
    
    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    // Add background image if enabled
    if (showPhoto) {
      svg.append("defs")
        .append("pattern")
        .attr("id", "photo-pattern")
        .attr("patternUnits", "userSpaceOnUse")
        .attr("width", width)
        .attr("height", height)
        .append("image")
        .attr("href", galaxySpiralImage)
        .attr("width", width)
        .attr("height", height)
        .attr("opacity", photoOpacity);

      svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "url(#photo-pattern)")
        .style("pointer-events", "none");
    }

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 10])
      .on("zoom", (event) => {
        container.attr("transform", event.transform);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoom);

    const container = svg.append("g");

    // Create scales
    const xExtent = d3.extent(circleData, d => d.x) as [number, number];
    const yExtent = d3.extent(circleData, d => d.y) as [number, number];
    
    const xScale = d3.scaleLinear()
      .domain(xExtent)
      .range([100, width - 100]);
    
    const yScale = d3.scaleLinear()
      .domain(yExtent)
      .range([100, height - 100]);

    // Add background grid for array mode
    if (viewMode === "array") {
      const gridLines = container.append("g").attr("class", "grid");
      
      // Vertical lines
      for (let x = 100; x <= width - 100; x += 50) {
        gridLines.append("line")
          .attr("x1", x)
          .attr("y1", 100)
          .attr("x2", x)
          .attr("y2", height - 100)
          .attr("stroke", "hsl(var(--border))")
          .attr("stroke-width", 0.5)
          .attr("opacity", 0.3);
      }
      
      // Horizontal lines
      for (let y = 100; y <= height - 100; y += 50) {
        gridLines.append("line")
          .attr("x1", 100)
          .attr("y1", y)
          .attr("x2", width - 100)
          .attr("y2", y)
          .attr("stroke", "hsl(var(--border))")
          .attr("stroke-width", 0.5)
          .attr("opacity", 0.3);
      }
    }

    // Draw circles
    container.selectAll(".circle")
      .data(circleData)
      .enter()
      .append("circle")
      .attr("class", "circle crop-circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", d => viewMode === "wheat" ? d.radius : Math.max(3, d.radius * 0.5))
      .style("fill", viewMode === "wheat" ? "hsl(var(--secondary))" : "hsl(var(--primary))")
      .style("stroke", viewMode === "wheat" ? "hsl(var(--secondary-glow))" : "hsl(var(--primary-glow))")
      .style("stroke-width", viewMode === "wheat" ? 2 : 1)
      .style("opacity", 0.8)
      .on("mouseover", function(event, d) {
        d3.select(this)
          .style("fill", "hsl(var(--accent))")
          .style("stroke", "hsl(var(--accent-glow))")
          .style("stroke-width", 3);
      })
      .on("mouseout", function(event, d) {
        if (selectedCircle !== d.id) {
          d3.select(this)
            .style("fill", viewMode === "wheat" ? "hsl(var(--secondary))" : "hsl(var(--primary))")
            .style("stroke", viewMode === "wheat" ? "hsl(var(--secondary-glow))" : "hsl(var(--primary-glow))")
            .style("stroke-width", viewMode === "wheat" ? 2 : 1);
        }
      })
      .on("click", function(event, d) {
        setSelectedCircle(d.id);
      });

    // Add center point indicator
    container.append("circle")
      .attr("cx", xScale(0))
      .attr("cy", yScale(0))
      .attr("r", 3)
      .style("fill", "hsl(var(--accent))")
      .style("stroke", "hsl(var(--accent-glow))")
      .style("stroke-width", 2);

  }, [viewMode, circleData, selectedCircle, showPhoto, photoOpacity]);

  return (
    <Card className="p-6 glass-morphism">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">Interactive Geometry Viewer</h3>
            <p className="text-muted-foreground">
              {circleData.length} precisely positioned circles • Zoom: {zoomLevel.toFixed(1)}x
              {showPhoto && " • Photo overlay active"}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex gap-2">
              <Button
                variant={viewMode === "wheat" ? "default" : "outline"}
                onClick={() => setViewMode("wheat")}
                className={viewMode === "wheat" ? "glow-hover" : ""}
              >
                Wheat View
              </Button>
              <Button
                variant={viewMode === "array" ? "default" : "outline"}
                onClick={() => setViewMode("array")}
                className={viewMode === "array" ? "glow-hover" : ""}
              >
                Array View
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="photo-overlay"
                checked={showPhoto}
                onCheckedChange={setShowPhoto}
              />
              <Label htmlFor="photo-overlay" className="text-sm font-medium">
                Photo Overlay
              </Label>
            </div>
            
            {showPhoto && (
              <div className="flex items-center space-x-2">
                <Label htmlFor="opacity-slider" className="text-xs">
                  Opacity:
                </Label>
                <input
                  id="opacity-slider"
                  type="range"
                  min="0.3"
                  max="1"
                  step="0.1"
                  value={photoOpacity}
                  onChange={(e) => setPhotoOpacity(parseFloat(e.target.value))}
                  className="w-20 accent-primary"
                />
                <span className="text-xs text-muted-foreground">
                  {Math.round(photoOpacity * 100)}%
                </span>
              </div>
            )}
          </div>
        </div>

      <div className="relative bg-background/50 rounded-lg border border-card-border overflow-hidden">
        <svg ref={svgRef} className="w-full h-auto" />
        
        <div className="absolute bottom-4 left-4 text-sm text-muted-foreground">
          Click and drag to pan • Scroll to zoom • Hover circles for details
        </div>
      </div>

      {selectedCircle !== null && (
        <div className="mt-4 p-4 bg-card/50 rounded-lg border border-card-border">
          <h4 className="font-semibold mb-2">Circle #{selectedCircle}</h4>
          <p className="text-sm text-muted-foreground">
            Position: ({circleData[selectedCircle]?.x.toFixed(1)}, {circleData[selectedCircle]?.y.toFixed(1)})
            <br />
            Radius: {circleData[selectedCircle]?.radius.toFixed(1)} units
          </p>
        </div>
      )}
    </Card>
  );
};

export { GeometryViewer };