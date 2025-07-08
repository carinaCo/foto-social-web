export const groupPageStyles = {
    drawerPaper: {
        height: '95vh',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        bgcolor: 'rgba(36,17,86,0.2)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(6px)',
        color: '#fff',
        px: 3,
        py: 2
    },
    continueButton: {
        position: 'absolute',
        top: 12,
        right: 8,
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1,
        py: 0.5,
        borderRadius: 1,
        fontWeight: 500,
        fontSize: '0.95rem'
    },
    newGroupButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        px: 2,
        py: 1.5,
        borderRadius: 1,
        '&:hover': {
            backgroundColor: 'action.hover',
        }
    },
    newContactButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        px: 2,
        py: 1.5,
        borderRadius: 1,
        '&:hover': {
            backgroundColor: 'action.hover',
        }
    },
    contactSummary: {
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        py: 1,
        px: 2,
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        mb: 1,
    },
    addGroupButton: {
        mt: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 'auto',
        px: 4,
        py: 1.6,
        borderRadius: '12px',
        fontSize: '1rem',
        textTransform: 'none',
        backdropFilter: 'blur(14px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        transition: 'all 0.2s ease-in-out',
    }
};