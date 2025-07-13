export interface LoginUserOptions {
    projectId: string;
}

export interface ExecuteParams {
    username: string;
    password: string;
}

export interface ExecuteResult {
    success: boolean;
    userId: string;
}

export class LoginUser {
    constructor(options: LoginUserOptions);

    execute(params: ExecuteParams): Promise<ExecuteResult>;
}
