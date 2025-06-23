import { GetGroup } from './GetGroup.js';
import { GetUserData } from '../UserManagement/GetUserData.js';


const testGroup = async () => {
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
testGetUserData();
