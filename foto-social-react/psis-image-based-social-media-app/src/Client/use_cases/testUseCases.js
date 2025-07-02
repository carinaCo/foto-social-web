import { GetGroup } from './GroupManagement/GetGroup.js';
import { GetUserData } from './UserManagement/GetUserData.js';
import { GetFriends } from './FriendsAndBlockSystem/GetFriends.js';
import { GetGroupPosts } from './InGroupMessagesAndPosts/GetGroupPosts.js';
import { GetPendingFriendRequests } from './FriendsAndBlockSystem/GetPendingFriendRequests.js';
import { GetGroupFeed } from './InGroupMessagesAndPosts/GetGroupFeed.js';
import { GetGroupMessages } from './InGroupMessagesAndPosts/GetGroupMessages.js';
import { GetGroupInvites } from './GroupManagement/GetGroupInvites.js';
import { GetGroupUserRights } from './GroupManagement/GetGroupUserRights.js';
import { FindMatchingUsers } from './UserSearch/FindMatchingUsers.js';
import { GetBlockedByUserList } from './FriendsAndBlockSystem/GetBlockedByUserList.js';
import { BlockUser } from './FriendsAndBlockSystem/BlockUser.js';

import { CreateGroup } from './GroupManagement/CreateGroup.js';

import { randomUUID } from 'crypto';
import { RegisterUser } from './UserManagement/RegisterUser.js';
import { LoginUser } from './UserManagement/LoginUser.js';
import { LogoutUser } from './UserManagement/LogoutUser.js';
import { getFirestoreAccessToken } from '../../utils/getFirestoreAccessToken.js';
import { FirestoreCommunicationHelper } from '../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../utils/httpClient.js';
import { AddUserToGroup } from './GroupManagement/AddUserToGroup.js';

