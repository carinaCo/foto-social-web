  export class FirestoreCommunicationHelper {
    constructor({ projectId, databaseId = '(default)' }) {
      this.projectId = projectId;
      this.databaseId = databaseId;
    }

    get baseFirestoreUrl() {
      return `https://firestore.googleapis.com/v1/projects/${this.projectId}/databases/${this.databaseId}/documents`;
    }

    getUserDoc(userId) {
      return `${this.baseFirestoreUrl}/Users/${userId}`;
    }

    registerUserUrl() {
      return `${this.baseFirestoreUrl}/Users`;
    }

    getFriendsUrl(userId) {
      return `${this.baseFirestoreUrl}/Users/${userId}/Friends`;
    }

    getPendingFriendRequestsUrl(userId) {
      return `${this.baseFirestoreUrl}/Users/${userId}/PendingFriendRequests`;
    }

    getBlockedByUserListUrl(userId) {
      return `${this.baseFirestoreUrl}/Users/${userId}/BlockedUsers`;
    }

    removeFriendUrl(userId, friendId) {
      return `${this.baseFirestoreUrl}/Users/${userId}/Friends/${friendId}`;
    }

    blockUserUrl(userId, targetUserId) {
      return `${this.baseFirestoreUrl}/Users/${userId}/BlockedUsers/${targetUserId}`;
    }

    sendFriendRequestUrl(senderId) {
      return `${this.baseFirestoreUrl}/Users/${senderId}/SentFriendRequests`;
    }

    findMatchingUsersUrl() {
      return `${this.baseFirestoreUrl}:runQuery`;
    }

    getGroupUrl(groupId) {
      return `${this.baseFirestoreUrl}/Groups/${groupId}`;
    }

    getGroupUsersUrl(groupId) {
        return `${this.baseFirestoreUrl}/Groups/${groupId}/Users`;
      }

    getGroupUserDocUrl(groupId, userId) {
        return `${this.baseFirestoreUrl}/Groups/${groupId}/Users/${userId}`;
      }
      
    getGroupPostsUrl(groupId) {
      return `${this.baseFirestoreUrl}/Groups/${groupId}/Posts`;
    }

    getGroupMessagesUrl(groupId) {
      return `${this.baseFirestoreUrl}/Groups/${groupId}/Messages`;
    }

    getGroupFeedUrl(groupId) {
      return `${this.baseFirestoreUrl}/Groups/${groupId}/Feed`;
    }

    getGroupInvitesUrl(groupId) {
      return `${this.baseFirestoreUrl}/Groups/${groupId}/Invites`;
    }

    sendGroupInviteUrl(groupId) {
    }

    getUserFriendsUrl(userId) {
      return this.getFriendsUrl(userId);
    }

    getGroupMemberUrl(groupId, userId) {
      return `${this.baseFirestoreUrl}/Groups/${groupId}/Users/${userId}`;
    }

    getGroupInviteUrl(groupId, inviteId) {
      return `${this.baseFirestoreUrl}/Groups/${groupId}/Invites/${inviteId}`;
    }

    sendGroupInviteUrl(groupId) {
      return `${this.baseFirestoreUrl}/Groups/${groupId}/Invites`;
    }
    
    getUsersCollectionUrl() {
      return `${this.baseFirestoreUrl}/Users`;
    }    

    getGroupsUrl() {
      return `${this.baseFirestoreUrl}/Groups`;
    }

    getMessageRef(groupId, messageId) {
      return `${this.baseFirestoreUrl}/Groups/${groupId}/Messages/${messageId}`;
    }

    getRunQueryUrl() {
      return `https://firestore.googleapis.com/v1/projects/${this.projectId}/databases/(default)/documents:runQuery`;
    }

    getGroupPromptsUrl(groupId) {
      return `${this.baseFirestoreUrl}/Groups/${groupId}/Prompts`;
    }
    
    
  }
  