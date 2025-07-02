import {RegisterUser} from "./RegisterUser.js";
import {getFirestoreAccessToken} from "../../../utils/getFirestoreAccessToken.js";
import {LoginUser} from "./LoginUser.js";
import {FirestoreCommunicationHelper} from "../../../utils/firestoreCommunicationHelper.js";
import {HttpClient} from "../../../utils/httpClient.js";

const testRegisterUser = async () => {
    try {
        const projectId = 'foto-social-web';
        // const userId = randomUUID();
        const testUserId = 'Id_Mister_Frontend2'
        const email = 'diesdas@ananas.com'
        const username = 'Mister Frontend';
        const encryptedPassword = 'ananas_pw';

        const registerUser = new RegisterUser({ projectId});
        const result = await registerUser.execute({ userId, email, username, encryptedPassword });

        console.log('CreateGroup result:', result);
        console.log('User username:', username);
        console.log('User email:', email);
    } catch (error) {
        console.error('Error in testCreateGroup:', error);
    }
};

const testLoginUser = async () => {
    // const projectId = 'foto-social-web';
    // const userId = randomUUID();
    // const email = test-${userId}@example.com;
    // const username = testUser-${userId};
    // const encryptedPassword = 'dummyEncryptedPassword123';

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

// testRegisterUser();
// testLoginUser();