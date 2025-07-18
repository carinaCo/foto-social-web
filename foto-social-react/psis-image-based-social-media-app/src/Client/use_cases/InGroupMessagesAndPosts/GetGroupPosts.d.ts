export interface GetGroupPostsOptions {
    projectId: string;
}

export interface GetGroupPostsExecuteParams {
    groupId: string;
}

export interface GroupPost {
    postId: string | null;
    userId: string | null;
}

export interface GetGroupPostsResult {
    groupId: string;
    posts: GroupPost[];
}

export class GetGroupPosts {
    constructor(options: GetGroupPostsOptions);
    execute(params: GetGroupPostsExecuteParams): Promise<GetGroupPostsResult>;
}