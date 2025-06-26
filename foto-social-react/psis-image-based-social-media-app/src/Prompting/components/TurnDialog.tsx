import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Slide,
    Box
} from "@mui/material";
import type {TransitionProps} from "@mui/material/transitions";

// Transition effect for the dialog
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface TurnDialogProps {
    open: boolean;
    onClose: () => void;
    groupName: string;
}

const TurnDialog: React.FC<TurnDialogProps> = ({ open, onClose, groupName }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-describedby="user-turn-dialog-description"
            PaperProps={{
                sx: {
                    width: "100%",
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(15px) saturate(200%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 4,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    color: '#fff',
                    p: 2
                }
            }}
        >
            <DialogTitle sx={{mx: 'auto'}}>{"Your Turn Today!"}</DialogTitle>
            <DialogContent sx={{mx: 'auto'}}>
                <Box id="user-turn-dialog-description">
                    {`Your friends in ${groupName} need a prompt!`}
                </Box>
            </DialogContent>
            <DialogActions>
                    <Button
                        onClick={onClose}
                        sx={{
                            color: '#fff',
                            borderColor: '#fff',
                            backgroundColor: '#5A54D1',
                            boxShadow: '0 4px 12px #6C64E1',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.1)'
                            }
                        }}
                        variant="outlined"
                    >
                        Lesgooo!
                    </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TurnDialog;