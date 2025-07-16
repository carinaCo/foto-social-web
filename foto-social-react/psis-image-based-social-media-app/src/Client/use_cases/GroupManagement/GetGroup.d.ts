
export interface GetGroupConstructorParams {
    projectId: string;
}
 export interface GetGroupExecuteParams {
    groupId: string;
}
 export interface GroupMember {
    userId: string;
    role: string;
}
 export interface GroupData {
    name: string | null;
    createdAt: string; // Firestore-Timestamp (ISO)
     founderId: string | null;
     members: GroupMember[];
     groupId: string;
}
 export class GetGroup {
    constructor(params: GetGroupConstructorParams);
    execute(params: GetGroupExecuteParams): Promise<GroupData>;
}
