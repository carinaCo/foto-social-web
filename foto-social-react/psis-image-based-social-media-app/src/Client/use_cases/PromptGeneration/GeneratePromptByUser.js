/*Es sollte jeden Tag einen Prompt geben und eine Person, die für den nächsten Tag den Prompt setzt.

Zu dem aktuellen Prompt kann jeder in einem Zeitraum von 24h ein Bild hochladen. 
Nach 24h wird der nächste Prompt aktiv (Wurde von einer Person am vorherigen Tag gesetzt oder falls versäumt random aus einer Liste von hardcoded Prompts gezogen)
Außerdem wird einer neuen Person die Aufgabe des Prompterstellens zugewiesen. 

Wir müssten also im Backend die Prompts so speichern, dass wir wissen können, welcher der aktuelle ist.

Sachen die wir vermutlich im Frontend lösen können, sind festlegen wer dran ist mit dem Erstellen eines Prompts und
welcher Prompt gesetzt wird, wenn die Zuständige Person bis zum nächsten Tag keinen gesetzt hat.

Wegem dem Prüfen, ob der User schon etwas gesendet hat:
Bilder, die von anderen hochgeladen worden sind, sollten für eine Person nur einsehbar sein, wenn sie selbst dazu schon ein Bild hochgeladen hat.
*/

//Checks if collection prompts exists for this group, if not --> create prompts collection

import { FirestoreCommunicationHelper } from '../../../utils/firestoreCommunicationHelper.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { getFirestoreAccessToken } from '../../../utils/getFirestoreAccessToken.js';

export class GeneratePromptByUser {
  constructor({ projectId }) {
    this.projectId = projectId;
  }

  async execute({ groupId, promptText }) {
    if (!groupId) {
      throw new Error('Missing required parameter: groupId');
    }
  
    const accessToken = await getFirestoreAccessToken();
    const firestoreHelper = new FirestoreCommunicationHelper({ projectId: this.projectId });
    const httpClient = new HttpClient(accessToken);
  
    const promptsUrl = firestoreHelper.getGroupPromptsUrl(groupId);
  
    const promptDoc = {
      fields: {
        promptText: { stringValue: promptText },
        createdAt: { timestampValue: new Date().toISOString() },
        groupId: { stringValue: groupId }
      }
    };
  
    try {
      await httpClient.post(promptsUrl, promptDoc);
    } catch (err) {
      console.error('Failed to create prompt:', err);
      throw err;
    }
  
    return {
      success: true,
      message: `Prompt has successfully been created for group ${groupId}`
    };
  }
}
