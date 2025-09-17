import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { InlineMath, BlockMath } from "react-katex";

interface ArrayElement {
  x: number;
  y: number;
  amplitude: number;
  phase: number;
}

const PhasedArraySimulator = () => {
  const [frequency, setFrequency] = useState(1.0);
  const [steeringAngle, setSteeringAngle] = useState(0);
  const [showEquations, setShowEquations] = useState(false);
  const polarSvgRef = useRef<SVGSVGElement>(null);
  const heatmapSvgRef = useRef<SVGSVGElement>(null);

  // Generate array elements based on Milk Hill pattern (simplified)
  const generateArrayElements = (): ArrayElement[] => {
    const elements: ArrayElement[] = [];
    
    // Create a simplified version with key circles from Milk Hill
    const rings = [
      { count: 1, radius: 0 },
      { count: 6, radius: 0.5 },
      { count: 12, radius: 1.0 },
      { count: 18, radius: 1.5 },
      { count: 24, radius: 2.0 },
    ];

    rings.forEach((ring) => {
      if (ring.count === 1) {
        elements.push({ x: 0, y: 0, amplitude: 1, phase: 0 });
      } else {
        for (let i = 0; i < ring.count; i++) {
          const angle = (i / ring.count) * 2 * Math.PI;
          const x = ring.radius * Math.cos(angle);
          const y = ring.radius * Math.sin(angle);
          elements.push({ x, y, amplitude: 1, phase: 0 });
        }
      }
    });

    return elements;
  };

  const arrayElements = generateArrayElements();

  // Calculate array factor for phased array
  const calculateArrayFactor = (theta: number, phi: number = 0) => {
    const k = 2 * Math.PI * frequency; // wave number
    let sumReal = 0;
    let sumImag = 0;

    arrayElements.forEach((element) => {
      // Calculate phase delay for steering
      const steeringPhase = k * (element.x * Math.sin(theta) * Math.cos(phi) + 
                                   element.y * Math.sin(theta) * Math.sin(phi));
      
      const totalPhase = element.phase + steeringPhase + 
                         k * element.x * Math.sin(steeringAngle * Math.PI / 180);
      
      sumReal += element.amplitude * Math.cos(totalPhase);
      sumImag += element.amplitude * Math.sin(totalPhase);
    });

    return Math.sqrt(sumReal * sumReal + sumImag * sumImag);
  };

  // Draw polar plot - responsive
  useEffect(() => {
    if (!polarSvgRef.current) return;

    const svg = d3.select(polarSvgRef.current);
    svg.selectAll("*").remove();

    // Responsive sizing
    const container = polarSvgRef.current.parentElement;
    const containerRect = container?.getBoundingClientRect();
    const size = Math.min(containerRect?.width || 320, 400);
    const width = size;
    const height = size;
    const radius = size * 0.4;
    const centerX = width / 2;
    const centerY = height / 2;

    svg.attr("width", width).attr("height", height);

    // Draw polar grid
    const grid = svg.append("g").attr("class", "grid");
    
    // Radial circles
    for (let r = radius / 4; r <= radius; r += radius / 4) {
      grid.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", r)
        .attr("fill", "none")
        .attr("stroke", "hsl(var(--border))")
        .attr("stroke-width", 1)
        .attr("opacity", 0.3);
    }

    // Angular lines
    for (let angle = 0; angle < 360; angle += 30) {
      const radians = (angle * Math.PI) / 180;
      const x2 = centerX + radius * Math.cos(radians);
      const y2 = centerY + radius * Math.sin(radians);
      
      grid.append("line")
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", "hsl(var(--border))")
        .attr("stroke-width", 1)
        .attr("opacity", 0.3);
    }

    // Calculate and draw beam pattern
    const points: [number, number][] = [];
    for (let angle = 0; angle < 360; angle += 2) {
      const theta = (angle * Math.PI) / 180;
      const arrayFactor = calculateArrayFactor(theta);
      const normalizedAF = (arrayFactor / arrayElements.length) * radius;
      
      const x = centerX + normalizedAF * Math.cos(theta);
      const y = centerY + normalizedAF * Math.sin(theta);
      points.push([x, y]);
    }

    // Draw the beam pattern
    const line = d3.line().curve(d3.curveLinearClosed);
    
    svg.append("path")
      .datum(points)
      .attr("d", line)
      .attr("fill", "hsl(var(--primary) / 0.3)")
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 2)
      .attr("filter", "drop-shadow(0 0 8px hsl(var(--primary) / 0.6))");

    // Add labels
    svg.append("text")
      .attr("x", centerX)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("fill", "hsl(var(--foreground))")
      .attr("font-size", Math.max(10, size / 32))
      .text("0°");
    
    svg.append("text")
      .attr("x", width - 20)
      .attr("y", centerY + 5)
      .attr("text-anchor", "middle")
      .attr("fill", "hsl(var(--foreground))")
      .attr("font-size", Math.max(10, size / 32))
      .text("90°");

  }, [frequency, steeringAngle, arrayElements]);

  // Draw 2D heatmap - responsive
  useEffect(() => {
    if (!heatmapSvgRef.current) return;

    const svg = d3.select(heatmapSvgRef.current);
    svg.selectAll("*").remove();

    // Responsive sizing
    const container = heatmapSvgRef.current.parentElement;
    const containerRect = container?.getBoundingClientRect();
    const maxSize = Math.min(containerRect?.width || 320, 400);
    const width = maxSize;
    const height = maxSize * 0.75; // 4:3 aspect ratio
    
    svg.attr("width", width).attr("height", height);

    const resolution = Math.max(20, Math.min(40, width / 10)); // Adaptive resolution
    const data: number[][] = [];

    // Calculate intensity at each point
    for (let i = 0; i < resolution; i++) {
      data[i] = [];
      for (let j = 0; j < resolution; j++) {
        const theta = (i / resolution) * Math.PI;
        const phi = (j / resolution) * 2 * Math.PI;
        const intensity = calculateArrayFactor(theta, phi);
        data[i][j] = intensity;
      }
    }

    // Flatten data and create color scale
    const flatData = data.flat();
    const maxIntensity = Math.max(...flatData);
    const colorScale = d3.scaleSequential(d3.interpolateViridis)
      .domain([0, maxIntensity]);

    // Draw heatmap
    const cellWidth = width / resolution;
    const cellHeight = height / resolution;

    svg.selectAll(".cell")
      .data(flatData)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("x", (d, i) => (i % resolution) * cellWidth)
      .attr("y", (d, i) => Math.floor(i / resolution) * cellHeight)
      .attr("width", cellWidth)
      .attr("height", cellHeight)
      .attr("fill", d => colorScale(d));

  }, [frequency, steeringAngle, arrayElements]);

  return (
    <div className="w-full bg-card/50 backdrop-blur-md rounded-lg border border-border/50 p-3 md:p-6">
      <div className="text-center mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl font-bold cosmic-text mb-2">Phased Array Beam Pattern</h3>
        <p className="text-sm md:text-base text-muted-foreground px-2">
          Touch the sliders to steer the beam and see real-time physics simulation
        </p>
      </div>

      {/* Mobile-first layout: controls at top, visuals below */}
      <div className="space-y-6 md:space-y-8">
        {/* Touch-optimized controls */}
        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground block">
                Frequency: {frequency.toFixed(1)} GHz
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={frequency}
                onChange={(e) => setFrequency(parseFloat(e.target.value))}
                className="w-full h-6 md:h-4 accent-primary touch-manipulation cursor-pointer"
                style={{ WebkitAppearance: 'none' }}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground block">
                Steering Angle: {steeringAngle}°
              </label>
              <input
                type="range"
                min="-60"
                max="60"
                step="5"
                value={steeringAngle}
                onChange={(e) => setSteeringAngle(parseInt(e.target.value))}
                className="w-full h-6 md:h-4 accent-primary touch-manipulation cursor-pointer"
                style={{ WebkitAppearance: 'none' }}
              />
            </div>
          </div>

          <Button
            onClick={() => setShowEquations(!showEquations)}
            variant="outline"
            className="w-full md:w-auto glow-hover min-h-[48px] touch-manipulation"
          >
            {showEquations ? 'Hide' : 'Show'} Mathematical Formulas
          </Button>

          {showEquations && (
            <Card className="p-3 md:p-4 glass-morphism">
              <h4 className="font-bold text-primary mb-3 text-sm md:text-base">Array Factor Equation</h4>
              <div className="space-y-3 text-xs md:text-sm">
                <div className="overflow-x-auto">
                  <BlockMath>
                    {`AF(\\theta) = \\sum_{n=0}^{N-1} a_n e^{jk(x_n \\sin\\theta + \\phi_n)}`}
                  </BlockMath>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Where <InlineMath>k = 2\\pi f / c</InlineMath> is the wavenumber, 
                  <InlineMath>x_n</InlineMath> are element positions, and 
                  <InlineMath>\\phi_n</InlineMath> are progressive phase shifts for beam steering.
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Responsive visualizations - stack on mobile, side-by-side on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-3 text-center cosmic-text">Polar Beam Pattern</h4>
            <div className="bg-background/30 rounded-lg border border-border/30 p-2 md:p-4">
              <svg 
                ref={polarSvgRef} 
                className="w-full bg-gradient-to-br from-background to-muted/20 touch-manipulation select-none" 
                style={{ 
                  height: 'clamp(250px, 40vh, 320px)',
                  WebkitUserSelect: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-semibold mb-3 text-center cosmic-text">2D Intensity Heatmap</h4>
            <div className="bg-background/30 rounded-lg border border-border/30 p-2 md:p-4">
              <svg 
                ref={heatmapSvgRef} 
                className="w-full bg-gradient-to-br from-background to-muted/20 touch-manipulation select-none" 
                style={{ 
                  height: 'clamp(250px, 40vh, 320px)',
                  WebkitUserSelect: 'none'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PhasedArraySimulator };