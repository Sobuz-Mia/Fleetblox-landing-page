export interface AxiosErrorResponse {
  code: string;
  config: {
    transitional?: Record<string, unknown>;
    adapter?: unknown[];
    transformRequest?: unknown[];
    transformResponse?: unknown[];
    timeout?: number;
    // Add other properties as needed
  };
  message: string;
  name: string;
  request?: XMLHttpRequest;
  response?: {
    config: {
      transitional?: Record<string, unknown>;
      adapter?: unknown[];
      transformRequest?: unknown[];
      transformResponse?: unknown[];
      timeout?: number;
      // Add other properties as needed
    };
    data: {
      error: {
        message: string;
        stack: string;
      };
      statusCode: number;
      success: boolean;
    };
    headers: {
      [key: string]: string;
    };
    request?: XMLHttpRequest;
    status: number;
    statusText: string;
  };
  stack: string;
}
