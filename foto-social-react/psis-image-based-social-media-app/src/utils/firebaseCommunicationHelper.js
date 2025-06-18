export class FirestoreCommunicationHelper {
    constructor({ projectId, databaseId = '(default)' }) {
      this.projectId = projectId;
      this.databaseId = databaseId;
    }
  
    get baseFirestoreUrl() {
      return `https://firestore.googleapis.com/v1/projects/${this.projectId}/databases/${this.databaseId}/documents`;
    }
  
    getUserDoc(userId) {
      return `${this.baseFirestoreUrl}/users/${userId}`;
    }
  
    registerUserUrl() {
      return `${this.baseFirestoreUrl}/users`;
    }
  
    getFriendsUrl(userId) {
      return `${this.baseFirestoreUrl}/users/${userId}/friends`;
    }
  
    getPendingFriendRequestsUrl(userId) {
      return `${this.baseFirestoreUrl}/users/${userId}/pendingFriendRequests`;
    }
  
    getBlockedByUserListUrl(userId) {
      return `${this.baseFirestoreUrl}/users/${userId}/blockedUsers`;
    }
  
    removeFriendUrl(userId, friendId) {
      return `${this.baseFirestoreUrl}/users/${userId}/friends/${friendId}`;
    }
  
    blockUserUrl(userId, targetUserId) {
      return `${this.baseFirestoreUrl}/users/${userId}/blockedUsers/${targetUserId}`;
    }
  
    sendFriendRequestUrl(senderId) {
      return `${this.baseFirestoreUrl}/users/${senderId}/sentFriendRequests`;
    }
  
    findMatchingUsersUrl() {
      return `${this.baseFirestoreUrl}/users:runQuery`;
    }
  
    getGroupUrl(groupId) {
      return `${this.baseFirestoreUrl}/groups/${groupId}`;
    }
  
    getGroupPostsUrl(groupId) {
      return `${this.baseFirestoreUrl}/groups/${groupId}/posts`;
    }
  
    getGroupMessagesUrl(groupId) {
      return `${this.baseFirestoreUrl}/groups/${groupId}/messages`;
    }
  
    getGroupFeedUrl(groupId) {
      return `${this.baseFirestoreUrl}/groups/${groupId}/feed`;
    }
  
    getGroupInvitesUrl(groupId) {
      return `${this.baseFirestoreUrl}/groups/${groupId}/invites`;
    }
  
    sendGroupInviteUrl(groupId) {
    }
}
  