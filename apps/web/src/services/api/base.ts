import { Api } from '../../../../backend/src/generated/api'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const api = new Api({
  baseUrl: BASE_URL,
  baseApiParams: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
})

export type ErrorResponse = {
  message: string
  statusCode: number
}

export async function handleApiError(error: unknown): Promise<never> {
  if (error instanceof Error) {
    throw new Error(error.message)
  }
  throw new Error('An unexpected error occurred')
}
