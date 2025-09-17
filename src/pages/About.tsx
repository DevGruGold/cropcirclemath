import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import milkHillHero from "@/assets/milk-hill-hero.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="relative mb-12 rounded-2xl overflow-hidden">
            <img 
              src={milkHillHero} 
              alt="Milk Hill Crop Circle Formation" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">About This Project</h1>
                <p className="text-xl md:text-2xl opacity-90">Exploring Mathematical Beauty in Nature</p>
              </div>
            </div>
          </div>

          {/* Project Overview */}
          <Card className="p-8 mb-8 bg-white/5 border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Project Overview</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                This interactive educational platform explores the fascinating mathematical principles 
                and geometric patterns found in crop circle formations, with particular focus on the 
                legendary Milk Hill formation that appeared in Wiltshire, England in 2001.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Featuring 409 individual circles arranged in a complex spiral pattern, the Milk Hill 
                formation represents one of the most mathematically sophisticated crop circles ever 
                documented. This site uses advanced visualization techniques to help users understand 
                the underlying mathematical relationships and physical principles that could theoretically 
                create such precise geometric arrangements.
              </p>
            </div>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 bg-white/5 border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Interactive Visualizations</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Real-time geometry manipulation</li>
                <li>• 3D mathematical modeling</li>
                <li>• Responsive design patterns</li>
                <li>• Educational animations</li>
              </ul>
            </Card>

            <Card className="p-6 bg-white/5 border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Educational Content</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Mathematical theory explanations</li>
                <li>• Physics simulations</li>
                <li>• Historical context</li>
                <li>• Interactive learning tools</li>
              </ul>
            </Card>
          </div>

          {/* Technologies Used */}
          <Card className="p-8 bg-white/5 border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Technologies & Methods</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">D3.js</Badge>
              <Badge variant="secondary">Mathematical Modeling</Badge>
              <Badge variant="secondary">Data Visualization</Badge>
              <Badge variant="secondary">Responsive Design</Badge>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Built using modern web technologies and mathematical visualization libraries, 
              this platform combines rigorous computational methods with intuitive user 
              interfaces to make complex mathematical concepts accessible to learners of all levels.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;