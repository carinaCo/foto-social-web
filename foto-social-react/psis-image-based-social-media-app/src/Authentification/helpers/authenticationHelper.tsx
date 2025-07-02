import { RegisterUser } from "../../Client/use_cases/UserManagement/RegisterUser";
import { LoginUser } from "../../Client/use_cases/UserManagement/LoginUser";

export const registerUser = async (
    email: string, username: string, encryptedPassword: string
) => {
    try {
        // const userId = crypto.randomUUID();
        const projectId = 'foto-social-web';
        const registerUser = new RegisterUser({ projectId });
        const result = await registerUser
            .execute({ email, username, encryptedPassword });

        console.log('registerUser result: ', result);
        console.log('Registered username: ', username);
        console.log('Registered email: ', email);
        // console.log('generated userId: ', userId);

        return result;
    } catch (error) {
        console.error('Error in testRegisterUser:', error);
        throw error;
    }
}

export const loginUser = async (userId: string) => {
    try {
        const projectId = 'foto-social-web';
        const loginUser = new LoginUser({ projectId });

        const result = await loginUser.execute({ userId });

        console.log('loginUser result:', result);
        console.log('Logged in userId:', userId);

        return result;
    } catch (error) {
        console.error('Error in loginUser:', error);
        throw error;
    }
};



export const isRegisterOrLoginDisabled = (email: string, pw: string, name?: string,): boolean => {
    if(name) {
        return [name, email, pw].some(registerField => registerField.trim() === '');
    }
    else {
        return [email, pw].some(registerField => registerField.trim() === '');
    }
};


