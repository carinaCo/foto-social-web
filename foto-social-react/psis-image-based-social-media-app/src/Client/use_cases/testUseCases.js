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
import fs from 'fs';

import { RegisterUser } from './UserManagement/RegisterUser.js';
import { LoginUser } from './UserManagement/LoginUser.js';
import { LogoutUser } from './UserManagement/LogoutUser.js';
import { getFirestoreAccessToken } from '../../utils/getFirestoreAccessToken.js';
import { FirestoreCommunicationHelper } from '../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../utils/httpClient.js';
import { AddUserToGroup } from './GroupManagement/AddUserToGroup.js';
import { AddFriend } from './FriendsAndBlockSystem/AddFriend.js';
import { SendFriendRequest } from './FriendsAndBlockSystem/SendFriendRequest.js';
import { RemoveUserFromGroup } from './GroupManagement/RemoveUserFromGroup.js';
import { RemoveFriend } from './FriendsAndBlockSystem/RemoveFriend.js';
import { GeneratePromptByUser } from './PromptGeneration/GeneratePromptByUser.js';
import { GetPrompt } from './PromptGeneration/GetPrompt.js';
import { SendGroupInvite } from './GroupManagement/SendGroupInvite.js';
import { SendGroupInvites } from './GroupManagement/SendGroupInvites.js';
import { SendGroupPost } from './InGroupMessagesAndPosts/SendGroupPost.js';

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
      const userId = '7c71b52c-5454-4e7e-9b0d-34ee3d681d4f';
  
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
      const groupId = '1e3dbd7f-5d17-49d8-8dae-092685e7f3ff';
  
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
  
      const result = await getGroupFeed.execute({ groupId });
  
      console.log('RESULT:', JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('ERROR:', error);
    }
  };

  const testGetGroupMessages = async () => {
    try {
      const projectId = 'foto-social-web';
      const groupId = '06281c9a-36c3-4087-8e24-eee6515bf9ee';
  
      const getGroupMessages = new GetGroupMessages({ projectId });
  
      const result = await getGroupMessages.execute({ groupId });
  
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
  try {
    const projectId = 'foto-social-web';
    const username = `TestUser DiesDas2`;
    const password = '1234';
    const userId = '4e9a82e2-3e9a-422b-b184-fac3594c27a7';
  
    const loginUser = new LoginUser({ projectId });
    const loggingIn = await loginUser.execute({ username, password });
    
    console.log(`User who has logged in [${userId}]:`, loggingIn);
    } catch (error) {
      console.error('Error in testLoginUser:', error);
    }
};

const testLogoutUser = async () => {
  const projectId = 'foto-social-web';
  const userId = '4e9a82e2-3e9a-422b-b184-fac3594c27a7';

  try {
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
    const email = 'newEmail@yahoo.com567782025'
    const username = 'usernameToTest25';
    const encryptedPassword = 'encryptedPassword202513'

    const registerUser = new RegisterUser({ projectId});
    const result = await registerUser.execute({ email, username, encryptedPassword });

    console.log('RegisterUser result:', result);
  } catch (error) {
    console.error('Error in testRegisterUser:', error);
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

const testAddFriend = async () => {
  try {
    const projectId = 'foto-social-web';
    const userId = '043d591f-d20d-4777-a154-661d75a447d0';
    const toAddUserId = 'cd697104-0205-443f-bda4-807ecba100a4';
    
    const addFriend = new AddFriend({ projectId});
    const result = await addFriend.execute({ userId, toAddUserId });

    console.log('result:', result);
  } catch (error) {
    console.error('Error in testAddFriend:', error);
  }
};

const testSendFriendRequest = async () => {
  try {
    const projectId = 'foto-social-web';
    const userId = '0a60fb39-d985-4543-8b3f-69aa79eb3839';
    const friendId = '57779e68-adff-42c1-8ca4-e70039828c55';
    
    const sendFriendRequest = new SendFriendRequest({ projectId});
    const result = await sendFriendRequest.execute({ userId, friendId });

    console.log('result:', result);
  } catch (error) {
    console.error('Error in testAddFriend:', error);
  }
};

const testRemoveUserFromGroup = async () => {
  try {
    const projectId = 'foto-social-web';
    const userId = '2f37950b-e32b-45fd-bc31-499dcda3efd4';
    const groupId = '06281c9a-36c3-4087-8e24-eee6515bf9ee';
    
    const removeUser = new RemoveUserFromGroup({ projectId});
    const result = await removeUser.execute({ userId, groupId });

    console.log('result:', result);
  } catch (error) {
    console.error('Error in testRemoveUserFromGroup:', error);
  }
};

const testRemoveFriend = async () => {
  try {
    const projectId = 'foto-social-web';
    const userId = '043d591f-d20d-4777-a154-661d75a447d0';
    const friendId = '2f37950b-e32b-45fd-bc31-499dcda3efd4';
    
    const removeFriend = new RemoveFriend({ projectId});
    const result = await removeFriend.execute({ userId, friendId });

    console.log('result:', result);
  } catch (error) {
    console.error('Error in testRemoveFriend:', error);
  }
};

const testGeneratePromptByUser = async () => {
  try {
    const projectId = 'foto-social-web';

    const groupId = '06281c9a-36c3-4087-8e24-eee6515bf9ee';
    const promptText = 'Summer';
    
    const generatePrompt = new GeneratePromptByUser({ projectId});
    const result = await generatePrompt.execute({ groupId, promptText });

    console.log('result:', result);
  } catch (error) {
    console.error('Error in testGeneratePromptByUser:', error);
  }
};

const testGetPrompt = async () => {
  try {
    const projectId = 'foto-social-web';
    const groupId = '06281c9a-36c3-4087-8e24-eee6515bf9ee';
    
    const getPrompt = new GetPrompt({ projectId});
    const result = await getPrompt.execute({ groupId });

    console.log('result:', result);
  } catch (error) {
    console.error('Error in testGetPrompt:', error);
  }
};

const testSendGroupInvite = async () => {
  try {
    const projectId = 'foto-social-web';
    const groupId = '0c61ae73-c32b-4821-b7d9-bf61a3d32ec4';
    const userId = '0a60fb39-d985-4543-8b3f-69aa79eb3839';
    
    const sendGroupInvite = new SendGroupInvite({ projectId});
    const result = await sendGroupInvite.execute({ userId, groupId });

    console.log('result:', result);
  } catch (error) {
    console.error('Error in testSendGroupInvite:', error);
  }
};

const testSendGroupInvites = async () => {
  try {
    const projectId = 'foto-social-web';
    const groupId = '0c61ae73-c32b-4821-b7d9-bf61a3d32ec4';
    
    const sendGroupInvites = new SendGroupInvites({ projectId});
    const result = await sendGroupInvites.execute({ groupId });

    console.log('result:', result);
  } catch (error) {
    console.error('Error in testSendGroupInvite:', error);
  }
};

/*const testSendGroupPost = async () => {
  try {
    const projectId = 'foto-social-web';
    const userId = '1c145387-58c1-49ab-8cf0-0eebe4346564';
    const groupId = '06281c9a-36c3-4087-8e24-eee6515bf9ee';
    const postId = randomUUID();
    
    const imageBase64 = fs.readFileSync('/Users/carinacocora/Downloads/foto-social-web/foto-social-react/psis-image-based-social-media-app/src/Client/use_cases/base64_encoded_image.txt', 'utf-8');

    const sendGroupPost = new SendGroupPost({ projectId});
    const result = await sendGroupPost.execute({ userId, groupId, postId, imageBase64 });

    console.log('result:', result);
  } catch (error) {
    console.error('Error in testSendGroupPost:', error);
  }
};*/

import path from 'path';

const testSendGroupPost = async () => {
  try {
    const projectId = 'foto-social-web';
    const userId = '1c145387-58c1-49ab-8cf0-0eebe4346564';
    const groupId = '0b9fa51c-43e7-4c50-bb06-dc1804df2d04';
    const postId = randomUUID();

    const imagePath = path.resolve('/Users/carinacocora/Downloads/foto-social-web/foto-social-react/psis-image-based-social-media-app/src/Client/use_cases/test_image.jpg');

    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString('base64');

    const sendGroupPost = new SendGroupPost({ projectId });
    const result = await sendGroupPost.execute({ userId, groupId, postId, imageBase64 });

    console.log('result:', result);
  } catch (error) {
    console.error('Error in testSendGroupPost:', error);
  }
};



//GET
//testGetGroup(); //TODO: FIX if logic still not ok - check first!
//testGetUserData();
//testGetFriends();
testGetPosts();
//testGetPendingFriendRequests();
//testGetGroupInvites();
//testGetGroupUserRights();
//testGetBlockedByUserList();
//testGetGroupMessages();
//testGetGroupFeed();

//functionality
//testLoginUser();
//testLogoutUser();
//testFindMatchingUsers();
//testSendGroupInvite();
//testSendGroupInvites(); //TODO: works but test again once more data!

//Create
//testCreateGroup();
//testRegisterUser();

//POST
//testSendFriendRequest();

//REMOVE
//testRemoveUserFromGroup();
//testRemoveFriend();
//testSendGroupPost();

//PATCH
//testBlockUser();
//testAddUserToGroup();
//testAddFriend();


//PromptLogic
//testGeneratePromptByUser();
//testGetPrompt(); //TODO: fix