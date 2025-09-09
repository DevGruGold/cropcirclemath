import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { ChatBot } from "@/components/ChatBot";
import { InlineMath, BlockMath } from "react-katex";
import { useState } from "react";

const Mathematics = () => {
  const [activeSection, setActiveSection] = useState("newton");

  const sections = [
    { id: "newton", title: "Newton & Gravity", icon: "🍎" },
    { id: "acoustics", title: "Acoustic Arrays", icon: "🔊" },
    { id: "plasma", title: "Plasma Physics", icon: "⚡" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 cosmic-text">
              The Mathematics Behind the Mystery
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From Newton's laws to plasma physics, explore the scientific principles 
              that explain how crop circle geometry could theoretically function as advanced technology
            </p>
          </div>

          {/* Section Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "outline"}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 text-lg ${activeSection === section.id ? "glow-hover" : ""}`}
              >
                <span className="mr-2 text-xl">{section.icon}</span>
                {section.title}
              </Button>
            ))}
          </div>

          {/* Newton & Gravity Section */}
          {activeSection === "newton" && (
            <div className="space-y-8">
              <Card className="p-8 glass-morphism">
                <h2 className="text-3xl font-bold mb-6 cosmic-text">🍎 Newton's Laws & Gravitational Limits</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Why Traditional Gravity Can't Create Propulsion</h3>
                    <p className="text-muted-foreground mb-4">
                      Newton's law of universal gravitation describes how masses attract each other, 
                      but this force cannot create net propulsion without reaction mass.
                    </p>
                    
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <BlockMath math="F = G \frac{m_1 m_2}{r^2}" />
                      <p className="text-sm mt-2">
                        Where G = 6.674 × 10⁻¹¹ m³/kg·s², the gravitational constant
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">The Third Law Problem</h3>
                    <p className="text-muted-foreground mb-4">
                      Newton's third law states that for every action, there is an equal and opposite reaction. 
                      This means traditional propulsion requires expelling mass in one direction to move in another.
                    </p>
                    
                    <div className="bg-accent/10 p-4 rounded-lg border border-accent/30">
                      <BlockMath math="\vec{F}_{12} = -\vec{F}_{21}" />
                      <p className="text-sm mt-2 italic">
                        "But what if we could manipulate the medium itself?" 🤔
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 glass-morphism">
                <h3 className="text-xl font-semibold mb-4">Beyond Classical Physics</h3>
                <p className="text-muted-foreground">
                  While Newton's laws work perfectly for everyday objects, they don't account for:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                  <li>Electromagnetic field manipulation (like in plasma physics)</li>
                  <li>Acoustic radiation pressure in fluid media</li>
                  <li>Quantum field effects at microscopic scales</li>
                  <li>General relativistic effects in strong gravitational fields</li>
                </ul>
              </Card>
            </div>
          )}

          {/* Acoustics Section */}
          {activeSection === "acoustics" && (
            <div className="space-y-8">
              <Card className="p-8 glass-morphism">
                <h2 className="text-3xl font-bold mb-6 cosmic-text">🔊 Acoustic Beamforming & Radiation Pressure</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">How Sound Waves Can Push Objects</h3>
                    <p className="text-muted-foreground mb-4">
                      Unlike gravity, acoustic waves can create radiation pressure - a force that can actually move objects. 
                      This is how acoustic levitation works and how whales can stun fish with focused sound.
                    </p>
                    
                    <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/30">
                      <BlockMath math="P_{rad} = \frac{I}{c} = \frac{\rho v^2}{2c}" />
                      <p className="text-sm mt-2">
                        Radiation pressure depends on intensity (I), density (ρ), velocity (v), and speed of sound (c)
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Phased Array Beam Steering</h3>
                    <p className="text-muted-foreground mb-4">
                      Multiple oscillating sources can create constructive interference in specific directions, 
                      forming focused beams. This is exactly what the Milk Hill geometry could achieve.
                    </p>
                    
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <BlockMath math="AF(\theta) = \sum_{n=0}^{N-1} A_n e^{j k d_n \sin\theta}" />
                      <p className="text-sm mt-2">
                        Array Factor: N elements with amplitudes A_n, spacing d_n, at angle θ
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary/10 p-6 rounded-lg border border-primary/30">
                    <h4 className="font-semibold mb-2">Real-World Example: Parametric Speakers</h4>
                    <p className="text-sm text-muted-foreground">
                      Modern parametric speakers use ultrasonic arrays to create highly directional audio beams. 
                      The Milk Hill pattern could theoretically focus acoustic energy with similar precision, 
                      but at frequencies that could interact with matter in extraordinary ways.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 glass-morphism">
                <h3 className="text-xl font-semibold mb-4">Think of This Like...</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-accent/10 rounded-lg text-center">
                    <div className="text-3xl mb-2">🎵</div>
                    <h4 className="font-semibold">Subwoofer Arrays</h4>
                    <p className="text-sm text-muted-foreground">Concert sound systems use multiple speakers to focus bass energy</p>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg text-center">
                    <div className="text-3xl mb-2">🐋</div>
                    <h4 className="font-semibold">Whale Echolocation</h4>
                    <p className="text-sm text-muted-foreground">Sperm whales can focus sound to stun squid from a distance</p>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg text-center">
                    <div className="text-3xl mb-2">🏥</div>
                    <h4 className="font-semibold">Medical Ultrasound</h4>
                    <p className="text-sm text-muted-foreground">Focused ultrasound can destroy tumors without surgery</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Plasma Section */}
          {activeSection === "plasma" && (
            <div className="space-y-8">
              <Card className="p-8 glass-morphism">
                <h2 className="text-3xl font-bold mb-6 cosmic-text">⚡ Plasma Physics & Electromagnetic Arrays</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Plasma: The Fourth State of Matter</h3>
                    <p className="text-muted-foreground mb-4">
                      Plasma is ionized gas where electrons are separated from atoms, creating a conductive medium. 
                      This allows electromagnetic forces to manipulate the plasma directly - no mechanical contact required.
                    </p>
                    
                    <div className="bg-accent/10 p-4 rounded-lg border border-accent/30">
                      <BlockMath math="n_e = \frac{I_s}{e} \cdot \frac{1}{v_s}" />
                      <p className="text-sm mt-2">
                        Plasma density (n_e) relates to ionization current and electron velocity
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">The HAARP Connection</h3>
                    <p className="text-muted-foreground mb-4">
                      HAARP uses a phased array of 180 antennas to heat and manipulate the ionosphere. 
                      The Milk Hill pattern has 409 circles - potentially a far more sophisticated array.
                    </p>
                    
                    <div className="bg-primary/10 p-4 rounded-lg border border-primary/30">
                      <h4 className="font-semibold mb-2">HAARP vs Milk Hill</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>HAARP:</strong>
                          <ul className="list-disc list-inside mt-1 text-muted-foreground">
                            <li>180 antenna elements</li>
                            <li>Square grid arrangement</li>
                            <li>3.6 MW total power</li>
                            <li>2-10 MHz frequency</li>
                          </ul>
                        </div>
                        <div>
                          <strong>Milk Hill:</strong>
                          <ul className="list-disc list-inside mt-1 text-muted-foreground">
                            <li>409 circular elements</li>
                            <li>Fractal spiral arrangement</li>
                            <li>Unknown power/frequency</li>
                            <li>Optimized geometry</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Plasma Refractive Index</h3>
                    <p className="text-muted-foreground mb-4">
                      Radio waves propagate differently through plasma depending on its density and magnetic field. 
                      By controlling plasma properties, you can steer electromagnetic beams.
                    </p>
                    
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <BlockMath math="n = \sqrt{1 - \frac{\omega_p^2}{\omega^2}}" />
                      <p className="text-sm mt-2">
                        Refractive index depends on plasma frequency ω_p and wave frequency ω
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 glass-morphism">
                <h3 className="text-xl font-semibold mb-4">Plasma Applications in Nature & Technology</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-accent">🌌 Natural Phenomena</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Aurora Borealis:</strong> Solar wind plasma interacting with Earth's magnetosphere</li>
                      <li><strong>Lightning:</strong> Plasma channels conducting electricity through air</li>
                      <li><strong>Solar Corona:</strong> Million-degree plasma extending from the Sun</li>
                      <li><strong>Ball Lightning:</strong> Mysterious self-contained plasma formations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-secondary">🔬 Human Technology</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Fusion Reactors:</strong> Magnetic confinement of plasma fuel</li>
                      <li><strong>Plasma Propulsion:</strong> Ion drives for spacecraft</li>
                      <li><strong>Plasma Displays:</strong> Controlled gas discharge for screens</li>
                      <li><strong>Industrial Processing:</strong> Plasma cutting and surface treatment</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Mathematics;