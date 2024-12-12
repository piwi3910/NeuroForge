import { Project } from '../../../../backend/src/generated/api'

export interface ProjectDetails {
  name?: string | null
  description?: string | null
  stack?: string | null
  status?: {
    name?: 'incomplete' | 'complete'
    description?: 'incomplete' | 'complete'
    stack?: 'incomplete' | 'complete'
  }
}

export interface ProjectInfoLayoutProps {
  project: Project
  onReset: () => void
  onUpdateDetails: (details: ProjectDetails) => void
}
