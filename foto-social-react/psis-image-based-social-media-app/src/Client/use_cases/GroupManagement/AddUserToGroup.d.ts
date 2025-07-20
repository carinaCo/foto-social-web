// addUserToGroup.d.ts

export interface AddUserToGroupConstructorParams {
    projectId: string;
}

export interface AddUserToGroupExecuteParams {
    userId: string;
    groupId: string;
}

export interface AddUserToGroupExecuteResult {
    success: boolean;
    message?: string;
    error?: string;
}

export declare class AddUserToGroup {
    constructor(params: AddUserToGroupConstructorParams);
    execute(params: AddUserToGroupExecuteParams): Promise<AddUserToGroupExecuteResult>;
}