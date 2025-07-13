export interface AddFriendExecuteParams {
    userId: string;
    toAddUserId: string;
}

export interface AddFriendResult {
    success: boolean;
    message?: string;
    error?: string;
}

export class AddFriend {
    constructor(params: { projectId: string });
    execute(params: AddFriendExecuteParams): Promise<AddFriendResult>;
}