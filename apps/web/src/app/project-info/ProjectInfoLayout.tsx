import { useState } from 'react'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { LeftPanel } from './components/LeftPanel'
import { RightPanel } from './components/RightPanel'
import { ProjectDetails, ProjectInfoLayoutProps } from './types'

export function ProjectInfoLayout({
  project,
  onReset,
  onUpdateDetails,
}: ProjectInfoLayoutProps) {
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleReset = async () => {
    setIsResetDialogOpen(false)
    onReset()
  }

  return (
    <main className="h-[calc(100vh-40px)] bg-[#1e1e1e] p-4 flex flex-col">
      <div className="flex-1 flex gap-4">
        <LeftPanel
          projectId={project.id}
          projectPath={project.path}
          isGitRepo={!!project.git_repo}
          projectDetails={project.details}
          isLoading={isLoading}
          onUpdateDetails={onUpdateDetails}
          onOpenResetDialog={() => setIsResetDialogOpen(true)}
        />

        <RightPanel
          projectId={project.id}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onUpdateDetails={onUpdateDetails}
        />
      </div>

      <ConfirmDialog
        isOpen={isResetDialogOpen}
        onClose={() => setIsResetDialogOpen(false)}
        onConfirm={handleReset}
        title="Reset Project"
        message="Are you sure? This will reset and delete your project."
      />
    </main>
  )
}
