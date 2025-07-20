import * as React from 'react';
import {
    AppBar, Box, CssBaseline
} from "@mui/material";
import GlobalAppToolBar from "./GlobalAppToolBar.tsx";
import ChatPageContent from "../ChatPage/ChatPageContent.tsx";
import { fetchPostsWithUsernames} from "../ChatPage/helpers/chatHelper.tsx";

const globalGroupId = '389b9f6a-ee55-4606-94ad-e26c2a970c84';
const activeUserId = '06aabba6-1002-4002-9840-2127decb9eea';

const GlobalPromptPage: React.FC = () => {

    const [postData, setPostData] = React.useState<
        { username: string | null; userId?: string | null | undefined; imageReference?: string | null | undefined; }[]
    >([]);
    const [isLoading, setIsLoading] = React.useState(true);
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

    React.useEffect(() => {
        void fetchPosts();
    }, []);

    return (
        <>
            <CssBaseline enableColorScheme />
            <AppBar>
                <GlobalAppToolBar/>
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
