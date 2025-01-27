export class AuthService {
    private static instance: AuthService | null = null;
    private token: string | null = null;

    private constructor(token: string) {
        this.token = token;
    }

    public static getInstance(token?: string): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService(token || "");
        }
        return AuthService.instance;
    }

    public getToken(): string | null {
        return this.token;
    }

    public setToken(newToken: string) {
        this.token = newToken;
    }
}

export const authService = AuthService.getInstance();


