import * as React from 'react';
import {
    CssBaseline
} from "@mui/material";
import AppToolBar from "./AppToolBar.tsx";
import BottomBeforeUpload from "./BottomBeforeUpload.tsx";
import ChatPageContent from './ChatPageContent.tsx';
import {fetchPostsWithUsernames} from './helpers/chatHelper.tsx';
import {useParams} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import toast from "react-hot-toast";

const ChatPage: React.FC = () => {
    const { id: groupId } = useParams<{ id: string; }>();
    const { userId } = useAuth();
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
                toast.error('Group ID is not defined');
                setPostData([]);
            }
        } catch {
            setPostData([]);
        } finally {
            setIsLoading(false);
        }
    };
    const hasSentPost = postData.some(post => post.userId === userId);

    React.useEffect(() => {
        void fetchPosts();
    }, [groupId]);

    return (
        <>
            <CssBaseline enableColorScheme />
            <AppToolBar/>
            <ChatPageContent
                postData={postData}
                isLoading={isLoading}
                activeUserId={userId}
                hasSentPost={hasSentPost}
            />
            <BottomBeforeUpload onPostSent={fetchPosts} />
        </>
    )
}

export default ChatPage;
