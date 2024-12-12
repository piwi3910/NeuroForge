import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api, handleApiError } from './base'

// Query keys
export const queryKeys = {
  projects: {
    all: ['projects'] as const,
    detail: (id: string) => ['projects', id] as const,
    saves: (id: string) => ['projects', id, 'saves'] as const,
  },
}

// Projects
export function useProject(projectId: string) {
  return useQuery({
    queryKey: queryKeys.projects.detail(projectId),
    queryFn: () => api.projects.getProject(projectId).then(res => res.data),
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: { name: string; description: string; gitRepo?: string }) =>
      api.projects.createProject(data).then(res => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.projects.detail(data.id), data)
    },
    onError: handleApiError,
  })
}

export function useUpdateProjectDescription() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ projectId, description }: { projectId: string; description: string }) =>
      api.projects.updateProjectDescription(projectId, { description }).then(res => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.projects.detail(data.id), data)
    },
    onError: handleApiError,
  })
}

export function useResetProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (projectId: string) =>
      api.projects.resetProject(projectId),
    onSuccess: (_, projectId) => {
      queryClient.removeQueries({ queryKey: queryKeys.projects.detail(projectId) })
    },
    onError: handleApiError,
  })
}

// Project State
export function useProjectSaves(projectId: string) {
  return useQuery({
    queryKey: queryKeys.projects.saves(projectId),
    queryFn: () => api.projects.listProjectSaves(projectId).then(res => res.data),
  })
}

export function useSaveProjectState() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ projectId, saveName }: { projectId: string; saveName: string }) =>
      api.projects.saveProjectState(projectId, { saveName }),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.saves(projectId) })
    },
    onError: handleApiError,
  })
}

export function useLoadProjectState() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ projectId, saveName }: { projectId: string; saveName: string }) =>
      api.projects.loadProjectState(projectId, saveName).then(res => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.projects.detail(data.id), data)
    },
    onError: handleApiError,
  })
}

// Chat
export function useChatWithAI() {
  return useMutation({
    mutationFn: ({ projectId, message }: { projectId: string; message: string }) =>
      api.projects.chatWithAi(projectId, { message }).then(res => res.data),
    onError: handleApiError,
  })
}
