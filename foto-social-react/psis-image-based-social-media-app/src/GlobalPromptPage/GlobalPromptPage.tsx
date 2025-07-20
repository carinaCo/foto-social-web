import * as React from 'react';
import {
    AppBar, Box, CssBaseline
} from "@mui/material";
import GlobalAppToolBar from "./GlobalAppToolBar.tsx";
import ChatPageContent from "../ChatPage/ChatPageContent.tsx";
import { fetchPostsWithUsernames} from "../ChatPage/helpers/chatHelper.tsx";
import {getPrompts} from "../GroupPage/helpers/groupHelper.tsx";
import {useAuth} from "../context/AuthContext.tsx";

const globalGroupId = '389b9f6a-ee55-4606-94ad-e26c2a970c84';

const GlobalPromptPage: React.FC = () => {
    const { userId } = useAuth();
    const [postData, setPostData] = React.useState<
        { username: string | null; userId?: string | null | undefined; imageReference?: string | null | undefined; }[]
    >([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [prompt, setPrompt] = React.useState('')
    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const posts = await fetchPostsWithUsernames(globalGroupId, userId);
            setPostData(posts);
        } catch {
            setPostData([]);
        } finally {
            setIsLoading(false);
        }
    };
    const fetchPrompt = async () => {
        setIsLoading(true);
        try {
            const prompt = await getPrompts(globalGroupId);
            setPrompt(prompt.previousDayPrompt.prompt);
        } catch{
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    React.useEffect(() => {
        void fetchPosts();
        void fetchPrompt();
    }, []);

    return (
        <>
            <CssBaseline enableColorScheme />
            <AppBar>
                <GlobalAppToolBar
                    prompt={prompt}
                />
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
        </>
    )
}

export default GlobalPromptPage;
