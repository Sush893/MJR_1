// Type declarations for authService.ts

export function getToken(): string | null;
export function setToken(token: string): void;
export function removeToken(): void;
export function getAuthHeader(): { Authorization?: string };
export function isAuthenticated(): boolean;
export function getUserFromToken(): any | null; 