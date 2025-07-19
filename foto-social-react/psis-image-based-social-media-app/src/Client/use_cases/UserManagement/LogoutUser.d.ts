// logoutUser.d.ts

export interface LogoutUserOptions {
    projectId: string;
}

export interface LogoutUserExecuteParams {
    userId: string;
}

export interface LogoutUserSuccessResponse {
    success: true;
}

export interface LogoutUserFailureResponse {
    success: false;
    message: string;
}

export type LogoutUserResponse = LogoutUserSuccessResponse | LogoutUserFailureResponse;

export class LogoutUser {
    constructor(options: LogoutUserOptions);

    /**
     * Logs out the user by setting `isLoggedIn` to false in Firestore.
     *
     * @param params - The user ID to log out.
     * @returns An object indicating success or failure.
     */
    execute(params: LogoutUserExecuteParams): Promise<LogoutUserResponse>;
}
