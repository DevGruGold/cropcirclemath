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
  const polarRef = useRef<SVGSVGElement>(null);
  const heatmapRef = useRef<SVGSVGElement>(null);

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

  // Draw polar plot
  useEffect(() => {
    if (!polarRef.current) return;

    const svg = d3.select(polarRef.current);
    svg.selectAll("*").remove();

    const width = 400;
    const height = 400;
    const radius = 180;
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
      .text("0°");
    
    svg.append("text")
      .attr("x", width - 20)
      .attr("y", centerY + 5)
      .attr("text-anchor", "middle")
      .attr("fill", "hsl(var(--foreground))")
      .text("90°");

  }, [frequency, steeringAngle, arrayElements]);

  // Draw 2D heatmap
  useEffect(() => {
    if (!heatmapRef.current) return;

    const svg = d3.select(heatmapRef.current);
    svg.selectAll("*").remove();

    const width = 400;
    const height = 300;
    svg.attr("width", width).attr("height", height);

    const resolution = 40;
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
    <div className="space-y-6">
      <Card className="p-6 glass-morphism">
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2">Phased Array Beam Simulator</h3>
          <p className="text-muted-foreground">
            Adjust parameters to see how the Milk Hill geometry creates directional beams
          </p>
        </div>

        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Frequency: {frequency.toFixed(1)} GHz
              </label>
              <Slider
                value={[frequency]}
                onValueChange={([value]) => setFrequency(value)}
                min={0.1}
                max={5.0}
                step={0.1}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Steering Angle: {steeringAngle}°
              </label>
              <Slider
                value={[steeringAngle]}
                onValueChange={([value]) => setSteeringAngle(value)}
                min={-90}
                max={90}
                step={5}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={() => setShowEquations(!showEquations)}
              className="w-full"
            >
              {showEquations ? "Hide" : "Show"} Equations
            </Button>
            
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Elements:</strong> {arrayElements.length} array elements</p>
              <p><strong>Pattern:</strong> Concentric rings (Milk Hill inspired)</p>
              <p><strong>Analogy:</strong> Like HAARP steering ionospheric beams</p>
            </div>
          </div>
        </div>

        {/* Equations Panel */}
        {showEquations && (
          <Card className="p-4 mb-6 bg-muted/30 border-accent/50">
            <h4 className="font-semibold mb-3">Array Factor Mathematics</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="mb-1">Array Factor:</p>
                <BlockMath math="AF(\theta, \phi) = \sum_{n=1}^{N} A_n e^{jk(x_n \sin\theta \cos\phi + y_n \sin\theta \sin\phi + \delta_n)}" />
              </div>
              <div>
                <p className="mb-1">Where:</p>
                <div className="grid grid-cols-2 gap-2">
                  <div><InlineMath math="A_n" /> = element amplitude</div>
                  <div><InlineMath math="k = 2\pi f/c" /> = wave number</div>
                  <div><InlineMath math="(x_n, y_n)" /> = element position</div>
                  <div><InlineMath math="\delta_n" /> = phase delay</div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Visualizations */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center">
            <h4 className="font-semibold mb-3">Polar Beam Pattern</h4>
            <div className="bg-background/50 rounded-lg border border-card-border p-4">
              <svg ref={polarRef} className="w-full h-auto" />
            </div>
          </div>
          
          <div className="text-center">
            <h4 className="font-semibold mb-3">2D Intensity Heatmap</h4>
            <div className="bg-background/50 rounded-lg border border-card-border p-4">
              <svg ref={heatmapRef} className="w-full h-auto" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export { PhasedArraySimulator };