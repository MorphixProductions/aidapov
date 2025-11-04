export declare function requestToken(ip: string, username: string, password: string): Promise<{
    valid: boolean;
    login?: undefined;
} | {
    valid: boolean;
    login: any;
}>;
