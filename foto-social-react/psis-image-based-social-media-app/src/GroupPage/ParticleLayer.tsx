import {Box} from "@mui/material";

const particleStyles = {
    particleContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
    },
    particle: {
        position: 'absolute',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'rgba(255, 155, 255, 0.2)',
        backdropFilter: 'blur(3px)',
        animation: 'float 12s linear infinite',
        '@keyframes float': {
            '0%': { transform: 'translateY(0)', opacity: 0.2 },
            '50%': { transform: 'translateY(-100vh)', opacity: 0.5 },
            '100%': { transform: 'translateY(-200vh)', opacity: 0 }
        }
    }
};


const ParticleLayer = () => {
    const numParticles = 30;
    const particles = Array.from({ length: numParticles }, (_, i) => {
        const size = Math.random() * 4 + 4; // 4px–8px
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 20 + 20;

        return (
            <Box
                key={i}
                sx={{
                    ...particleStyles.particle,
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${left}vw`,
                    bottom: '-10vh',
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`
                }}
            />
        );
    });

    return <Box sx={particleStyles.particleContainer}>{particles}</Box>;
};

export default ParticleLayer;
