// src/utils/GetPrompt.ts


// Constructor parameters
export interface GetPromptConstructorParams {
    projectId: string;
}

// Execution parameters
export interface GetPromptExecuteParams {
    groupId: string;
}

// Response format
export interface GetPromptResult {
    success: boolean;
    source: 'group (recent)' | 'group (random)';
    prompt: string;
}

// Typed wrapper class
export class GetPrompt {
    private instance: any;

    constructor(params: GetPromptConstructorParams) {
        const { GetPrompt } = require('./GetPrompt.js');
        this.instance = new GetPrompt(params);
    }

    execute(params: GetPromptExecuteParams): Promise<GetPromptResult> {
        return this.instance.execute(params);
    }
}