//GET Test Cases
const testGetGroup = async () => {
  try {
    const projectId = 'foto-social-web';
    const groupId = '06281c9a-36c3-4087-8e24-eee6515bf9ee';

    const getGroup = new GetGroup({ projectId });

    const result = await getGroup.execute({ groupId });

    console.log('RESULT:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('ERROR:', error);
  }
};

const testGetUserData = async () => {
    try {
      const projectId = 'foto-social-web';
      const userId = '2f37950b-e32b-45fd-bc31-499dcda3efd4';
  
      const getUserData = new GetUserData({ projectId });
  
      const result = await getUserData.execute({ userId });
  
      console.log('RESULT:', JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('ERROR:', error);
    }
  };

  const testGetFriends = async () => {
    try {
      const projectId = 'foto-social-web';
      const userId = '043d591f-d20d-4777-a154-661d75a447d0';
  
      const getFriends = new GetFriends({ projectId });
  
      const result = await getFriends.execute({ userId });
  
      console.log('RESULT:', JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('ERROR:', error);
    }
  };

  const testGetPosts = async () => {
    try {
      const projectId = 'foto-social-web';
      const groupId = '06281c9a-36c3-4087-8e24-eee6515bf9ee';
  
      const getPosts = new GetGroupPosts({ projectId });
  
      const result = await getPosts.execute({ groupId });
  
      console.log('RESULT:', JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('ERROR:', error);
    }
  };

  const testGetPendingFriendRequests = async () => {
    try {
      const projectId = 'foto-social-web';
      const userId = '2f37950b-e32b-45fd-bc31-499dcda3efd4';
  
      const getFriendRequests = new GetPendingFriendRequests({ projectId });
  
      const result = await getFriendRequests.execute({ userId });
  
      console.log('RESULT:', JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('ERROR:', error);
    }
  };

  const testGetGroupFeed = async () => {
    try {
      const projectId = 'foto-social-web';
      const groupId = '06281c9a-36c3-4087-8e24-eee6515bf9ee';
  
      const date = '2025-06-23';
      const getGroupFeed = new GetGroupFeed({ projectId });
  
      const result = await getGroupFeed.execute({ groupId, date });
  
      console.log('RESULT:', JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('ERROR:', error);
    }
  };

  const testGetGroupMessages = async () => {
    try {
      const projectId = 'foto-social-web';
      const groupId = '06281c9a-36c3-4087-8e24-eee6515bf9ee';
  
      const date = '2025-06-23';
      const getGroupMessages = new GetGroupMessages({ projectId });
  
      const result = await getGroupMessages.execute({ groupId, date });
  
      console.log('RESULT:', JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('ERROR:', error);
    }
  };

  const testGetGroupInvites = async () => {
    try {
      const projectId = 'foto-social-web';
      const groupId = '06281c9a-36c3-4087-8e24-eee6515bf9ee';
  
      const date = '2025-06-23';
      const getGroupInvites = new GetGroupInvites({ projectId });
  
      const result = await getGroupInvites.execute({ groupId });
  
      console.log('RESULT:', JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('ERROR:', error);
    }
  };

  const testGetGroupUserRights = async () => {
    try {
      const projectId = 'foto-social-web';
      const groupId = '06281c9a-36c3-4087-8e24-eee6515bf9ee';
      const userId = '1c145387-58c1-49ab-8cf0-0eebe4346564';
  
      const date = '2025-06-23';
      const getGroupUserRights = new GetGroupUserRights({ projectId });
  
      const result = await getGroupUserRights.execute({ groupId, userId });
  
      console.log('RESULT:', JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('ERROR:', error);
    }
  };

  const testFindMatchingUsers = async () => {
    try {
      const projectId = 'foto-social-web';
      const searchString = 'testUser'; 

      const getMatching = new FindMatchingUsers({ projectId });
  
      const result = await getMatching.execute({ searchString });
  
      console.log('RESULT:', JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('ERROR:', error);
    }
  };

  const testGetBlockedByUserList = async () => {
    try {
      const projectId = 'foto-social-web';
      const testUserId = '2f37950b-e32b-45fd-bc31-499dcda3efd4';

      const getBlockedBy = new GetBlockedByUserList({ projectId });
  
      const blockedByList = await getBlockedBy.execute({ userId: testUserId });
  
      console.log(`Users who have blocked user [${testUserId}]:`, blockedByList);
    } catch (error) {
      console.error('Error in testGetBlockedByUserList:', error);
    }
  };
  

/*
const test = async () => {
    try {
      let token =   await getFirestoreAccessToken();
  
      console.log('RESULT:', JSON.stringify(token));
    } catch (error) {
      console.error('ERROR:', error);
    }
  };
*/

const testLoginUser = async () => {
  const projectId = 'foto-social-web';
  const userId = randomUUID();
  const email = `test-${userId}@example.com`;
  const username = `testUser-${userId}`;
  const encryptedPassword = 'dummyEncryptedPassword123';

  try {
    const registerUser = new RegisterUser({ projectId });
    await registerUser.execute({ userId, email, username, encryptedPassword });
    console.log('User registered.');

    const loginUser = new LoginUser({ projectId });
    const result = await loginUser.execute({ userId });

    if (!result.success) {
      console.error('LoginUser failed:', result.message);
      return;
    }

    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId });
    const httpClient = new HttpClient(accessToken);
    const userDocUrl = firestoreHelper.getUserDoc(userId);
    const userDoc = await httpClient.get(userDocUrl);

    const isLoggedIn = userDoc.fields?.isLoggedIn?.booleanValue;
    console.log('Login status:', isLoggedIn);

    if (isLoggedIn === true) {
      console.log('testLoginUser passed.');
    } else {
      console.error('testLoginUser failed: isLoggedIn was not set to true.');
    }

  } catch (error) {
    console.error('Error in testLoginUser:', error);
  }
};

const testLogoutUser = async () => {
  const projectId = 'foto-social-web';
  const userId = randomUUID();

  const createUser = async () => {
    const { getFirestoreAccessToken } = await import('../../utils/getFirestoreAccessToken.js');
    const { FirestoreCommunicationHelper } = await import('../../utils/firestoreCommunicationHelper.js');
    const { HttpClient } = await import('../../utils/httpClient.js');

    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId });
    const httpClient = new HttpClient(accessToken);

    const userDocUrl = firestoreHelper.registerUserUrl();
    const userDocBody = {
      fields: {
        email: { stringValue: 'test@example.com' },
        username: { stringValue: 'testuser' },
        encrPassword: { stringValue: 'hashedPassword123' },
        isLoggedIn: { booleanValue: true },
        createdAt: { timestampValue: new Date().toISOString() }
      }
    };

    await httpClient.post(`${userDocUrl}?documentId=${userId}`, userDocBody);
  };

  try {
    console.log(`Creating user with ID: ${userId}`);
    await createUser();

    const logoutUser = new LogoutUser({ projectId });
    const result = await logoutUser.execute({ userId });

    console.log('LogoutUser result:', result);
    console.assert(result.success === true, 'Logout should succeed');
  } catch (err) {
    console.error('Error in testLogoutUser:', err);
  }
};

//POST Tests
const testCreateGroup = async () => {
  try {
    const projectId = 'foto-social-web'; 
    const founderId = '2f37950b-e32b-45fd-bc31-499dcda3efd4';
    const groupId = randomUUID();
    const groupName = 'Test Group';

    const createGroup = new CreateGroup({ projectId });
    const result = await createGroup.execute({ groupId, founderId, groupName });

    console.log('CreateGroup result:', result);
    console.log('Group ID:', groupId);
  } catch (error) {
    console.error('Error in testCreateGroup:', error);
  }
};

const testRegisterUser = async () => {
  try {
    const projectId = 'foto-social-web';
    const userId = randomUUID();
    const email = 'email@zahoo12.com'
    const username = 'Test User2512';
    const encryptedPassword = 'encryptedPassword202513'

    const registerUser = new RegisterUser({ projectId});
    const result = await registerUser.execute({ userId, email, username, encryptedPassword });

    console.log('CreateGroup result:', result);
    console.log('User ID:', userId);
  } catch (error) {
    console.error('Error in testCreateGroup:', error);
  }
};

const testBlockUser = async () => {
  try {
    const projectId = 'foto-social-web';
    const blockingUserId = '2f37950b-e32b-45fd-bc31-499dcda3efd4';
    const toBeBlockedUserId = '68df53c2-1156-4638-a76e-8c2c8bf9774a';
    
    const blockUser = new BlockUser({ projectId});
    const result = await blockUser.execute({ blockingUserId, toBeBlockedUserId });

    console.log('result:', result);
  } catch (error) {
    console.error('Error in testBlockUser:', error);
  }
};


const testAddUserToGroup = async () => {
  try {
    const projectId = 'foto-social-web';
    const userId = '2f37950b-e32b-45fd-bc31-499dcda3efd4';
    const groupId = '06281c9a-36c3-4087-8e24-eee6515bf9ee';
    
    const addUser = new AddUserToGroup({ projectId});
    const result = await addUser.execute({ userId, groupId });

    console.log('result:', result);
  } catch (error) {
    console.error('Error in testAddUserToGroup:', error);
  }
};


//GET
//testGetGroup(); //TODO: FIX!
//testGetUserData();
//testGetFriends(); //TODO: FIX!
//testGetPosts();
//testGetPendingFriendRequests();
//testGetGroupInvites();
//testGetGroupUserRights();
//testGetBlockedByUserList();

//testFindMatchingUsers(); //TODO: fix
//testGetGroupMessages(); //TODO: fix
//testGetGroupFeed(); //TODO: fix!

//functionality
//testLoginUser();
//testLogoutUser();

//Create
//testCreateGroup();
//testRegisterUser();

//DELETE

//PUT
//testBlockUser(); //TODO: debug!
//testAddUserToGroup();


//PromptLogic