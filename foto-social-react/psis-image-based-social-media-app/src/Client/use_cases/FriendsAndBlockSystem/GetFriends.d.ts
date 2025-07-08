export interface GetFriendsResult {
    success: true;
    userId: string;
    friends: string[];
}

export interface GetFriendsError {
    success: false;
    error: string;
}

export class GetFriends {
    constructor(params: { projectId: string });
    execute(params: { userId: string }): Promise<GetFriendsResult | GetFriendsError>;
}