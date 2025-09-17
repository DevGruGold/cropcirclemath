import { Navigation } from "@/components/Navigation";
import { GeometryViewer } from "@/components/GeometryViewer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import milkHillAerial from "@/assets/milk-hill-aerial-overview.jpg";
import milkHillDetail from "@/assets/crop-circles-detail.jpg";

const Geometry = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Geometric Analysis
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Dive deep into the mathematical structure and geometric relationships 
              within the 409-circle Milk Hill formation.
            </p>
          </div>

          {/* Formation Overview */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6 bg-white/5 border-white/10">
              <img 
                src={milkHillAerial} 
                alt="Milk Hill Aerial View" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-white mb-3">Aerial Perspective</h3>
              <p className="text-gray-300">
                The complete formation spans approximately 800 feet in diameter, 
                making it one of the largest and most complex crop circles ever documented.
              </p>
            </Card>

            <Card className="p-6 bg-white/5 border-white/10">
              <img 
                src={milkHillDetail} 
                alt="Milk Hill Detail View" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-white mb-3">Geometric Detail</h3>
              <p className="text-gray-300">
                Each of the 409 circles varies in size according to mathematical 
                relationships, creating a harmonious spiral pattern with precise proportions.
              </p>
            </Card>
          </div>

          {/* Interactive Geometry Viewer */}
          <Card className="p-8 mb-8 bg-white/5 border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Interactive Geometry Explorer</h2>
            <p className="text-gray-300 mb-6">
              Explore the geometric structure of the Milk Hill formation. Switch between different 
              viewing modes to understand the mathematical relationships and patterns.
            </p>
            <GeometryViewer />
          </Card>

          {/* Mathematical Properties */}
          <Card className="p-8 mb-8 bg-white/5 border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Mathematical Properties</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">409</div>
                <div className="text-white font-semibold mb-1">Total Circles</div>
                <div className="text-gray-400 text-sm">Prime factorization: 409 is prime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">13</div>
                <div className="text-white font-semibold mb-1">Spiral Arms</div>
                <div className="text-gray-400 text-sm">Fibonacci sequence relationship</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">1.618</div>
                <div className="text-white font-semibold mb-1">Golden Ratio</div>
                <div className="text-gray-400 text-sm">φ appears in proportions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">800</div>
                <div className="text-white font-semibold mb-1">Diameter (ft)</div>
                <div className="text-gray-400 text-sm">Approximately 244 meters</div>
              </div>
            </div>
          </Card>

          {/* Geometric Relationships */}
          <Card className="p-8 bg-white/5 border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Geometric Relationships</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Spiral Structure</h3>
                <div className="space-y-2 mb-4">
                  <Badge variant="outline">Logarithmic Spiral</Badge>
                  <Badge variant="outline">Golden Angle</Badge>
                  <Badge variant="outline">Fibonacci Numbers</Badge>
                </div>
                <p className="text-gray-300 text-sm">
                  The formation follows natural spiral patterns found in 
                  nautilus shells, galaxies, and plant growth.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Circle Sizing</h3>
                <div className="space-y-2 mb-4">
                  <Badge variant="outline">Harmonic Series</Badge>
                  <Badge variant="outline">Proportional Scaling</Badge>
                  <Badge variant="outline">Area Relationships</Badge>
                </div>
                <p className="text-gray-300 text-sm">
                  Circle diameters follow mathematical sequences that 
                  create visual harmony and structural stability.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Spatial Distribution</h3>
                <div className="space-y-2 mb-4">
                  <Badge variant="outline">Polar Coordinates</Badge>
                  <Badge variant="outline">Angular Positioning</Badge>
                  <Badge variant="outline">Radial Symmetry</Badge>
                </div>
                <p className="text-gray-300 text-sm">
                  The precise positioning creates optimal packing density 
                  while maintaining aesthetic appeal.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Geometry;