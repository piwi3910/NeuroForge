export { api, handleApiError, type ErrorResponse } from './base'
export * from './queries'

// Re-export specific hooks for better discoverability
export {
  useProject,
  useCreateProject,
  useUpdateProjectDescription,
  useResetProject,
  useProjectSaves,
  useSaveProjectState,
  useLoadProjectState,
  useChatWithAI,
} from './queries'
