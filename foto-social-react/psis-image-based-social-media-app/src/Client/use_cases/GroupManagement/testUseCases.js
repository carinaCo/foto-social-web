import { GetGroup } from './GetGroup.js';
import { GetUserData } from '../UserManagement/GetUserData.js';
import { GetFriends } from '../FriendsAndBlockSystem/GetFriends.js';
import { GetGroupPosts } from '../InGroupMessagesAndPosts/GetGroupPosts.js';


const testGroup = async () => {
  try {
    const projectId = 'foto-social-web';
    const groupId = '6d041607-4ee5-4c35-9114-a49dd1fc0e1e';

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
      // const userId = '2f37950b-e32b-45fd-bc31-499dcda3efd4';
      const userId = '0a60fb39-d985-4543-8b3f-69aa79eb3839'; // 'neuer user 1'

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
      const userId = '2f37950b-e32b-45fd-bc31-499dcda3efd4';

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

testGroup();
// testGetUserData();
//testGetFriends();
//testGetPosts();