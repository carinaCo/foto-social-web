//TODO: Selects a prompt and returns it -->
//checks if collection prompts exists for this group, if not --> create prompts collection
//check if prompts collection of this group has a prompt that was created after 12pm German Time
//If not, go to general random prompts collection and retrieve a random one
//if it does exist, return that prompt

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

const HARDCODED_FALLBACK_PROMPTS = [
  "Searching for a bug",
  "Final presentation mood",
  "Exam phase",
  "Coffee break",
  "Lunch break",
  "Weekend vibes",
  "Monday motivation",
  "Friday feeling",
  "Semester break",
  "Project deadline approaching",
  "Brainstorming session",
  "Searching for a bug",
  "Code review time",
  "Team meeting",
];

export class GetPrompt {
  constructor({ projectId }) {
    this.projectId = projectId;
  }


  async execute({ groupId }) {
    if (!groupId) {
      throw new Error('Missing required parameter: groupId');
    }

    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);
    const runQueryUrl = firestoreHelper.getRunQueryUrl();

    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const yesterdayEnd = new Date(todayStart);
    yesterdayEnd.setMilliseconds(-1);

    const formatTimestamp = date => ({
      timestampValue: date.toISOString(),
    });

    const queryPromptsInRange = async (start, end) => {
      const query = {
        structuredQuery: {
          from: [{ collectionId: 'Prompts', allDescendants: true }],
          where: {
            compositeFilter: {
              op: 'AND',
              filters: [
                {
                  fieldFilter: {
                    field: { fieldPath: 'groupId' },
                    op: 'EQUAL',
                    value: { stringValue: groupId },
                  },
                },
                {
                  fieldFilter: {
                    field: { fieldPath: 'createdAt' },
                    op: 'GREATER_THAN_OR_EQUAL',
                    value: formatTimestamp(start),
                  },
                },
                {
                  fieldFilter: {
                    field: { fieldPath: 'createdAt' },
                    op: 'LESS_THAN_OR_EQUAL',
                    value: formatTimestamp(end),
                  },
                },
              ],
            },
          },
          orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }],
          limit: 1,
        },
        parent: `projects/${this.projectId}/databases/(default)/documents`,
      };

      const result = await httpClient.post(runQueryUrl, query);
      return result.find(res => res.document) ?? null;
    };

    const getRandomFallbackPrompt = async () => {
      const fallbackQuery = {
        structuredQuery: {
          from: [{ collectionId: 'Prompts', allDescendants: true }],
          where: {
            fieldFilter: {
              field: { fieldPath: 'groupId' },
              op: 'EQUAL',
              value: { stringValue: groupId },
            },
          },
          limit: 10,
        },
        parent: `projects/${this.projectId}/databases/(default)/documents`,
      };

      const result = await httpClient.post(runQueryUrl, fallbackQuery);
      const validDocs = result.filter(res => res.document);
      if (!validDocs.length) return null;

      const randomDoc = validDocs[Math.floor(Math.random() * validDocs.length)];
      return randomDoc;
    };

    const getDeterministicFallbackPrompt = (groupId, date) => {
      const seedSource = `${date.toISOString().slice(0, 10)}-${groupId.replace(/[^0-9]/g, '').slice(-1)}`;
      let hash = 0;
      for (let i = 0; i < seedSource.length; i++) {
        const char = seedSource.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32-bit integer
      }
      const index = Math.abs(hash) % HARDCODED_FALLBACK_PROMPTS.length;
      return HARDCODED_FALLBACK_PROMPTS[index];
    };

    // 1️⃣ Get yesterday's prompt
    const yesterdayDoc = await queryPromptsInRange(yesterdayStart, yesterdayEnd);
    let previousDayPrompt;
    if (yesterdayDoc) {
      previousDayPrompt = {
        source: 'yesterday',
        prompt: yesterdayDoc.document.fields.promptText?.stringValue ?? '[missing promptText]',
      };
    } else {
      const fallbackPrompt = getDeterministicFallbackPrompt(groupId, todayStart);
      previousDayPrompt = {
        source: 'fallback',
        prompt: fallbackPrompt,
      };
    }

    // 2️⃣ Get today's prompt
    const todayDoc = await queryPromptsInRange(todayStart, now);
    let todayPrompt = null;
    if (todayDoc) {
      todayPrompt = {
        source: 'today',
        prompt: todayDoc.document.fields.promptText?.stringValue ?? '[missing promptText]',
      };
    }

    return {
      success: true,
      previousDayPrompt,
      todayPrompt,
    };
  }



}



