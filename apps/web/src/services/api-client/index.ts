import { ApiClient } from './api-client';
export { ApiClient } from './api-client';
export { BaseApiClient } from './base';
export { ProjectOperations } from './project-operations';
export { ChatOperations } from './chat-operations';
export { StateOperations } from './state-operations';

// Create and export the API client instance
const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api');
export { apiClient };
