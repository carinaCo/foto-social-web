// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { CreateGroup } from "../../Client/use_cases/GroupManagement/CreateGroup.js";

const PROJECT_ID = 'foto-social-web';
// TODO work in progress, hier können helper funktionen für die groupPage hin
export const handleCreateGroup = async (groupName: string, founderId: string, groupId: string) => {
    try {
        const createGroup = new CreateGroup({ projectId: PROJECT_ID });

        const result = await createGroup.execute({
            groupId: groupId,
            founderId: founderId,
            groupName: groupName
        });
        console.log('result in handleCreateGroup: ', result);

        if (result.success) {
            console.log('Gruppe erfolgreich erstellt!');
        }
    } catch (error) {
        console.error('Fehler beim Erstellen der Gruppe:', error);
    }
};