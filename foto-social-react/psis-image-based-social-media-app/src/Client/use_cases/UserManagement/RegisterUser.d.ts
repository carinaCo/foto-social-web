export interface RegisterUserOptions {
    projectId: string;
}

export interface RegisterUserInput {
    userId: string;
    email: string;
    username: string;
    encryptedPassword: string;
}

export declare class RegisterUser {
    constructor(options: RegisterUserOptions);
    execute(input: RegisterUserInput): Promise<{ success: boolean; message?: string }>;
}
