import { StatusListProps } from './types';

export function StatusList({ status }: StatusListProps) {
  return (
    <div>
      <span className="text-gray-400">Status:</span>
      <div className="mt-1 space-y-1">
        <div className="flex justify-between">
          <span>Name:</span>
          <span className={status.name === 'complete' ? "text-green-500" : "text-yellow-500"}>
            {status.name}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Description:</span>
          <span className={status.description === 'complete' ? "text-green-500" : "text-yellow-500"}>
            {status.description}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Stack:</span>
          <span className={status.stack === 'complete' ? "text-green-500" : "text-yellow-500"}>
            {status.stack}
          </span>
        </div>
      </div>
    </div>
  );
}
