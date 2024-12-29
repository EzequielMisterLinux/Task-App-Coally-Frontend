import { HttpClient } from "../../../interfaces/api/httpClientInterface";
import { Welcome } from "../../../interfaces/api/LoginInterface";

export class AuthService {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    async login(userData: Record<string, unknown>): Promise<Welcome> {
        try {
            const response = await this.httpClient.post<Welcome>("login", userData);
            return response;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`A problem occurred during login session: ${error.message}`);
            }
            throw new Error("An unknown error occurred during login session");
        }
    }
}

