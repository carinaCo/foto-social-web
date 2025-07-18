import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';

export interface GetUserDataConstructorParams {
    projectId: string;
}

export interface GetUserGroupsParams {
    userId: string;
    firestoreHelper: FirestoreCommunicationHelper;
    httpClient: HttpClient;
}

export interface ExecuteParams {
    userId: string;
}

export interface UserDataResult {
    userId: string;
    username: string | null;
    friends?: string[];
    blockedUsers?: string[];
    groupId?: string[];
}

export class GetUserData {
    constructor(params: GetUserDataConstructorParams);

    getUserGroups(params: GetUserGroupsParams): Promise<string[]>;

    execute(params: ExecuteParams): Promise<UserDataResult>;
}
