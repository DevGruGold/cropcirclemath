import { Navigation } from "@/components/Navigation";
import { PhasedArraySimulator } from "@/components/PhasedArraySimulator";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Physics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Physics & Array Theory
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Explore the physics principles behind phased array systems and how they relate 
              to the geometric patterns observed in crop circle formations.
            </p>
          </div>

          {/* Theory Section */}
          <Card className="p-8 mb-8 bg-white/5 border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Phased Array Theory</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Core Principles</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>• <strong>Constructive Interference:</strong> When waves from multiple sources combine to create stronger signals</li>
                  <li>• <strong>Destructive Interference:</strong> When waves cancel each other out, creating nulls in the pattern</li>
                  <li>• <strong>Phase Control:</strong> Adjusting timing to steer the beam direction</li>
                  <li>• <strong>Array Factor:</strong> Mathematical description of the radiation pattern</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Applications</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Radar Systems</Badge>
                  <Badge variant="outline">5G Networks</Badge>
                  <Badge variant="outline">Radio Astronomy</Badge>
                  <Badge variant="outline">Medical Imaging</Badge>
                </div>
                <p className="text-gray-300">
                  Phased arrays are used in modern technology for precise beam steering 
                  and signal processing, demonstrating the practical applications of 
                  complex geometric arrangements.
                </p>
              </div>
            </div>
          </Card>

          {/* Interactive Simulator */}
          <Card className="p-8 mb-8 bg-white/5 border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Interactive Beam Pattern Simulator</h2>
            <p className="text-gray-300 mb-6">
              Experiment with different frequencies and steering angles to see how the beam pattern changes.
              This simulator demonstrates the mathematical principles that govern array behavior.
            </p>
            <PhasedArraySimulator />
          </Card>

          {/* Mathematical Foundation */}
          <Card className="p-8 bg-white/5 border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Mathematical Foundation</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Wave Equation</h3>
                <div className="bg-black/30 p-4 rounded-lg border border-white/20">
                  <code className="text-green-300">
                    E = E₀ · e^(j(ωt - βr + φ))
                  </code>
                </div>
                <p className="text-gray-300 text-sm mt-2">
                  Fundamental electromagnetic wave propagation
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Array Factor</h3>
                <div className="bg-black/30 p-4 rounded-lg border border-white/20">
                  <code className="text-green-300">
                    AF = Σ aₙ · e^(jβdₙsin(θ))
                  </code>
                </div>
                <p className="text-gray-300 text-sm mt-2">
                  Pattern formed by element interference
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibent text-white mb-4">Beam Steering</h3>
                <div className="bg-black/30 p-4 rounded-lg border border-white/20">
                  <code className="text-green-300">
                    φₙ = -βdₙsin(θ₀)
                  </code>
                </div>
                <p className="text-gray-300 text-sm mt-2">
                  Phase adjustment for directional control
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Physics;