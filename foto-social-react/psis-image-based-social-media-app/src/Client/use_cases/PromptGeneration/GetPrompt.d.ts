// getPrompt.d.ts

export interface GetPromptOptions {
    projectId: string;
}

export interface ExecuteOptions {
    groupId: string;
}

export interface PromptResult {
    success: boolean;
    previousDayPrompt: {
        source: 'yesterday' | 'fallback';
        prompt: string;
    };
    todayPrompt: {
        source: 'today';
        prompt: string;
    } | null;
}

export class GetPrompt {
    constructor(options: GetPromptOptions);

    /**
     * Executes the logic to fetch the most recent prompts for a group.
     *
     * @param options.groupId - The group identifier to query prompts for.
     * @returns A promise resolving to the result containing previous and current day prompts.
     */
    execute(options: ExecuteOptions): Promise<PromptResult>;
}
