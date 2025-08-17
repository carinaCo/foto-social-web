import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';
import {
    Avatar, Box,
    Dialog, IconButton
} from "@mui/material";
import Grid from "@mui/material/Grid";
import LoadingPlaceholder from "../ReuseableGenericComponents/LoadingPlaceholder.tsx";
import EmptyContentPlaceholder from "../ReuseableGenericComponents/EmptyContentPlaceholder.tsx";
import CloseIcon from '@mui/icons-material/Close';

interface ChatPageContentProps {
    postData: { username: string | null; userId?: string | null | undefined; imageReference?: string | null | undefined; }[];
    isLoading: boolean;
    activeUserId: string | null;
}

const styles = {
    gridItem: {
        position: 'relative',
        width: '100%',
        minWidth: 300,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 3,
        marginBottom: 4,
        px: 2,
        py: 1.5,
        transition: 'all 0.3s ease-in-out',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        '&:hover': {
            filter: 'brightness(1.2)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
            transform: {xs: 'scaleY(1.01)', md: 'scale(1.01)'}
        }
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        borderRadius: 3,
        // height: isSingleItem ? '180px' : null,
        overflow: 'visible',
        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(12px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.18)'
    }
};

const ChatPageContent: React.FC<ChatPageContentProps> = ({ postData, isLoading, activeUserId }) => {
    const [open, setOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

    const hasSentPost = postData.some(post => post.userId === activeUserId);

    const handleImageClick = (imgUrl: string) => {
        setSelectedImage(imgUrl);
        setOpen(true);
    };

    const handlePreviewClose = () => {
        setOpen(false);
        setSelectedImage(null);
    };

    const isSingleItem = postData && postData.length === 1;

    if (isLoading) {
        return <LoadingPlaceholder message={'Getting the posts beep boop...'} />;
    }
    // justifyContent={isSingleItem ? 'center' : 'flex-start'}
    return (
        <Box>
            {!postData || postData.length === 0 ? (
                <EmptyContentPlaceholder message={'Be the first to post something!'} />
            ) : (
                <Box>
                    <Grid container spacing={{xs: 0, md: 2}} sx={{ pt: '80px', paddingBottom: '72px', mx: -4}} justifyContent={isSingleItem ? 'center' : 'flex-start'}>
                        {postData.map((element, index) => (
                            <Grid
                                size={{xs: 12, md: 6, lg: 6}}
                                key={index}
                                sx={styles.gridItem}
                            >
                                <Box sx={{...styles.imageContainer, height: !isSingleItem ? '200px' : null, display: 'flex'}}>
                                    <Typography
                                        fontWeight="bold"
                                        sx={{
                                            position: 'absolute',
                                            bottom: -40,
                                            left: activeUserId === element.userId ? 'auto' : '0',
                                            right: activeUserId === element.userId ? 0 : 'auto',
                                            bgcolor: activeUserId === element.userId ? '#FF6B6B' : '#5A54D1',
                                            px: 2,
                                            py: 0.5,
                                            borderRadius: 2,
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                                            zIndex: 2,
                                            border: '1px solid rgba(255, 255, 255, 0.1)'
                                        }}
                                    >
                                        {element.username}
                                    </Typography>

                                    <Avatar
                                        sx={{
                                            position: 'absolute',
                                            top: -32,
                                            left: activeUserId === element.userId ? 'auto' : '0',
                                            right: activeUserId === element.userId ? 0 : 'auto',
                                            width: 56,
                                            height: 56,
                                            bgcolor: activeUserId === element.userId ? '#FF6B6B' : '#5A54D1',
                                            zIndex: 2,
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)'
                                        }}
                                    >
                                        {element.username?.charAt(0) ?? 'T'}
                                    </Avatar>

                                    {hasSentPost && element.imageReference ? (
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
                                        <LockIcon
                                            sx={{
                                                fontSize: 64,
                                                color: 'rgba(80,80,80,0.90)',
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                        />
                                    )}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            <Dialog
                open={open}
                onClose={handlePreviewClose}
                PaperProps={{
                    sx: {
                        background: 'transparent',
                        boxShadow: 'none',
                        overflow: 'visible',
                        p: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }
                }}
            >
                <Box sx={{
                    position: 'relative',
                    borderRadius: 24,
                    background: 'rgba(40,40,60,0.25)',
                    backdropFilter: 'blur(16px) saturate(180%)',
                    boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1,
                }}>
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
                                maxHeight: '80vh',
                                borderRadius: '24px',
                                boxShadow: '0 4px 24px rgba(0,0,0,0.28)',
                                background: 'rgba(255,255,255,0.08)',
                                backdropFilter: 'blur(2px)',
                                border: '1px solid rgba(255,255,255,0.18)'
                            }}
                        />
                    )}
                </Box>
            </Dialog>
        </Box>
    );
};

export default ChatPageContent;
