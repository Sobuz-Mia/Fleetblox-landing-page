/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from './config';

/**
 * API client for making requests to the backend
 */
export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl?: string) {
        this.baseUrl = baseUrl || config.api.baseUrl;
    }

    /**
     * Makes a GET request to the API
     * @param endpoint - The API endpoint to call
     * @param options - Additional fetch options
     * @returns Promise with the response data
     */
    async get<T>(endpoint: string, options = {}): Promise<T> {
        const url = this.buildUrl(endpoint);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        });

        return this.handleResponse<T>(response);
    }

    /**
     * Makes a POST request to the API
     * @param endpoint - The API endpoint to call
     * @param data - The data to send in the request body
     * @param options - Additional fetch options
     * @returns Promise with the response data
     */
    async post<T>(endpoint: string, data: any, options = {}): Promise<T> {
        const url = this.buildUrl(endpoint);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            ...options,
        });

        return this.handleResponse<T>(response);
    }

    /**
     * Makes a PUT request to the API
     * @param endpoint - The API endpoint to call
     * @param data - The data to send in the request body
     * @param options - Additional fetch options
     * @returns Promise with the response data
     */
    async put<T>(endpoint: string, data: any, options = {}): Promise<T> {
        const url = this.buildUrl(endpoint);
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            ...options,
        });

        return this.handleResponse<T>(response);
    }

    /**
     * Makes a DELETE request to the API
     * @param endpoint - The API endpoint to call
     * @param options - Additional fetch options
     * @returns Promise with the response data
     */
    async delete<T>(endpoint: string, options = {}): Promise<T> {
        const url = this.buildUrl(endpoint);
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        });

        return this.handleResponse<T>(response);
    }

    /**
     * Builds a full URL by combining the base URL with the endpoint
     * @param endpoint - The API endpoint
     * @returns The full URL
     */
    private buildUrl(endpoint: string): string {
        // Make sure the endpoint doesn't start with a slash when combining
        const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
        // Make sure the baseUrl ends with a slash
        const normalizedBaseUrl = this.baseUrl.endsWith('/') ? this.baseUrl : `${this.baseUrl}/`;

        return `${normalizedBaseUrl}${normalizedEndpoint}`;
    }

    /**
     * Handles the API response and error cases
     * @param response - The fetch response
     * @returns The parsed response data
     */
    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const error = await response.json().catch(() => ({
                message: 'An unknown error occurred',
            }));

            throw new Error(error.message || `API error: ${response.status}`);
        }

        // Handle empty responses (like for DELETE operations)
        if (response.status === 204) {
            return {} as T;
        }

        return await response.json() as T;
    }
}

// Create and export a singleton instance for use throughout the app
export const api = new ApiClient();

export default api;
