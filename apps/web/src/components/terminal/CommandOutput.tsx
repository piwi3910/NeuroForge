import { CommandOutputProps } from './types';

export function CommandOutput({ commands }: CommandOutputProps) {
  return (
    <>
      {commands.map((command, i) => (
        <div key={i}>
          <div className="flex items-center">
            <span className="text-green-500">➜</span>
            <span className="text-blue-400 ml-2">~</span>
            <span className="ml-2">{command.input}</span>
          </div>
          {command.output.map((line, j) => (
            <div 
              key={j}
              className={command.error ? 'text-red-400' : 'text-gray-300'}
            >
              {line}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
