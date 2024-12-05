"use client";

export default function ProjectPage() {
  return (
    <main className="h-[calc(100vh-40px)] bg-[#1e1e1e] p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Project Overview</h1>
        
        <div className="space-y-6">
          <section className="bg-[#252526] p-4 rounded">
            <h2 className="text-xl font-semibold mb-3">Project Details</h2>
            <div className="space-y-2">
              <div className="flex">
                <span className="w-32 text-gray-400">Name:</span>
                <span>NeuroForge</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-400">Version:</span>
                <span>1.0.0</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-400">Repository:</span>
                <span>github.com/user/neuroforge</span>
              </div>
            </div>
          </section>

          <section className="bg-[#252526] p-4 rounded">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-300">
              NeuroForge is a web-based IDE with AI capabilities, designed to enhance developer productivity through intelligent code assistance and project management tools.
            </p>
          </section>

          <section className="bg-[#252526] p-4 rounded">
            <h2 className="text-xl font-semibold mb-3">Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Integrated AI assistance for code generation and debugging</li>
              <li>Real-time collaboration tools</li>
              <li>Advanced project management capabilities</li>
              <li>Git integration</li>
              <li>Multi-language support</li>
            </ul>
          </section>

          <section className="bg-[#252526] p-4 rounded">
            <h2 className="text-xl font-semibold mb-3">Tech Stack</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Frontend</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Next.js</li>
                  <li>React</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Backend</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Node.js</li>
                  <li>Express</li>
                  <li>WebSocket</li>
                  <li>OpenAI API</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
