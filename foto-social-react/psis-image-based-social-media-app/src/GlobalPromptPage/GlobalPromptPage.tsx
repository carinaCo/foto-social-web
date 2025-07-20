import * as React from 'react';
import {
    AppBar, Box, CssBaseline
} from "@mui/material";
import GlobalAppToolBar from "./GlobalAppToolBar.tsx";
import ChatPageContent from "../ChatPage/ChatPageContent.tsx";
import { fetchPostsWithUsernames} from "../ChatPage/helpers/chatHelper.tsx";
import {getPrompts} from "../GroupPage/helpers/groupHelper.tsx";

const globalGroupId = '3d33b9e1-2e9f-4007-81f8-366e2e20feff';
const activeUserId = '06aabba6-1002-4002-9840-2127decb9eea';

const GlobalPromptPage: React.FC = () => {

    const [postData, setPostData] = React.useState<
        { username: string | null; userId?: string | null | undefined; imageReference?: string | null | undefined; }[]
    >([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [prompt, setPrompt] = React.useState('')
    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const posts = await fetchPostsWithUsernames(globalGroupId, activeUserId);
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
                    activeUserId={activeUserId}
                />
            </Box>
        </>
    )
}

export default GlobalPromptPage;
