// Constructor params
export interface GeneratePromptByUserConstructorParams {
    projectId: string;
}

// Parameters for execute method
export interface GeneratePromptByUserExecuteParams {
    groupId: string;
    promptText: string;
}

// Response shape
export interface GeneratePromptByUserResult {
    success: boolean;
    message: string;
}

// Type-safe wrapper class
export class GeneratePromptByUser {
    private instance: any;

    constructor(params: GeneratePromptByUserConstructorParams) {
        const { GeneratePromptByUser } = require('./GeneratePromptByUser.js');
        this.instance = new GeneratePromptByUser(params);
    }

    execute(params: GeneratePromptByUserExecuteParams): Promise<GeneratePromptByUserResult> {
        return this.instance.execute(params);
    }
}
