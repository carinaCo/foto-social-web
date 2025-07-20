import * as React from 'react';
import {
    AppBar, Box, CssBaseline
} from "@mui/material";
import AppToolBar from "./AppToolBar.tsx";
import BottomBeforeUpload from "./BottomBeforeUpload.tsx";
import ChatPageContent from './ChatPageContent.tsx';
import {fetchImageReferencesForGroup, fetchPostsWithUsernames} from './helpers/chatHelper.tsx';
import { getUserData } from '../GroupPage/helpers/groupHelper.tsx';
import {useParams} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import toast from "react-hot-toast";

const ChatPage: React.FC = () => {
    const { id: groupId } = useParams<{ id: string; }>();
    const { userId, logout } = useAuth();
    //const activeUserId = '06aabba6-1002-4002-9840-2127decb9eea';

    const [postData, setPostData] = React.useState<
        { username: string | null; userId?: string | null | undefined; imageReference?: string | null | undefined; }[]
    >([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            if (groupId){
                const posts = await fetchPostsWithUsernames(groupId, userId);
                setPostData(posts);
            } else {
                console.error('Group ID is not defined');
                toast.error('Group ID is not defined');
                setPostData([]);
            }
        } catch {
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
                            activeUserId={userId}
                        />
            </Box>

            <BottomBeforeUpload onPostSent={fetchPosts} />

        </>
    )
}

export default ChatPage;
