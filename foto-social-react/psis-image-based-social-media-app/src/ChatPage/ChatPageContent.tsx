import React from 'react';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';
import {
    Avatar, Box,
    Dialog, IconButton,
    List,
    ListItem,
} from "@mui/material";
import {fetchImageReferencesForGroup} from "./helpers/chatHelper.tsx";
import type {GroupPost} from "../Client/use_cases/InGroupMessagesAndPosts/GetGroupPosts";
import { useParams } from 'react-router-dom';
import LoadingPlaceholder from "../ReuseableGenericComponents/LoadingPlaceholder.tsx";
import EmptyContentPlaceholder from "../ReuseableGenericComponents/EmptyContentPlaceholder.tsx";
import {getUserData} from "../GroupPage/helpers/groupHelper.tsx";
import CloseIcon from '@mui/icons-material/Close';
import {useAuth} from "../context/AuthContext.tsx";


const ChatPageContent: React.FC = () => {
    const [posts, setPosts] = React.useState<GroupPost[]>([]);
    const [postData, setPostData] = React.useState<
        { username: string | null; userId?: string | null | undefined; imageReference?: string | null | undefined; }[]
    >([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
    const [hasSentPost, setHasSentPost] = React.useState(false);

    const { id: groupId } = useParams<{ id: string; }>();
    //const activeUserId = '06aabba6-1002-4002-9840-2127decb9eea';

    const { userId, logout } = useAuth();
    //const activeUserId = '092ce280-8d97-45bc-a1a9-cedf9a95ff47';

    React.useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                if (groupId) {
                    const imageRefs = await fetchImageReferencesForGroup(groupId);
                    // Hole für jeden userId den username
                    const postDataWithUsernames = await Promise.all(
                        imageRefs.map(async (imgRef) => {
                            let username = null;
                            if (imgRef?.userId) {
                                const userData = await getUserData(imgRef.userId);
                                username = userData?.username ?? null;
                                console.log('poster id: ', imgRef.userId, 'username: ', username);
                                if(imgRef.userId === userId) {
                                    setHasSentPost(true);
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
                    console.log('Fetched image references:', postDataWithUsernames);
                }
            } catch (error) {
                console.error('Error fetching image references:', error);
                setPostData([]);
                // sicherheitshalber mal
                setHasSentPost(false);
            } finally {
                setIsLoading(false);
            }
        };
        void fetchPosts();
    }, [groupId]);

    const handleImageClick = (imgUrl: string) => {
        setSelectedImage(imgUrl);
        setOpen(true);
    };

    const handlePreviewClose = () => {
        setOpen(false);
        setSelectedImage(null);
    };

    if (isLoading) {
        return (
            <LoadingPlaceholder message={'Getting the posts beep boop...'}/>
        );
    }

    return (
        <>
            {!postData || postData.length === 0 ?
                (
                    <EmptyContentPlaceholder message={'Be the first to post something!'}/>
                ) : (
            <Box sx={{
                height: "100%",
                width: "100%",
                overflowY: "auto"
            }}>
                <List sx={{ width: '100%', height: '100%', maxHeight: 1000, pt: 9}}>
                    {postData.map((
                        element, index) =>
                        (
                            <React.Fragment key={index}>
                                <ListItem alignItems="center" key={index} sx={{
                                    width: '100%',
                                    background: 'rgba(255, 255, 255, 0.05)', // transparenter Hintergrund
                                    backdropFilter: 'blur(10px) saturate(180%)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: 3,
                                    marginBottom: 3,
                                    px: 2,   // Innenabstand x
                                    py: 1.5,  // Innenabstand y
                                    transition: 'all 0.3s ease-in-out',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',


                                    '&:hover': {
                                        filter: 'brightness(1.1)', // leicht heller
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)', // sanfter Shadow
                                        transform: 'scale(1.01)', // minimal größer
                                    },
                                }}>
                                    <Box sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '180px',
                                        borderRadius: 3,
                                        overflow: 'visible',
                                        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
                                        background: 'rgba(255,255,255,0.12)',
                                        backdropFilter: 'blur(12px) saturate(180%)',
                                        border: '1px solid rgba(255,255,255,0.18)'
                                    }}>
                                        {/* Username über dem Container */}
                                        <Typography
                                            fontWeight="bold"
                                            sx={{
                                                position: 'absolute',
                                                bottom: -40,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                bgcolor: '#5A54D1',
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: 2,
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                                                zIndex: 2
                                            }}
                                        >
                                            {element.username}
                                        </Typography>
                                        {/* Avatar über dem Bild */}
                                        <Avatar
                                            sx={{
                                                position: 'absolute',
                                                top: -32,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                width: 56,
                                                height: 56,
                                                bgcolor: '#FF6B6B',
                                                zIndex: 2,
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.18)'
                                            }}
                                        >
                                            {element.username?.charAt(0) ?? 'T'}
                                        </Avatar>
                                        {/* Bild */}
                                        {hasSentPost && element.imageReference? (
                                            <img
                                                src={element.imageReference}
                                                alt="User post"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: 'inherit',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => handleImageClick(element.imageReference ?? '')}
                                            />
                                        ) : (
                                            <LockIcon sx={{ fontSize: 64, color: 'rgba(80,80,80,0.90)', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                                        )}
                                    </Box>
                                </ListItem>
                                <Dialog
                                    open={open}
                                    onClose={handlePreviewClose}
                                    PaperProps={{
                                        sx: {
                                            background: 'rgba(40,40,60,0.25)',
                                            backdropFilter: 'blur(16px) saturate(180%)',
                                            borderRadius: 4,
                                            boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
                                            overflow: 'visible',
                                            p: 0, // Kein Padding
                                            display: 'inline-block', // Nur so groß wie nötig
                                        }
                                    }}
                                >
                                    <Box sx={{ position: 'relative', borderRadius: 4 }}>
                                        <IconButton
                                            onClick={handlePreviewClose}
                                            sx={{
                                                position: 'absolute',
                                                left: '50%',
                                                top: '100%',
                                                transform: 'translate(-50%, 16px)',
                                                color: 'white',
                                                zIndex: 2,
                                                background: 'rgba(0,0,0,0.28)',
                                                backdropFilter: 'blur(4px)',
                                                '&:hover': { background: 'rgba(80,80,80,0.38)' }
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                        {selectedImage && (
                                            <img
                                                src={selectedImage}
                                                alt="Full view"
                                                style={{
                                                    display: 'block',
                                                    maxWidth: '90vw',
                                                    maxHeight: '90vh',
                                                    borderRadius: '16px',
                                                    boxShadow: '0 4px 24px rgba(0,0,0,0.28)',
                                                    background: 'rgba(255,255,255,0.08)',
                                                    backdropFilter: 'blur(2px)',
                                                    border: '1px solid rgba(255,255,255,0.18)'
                                                }}
                                            />
                                        )}
                                    </Box>
                                </Dialog>
                            </React.Fragment>
                        ))
                    }
                </List>
            </Box>
                )
            }
        </>
    );
};

export default ChatPageContent;
