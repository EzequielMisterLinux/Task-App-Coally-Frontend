import axios from "axios";
import { HttpClient } from "../interfaces/api/httpClientInterface";




export class AxiosHttpClient implements HttpClient {
    private baseUri: string;
    private defaultConfig: Record<string, unknown>;

    constructor(baseUri: string, defaultConfig: Record<string, unknown>) {
        this.baseUri = baseUri;
        this.defaultConfig = defaultConfig;
    }

    private buildUrl(endpoint: string): string {
        return `${this.baseUri}/${endpoint}`;
    }

    async get<T>(url: string, config?: Record<string, unknown>): Promise<T> {
        const response = await axios.get<T>(this.buildUrl(url), { ...this.defaultConfig, ...config });
        return response.data;
    }

    async post<T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> {
        const response = await axios.post<T>(this.buildUrl(url), data, { ...this.defaultConfig, ...config });
        return response.data;
    }

    async put<T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> {
        const response = await axios.put<T>(this.buildUrl(url), data, { ...this.defaultConfig, ...config });
        return response.data;
    }

    async delete<T>(url: string, config?: Record<string, unknown>): Promise<T> {
        const response = await axios.delete<T>(this.buildUrl(url), { ...this.defaultConfig, ...config });
        return response.data;
    }

    async patch<T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> {
        const response = await axios.patch<T>(this.buildUrl(url), data, { ...this.defaultConfig, ...config });
        return response.data;
    }
}