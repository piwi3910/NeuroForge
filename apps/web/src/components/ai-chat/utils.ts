export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getInitialMessage() {
  return {
    role: 'assistant' as const,
    content: `Hello! I'm your AI programming assistant. I can help you with:

- Writing and explaining code
- Debugging problems
- Answering programming questions
- Generating documentation

Try asking me something! I support markdown and code blocks, for example:

\`\`\`typescript
function greet(name: string) {
  return \`Hello, \${name}!\`;
}
\`\`\``,
    timestamp: new Date()
  };
}

export function generateResponse(userMessage: string): string {
  if (userMessage.toLowerCase().includes('example')) {
    return `Here's an example React component:

\`\`\`tsx
import { useState } from 'react';

interface CounterProps {
  initialCount?: number;
}

export function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount);
  
  return (
    <div className="p-4 border rounded">
      <p>Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Increment
      </button>
    </div>
  );
}
\`\`\`

You can use this component like this:

\`\`\`tsx
<Counter initialCount={5} />
\`\`\``;
  }
  
  if (userMessage.toLowerCase().includes('help')) {
    return `I can help you with various programming tasks:

1. **Code Generation**
   - React components
   - TypeScript interfaces
   - API endpoints

2. **Debugging**
   - Error analysis
   - Performance optimization
   - Code review

3. **Best Practices**
   - Code organization
   - Design patterns
   - Testing strategies

What would you like to know more about?`;
  }
  
  return "I understand you're asking about programming. Could you provide more specific details about what you'd like help with?";
}
