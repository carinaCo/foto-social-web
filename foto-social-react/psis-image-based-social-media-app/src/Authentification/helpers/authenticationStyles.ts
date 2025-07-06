export const authStyles = {
    lockWrapper: {
        animation: 'bounceGlow 2.5s infinite',
        '@keyframes bounceGlow': {
            '0%, 100%': {
                transform: 'translateY(0)'
            },
            '50%': {
                transform: 'translateY(-6px)'
            }
        }
    },
    lockIcon: {
        m: 1,
        bgcolor: "primary.light",
        animation: 'flashGlow 6s infinite',
        boxShadow: '0 0 8px rgba(108, 100, 225, 0.4)',
        '@keyframes flashGlow': {
            '0%, 95%, 100%': {
                filter: 'brightness(1)',
                transform: 'scale(1) rotate(0deg)',
            },
            '96%': {
                filter: 'brightness(1.6)',
                transform: 'scale(1.1) rotate(-10deg)',
            },
            '97%': {
                filter: 'brightness(2)',
                transform: 'scale(1.2) rotate(10deg)',
            },
            '98%': {
                filter: 'brightness(1.6)',
                transform: 'scale(1.1) rotate(-5deg)',
            },
            '99%': {
                filter: 'brightness(1.2)',
                transform: 'scale(1.05) rotate(0deg)',
            },
        }

    }
};