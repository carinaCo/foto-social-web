export interface CreateGroupConstructorParams {
    projectId: string;
}

export interface ExecuteParams {
    groupId: string;
    founderId: string;
    groupName: string;
}

export interface ExecuteResult {
    success: boolean;
}

export declare class CreateGroup {
    constructor(params: CreateGroupConstructorParams);
    execute(params: ExecuteParams): Promise<ExecuteResult>;
}

