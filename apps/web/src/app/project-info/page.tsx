import { useProject, useResetProject, useUpdateProjectDescription } from '../../services/api'
import { ProjectInfoLayout } from './ProjectInfoLayout'
import { ProjectDetails } from './types'

interface ProjectInfoPageProps {
  searchParams: {
    id?: string
  }
}

export default function ProjectInfoPage({ searchParams }: ProjectInfoPageProps) {
  const projectId = searchParams.id
  const { data: project, isLoading, error } = useProject(projectId!)
  const resetProject = useResetProject()
  const updateProject = useUpdateProjectDescription()

  if (!projectId) {
    return <div>No project ID provided</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading project</div>
  }

  if (!project) {
    return <div>Project not found</div>
  }

  const handleReset = () => {
    resetProject.mutate(projectId)
  }

  const handleUpdateDetails = (details: ProjectDetails) => {
    if (details.description !== undefined) {
      updateProject.mutate({
        projectId,
        description: details.description || '',
      })
    }
  }

  return (
    <ProjectInfoLayout
      project={project}
      onReset={handleReset}
      onUpdateDetails={handleUpdateDetails}
    />
  )
}
