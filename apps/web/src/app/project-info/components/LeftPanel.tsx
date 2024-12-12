import { ProjectDetails } from '../types'

interface LeftPanelProps {
  projectId: string
  projectPath: string
  isGitRepo: boolean
  projectDetails?: ProjectDetails
  isLoading: boolean
  onUpdateDetails: (details: ProjectDetails) => void
  onOpenResetDialog: () => void
}

export function LeftPanel({
  projectId,
  projectPath,
  isGitRepo,
  projectDetails,
  isLoading,
  onUpdateDetails,
  onOpenResetDialog,
}: LeftPanelProps) {
  return (
    <div className="flex-1 bg-[#252526] rounded-lg p-4">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Project Details</h2>
          <div className="space-y-2">
            <div>
              <label className="text-sm text-gray-400">ID:</label>
              <p className="text-sm">{projectId}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Path:</label>
              <p className="text-sm">{projectPath}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Git Repository:</label>
              <p className="text-sm">{isGitRepo ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">AI Analysis</h2>
          <div className="space-y-2">
            <div>
              <label className="text-sm text-gray-400">Name:</label>
              <p className="text-sm">{projectDetails?.name || 'Not analyzed'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Description:</label>
              <p className="text-sm">{projectDetails?.description || 'Not analyzed'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Stack:</label>
              <p className="text-sm">{projectDetails?.stack || 'Not analyzed'}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenResetDialog}
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          Reset Project
        </button>
      </div>
    </div>
  )
}
