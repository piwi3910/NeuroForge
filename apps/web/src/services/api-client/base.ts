export class BaseApiClient {
    protected baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    protected async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        console.log('Making request to:', `${this.baseUrl}${endpoint}`);
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'API request failed');
        }

        return response.json();
    }
}
