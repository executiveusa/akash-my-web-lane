export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Akash
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Transform your WordPress site into lightning-fast Astro
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            WordPress loads in 6.2s. Akash sites load in 0.4s. 
            Lighthouse scores jump from 34 to 97/100 with our AI-powered Synthia.
          </p>
          
          <div className="flex gap-4 justify-center mb-16">
            <button className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-8 rounded-lg transition">
              Get Started
            </button>
            <button className="border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-bold py-3 px-8 rounded-lg transition">
              See Demo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-slate-700 p-8 rounded-lg">
              <div className="text-4xl font-bold text-amber-500 mb-2">97</div>
              <p className="text-gray-300">Lighthouse Score</p>
            </div>
            <div className="bg-slate-700 p-8 rounded-lg">
              <div className="text-4xl font-bold text-amber-500 mb-2">15x</div>
              <p className="text-gray-300">Faster Loading</p>
            </div>
            <div className="bg-slate-700 p-8 rounded-lg">
              <div className="text-4xl font-bold text-amber-500 mb-2">AI</div>
              <p className="text-gray-300">Synthia Powered</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
