import * as React from 'react';
import {
    AppBar, Box, CssBaseline
} from "@mui/material";
import AppToolBar from "./AppToolBar.tsx";
import BottomBeforeUpload from "./BottomBeforeUpload.tsx";
import ChatPageContent from './ChatPageContent.tsx';
import { fetchImageReferencesForGroup } from './helpers/chatHelper.tsx';
import { getUserData } from '../GroupPage/helpers/groupHelper.tsx';
import {useParams} from "react-router-dom";

const ChatPage: React.FC = () => {
    const { id: groupId } = useParams<{ id: string; }>();
    const activeUserId = '06aabba6-1002-4002-9840-2127decb9eea';

    const [postData, setPostData] = React.useState<
        { username: string | null; userId?: string | null | undefined; imageReference?: string | null | undefined; }[]
    >([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            if (groupId) {
                const imageRefs = await fetchImageReferencesForGroup(groupId);
                const postDataWithUsernames = await Promise.all(
                    imageRefs.map(async (imgRef) => {
                        let username = null;
                        if (imgRef?.userId) {
                            const userData = await getUserData(imgRef.userId);
                            username = userData?.username ?? null;
                            if(imgRef.userId === activeUserId) {
                                username = 'You';
                            }
                        }
                        return {
                            ...imgRef,
                            username,
                        };
                    })
                );
                setPostData(postDataWithUsernames);
            }
        } catch (error) {
            setPostData([]);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        void fetchPosts();
    }, [groupId]);

    return (
        <>
            <CssBaseline enableColorScheme />
                    <AppBar>
                        <AppToolBar/>
                    </AppBar>
            
                    <Box sx={{marginLeft: '-32px',
                             marginRight: '-32px',
                            //  paddingLeft: '16px',
                            //  paddingRight: '16px',
                                width: '95vw',
                             boxSizing: 'border-box',
                             }} >
                        <ChatPageContent
                            postData={postData}
                            isLoading={isLoading}
                            activeUserId={activeUserId}
                        />
            </Box>

            <BottomBeforeUpload onPostSent={fetchPosts} />

        </>
    )
}

export default ChatPage;
