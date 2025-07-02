export interface LoginUserOptions {
    projectId: string;
}

export interface ExecuteParams {
    userId: string;
}

export interface ExecuteResult {
    success: boolean;
}

export class LoginUser {
    constructor(options: LoginUserOptions);

    execute(params: ExecuteParams): Promise<ExecuteResult>;
}
