export interface HasUserPostedInGroupTodayConstructorParams {
    projectId: string;
    databaseId?: string;
    storageBucket?: string;
}

export interface HasUserPostedInGroupTodayExecuteParams {
    userId: string;
    groupId: string;
}

export class HasUserPostedInGroupToday {
    constructor(params: HasUserPostedInGroupTodayConstructorParams);
    execute(params: HasUserPostedInGroupTodayExecuteParams): Promise<boolean>;
}