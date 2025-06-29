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
      return `${this.baseFirestoreUrl}/Users/${userId}/friends`;
    }
  
    getPendingFriendRequestsUrl(userId) {
      return `${this.baseFirestoreUrl}/Users/${userId}/pendingFriendRequests`;
    }
  
    getBlockedByUserListUrl(userId) {
      return `${this.baseFirestoreUrl}/Users/${userId}/blockedUsers`;
    }
  
    removeFriendUrl(userId, friendId) {
      return `${this.baseFirestoreUrl}/Users/${userId}/friends/${friendId}`;
    }
  
    blockUserUrl(userId, targetUserId) {
      return `${this.baseFirestoreUrl}/Users/${userId}/blockedUsers/${targetUserId}`;
    }
  
    sendFriendRequestUrl(senderId) {
      return `${this.baseFirestoreUrl}/Users/${senderId}/sentFriendRequests`;
    }
  
    findMatchingUsersUrl() {
      return `${this.baseFirestoreUrl}/Users:runQuery`;
    }
  
    getGroupUrl(groupId) {
      return `${this.baseFirestoreUrl}/Groups/${groupId}`;
    }

    getGroupUsersUrl(groupId) {
        return `${this.baseFirestoreUrl}/Groups/${groupId}/Users`;
      }
  
    getGroupPostsUrl(groupId) {
      return `${this.baseFirestoreUrl}/Groups/${groupId}/posts`;
    }
  
    getGroupMessagesUrl(groupId) {
      return `${this.baseFirestoreUrl}/Groups/${groupId}/messages`;
    }
  
    getGroupFeedUrl(groupId) {
      return `${this.baseFirestoreUrl}/Groups/${groupId}/feed`;
    }
  
    getGroupInvitesUrl(groupId) {
      return `${this.baseFirestoreUrl}/Groups/${groupId}/invites`;
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
      return `${this.baseFirestoreUrl}/Groups/${groupId}/invites/${inviteId}`;
    }

    sendGroupInviteUrl(groupId) {
      return `${this.baseFirestoreUrl}/Groups/${groupId}/invites`;
    }
    
    getUsersCollectionUrl() {
      return `${this.baseFirestoreUrl}/Users`;
    }    
    

}
  