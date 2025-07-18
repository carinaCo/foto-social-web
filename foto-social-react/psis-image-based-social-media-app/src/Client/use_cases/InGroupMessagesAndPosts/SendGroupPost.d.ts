export interface SendGroupPostOptions {
    projectId: string;
    databaseId?: string;
    storageBucket?: string;
}

export interface SendGroupPostExecuteParams {
    userId: string;
    groupId: string;
    postId: string;
    imageBase64: string;
}

export interface SendGroupPostResult {
    success: boolean;
    message: string;
    imageReference: string;
}

export class SendGroupPost {
    constructor(options: SendGroupPostOptions);
    execute(params: SendGroupPostExecuteParams): Promise<SendGroupPostResult>;
}