import { InfoSectionProps } from './types';

export function InfoSection({ projectDetails }: InfoSectionProps) {
  return (
    <div className="pt-4 space-y-3">
      <div>
        <span className="text-gray-400">Name:</span>
        <div className="mt-1 text-white">
          {projectDetails.name || "Not set"}
        </div>
      </div>
      <div>
        <span className="text-gray-400">Description:</span>
        <div className="mt-1 text-white">
          {projectDetails.description || "Not set"}
        </div>
      </div>
      <div>
        <span className="text-gray-400">Stack:</span>
        <div className="mt-1 text-white">
          {projectDetails.stack || "Not set"}
        </div>
      </div>
    </div>
  );
}
