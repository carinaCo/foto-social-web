import { Box } from "@mui/material";
import { useMemo } from "react";

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
        filter: 'blur(1.5px)',
        animation: 'float 18s linear infinite',
        willChange: 'transform, opacity',
        '@keyframes float': {
            '0%': { transform: 'translateY(0) rotate(0deg)', opacity: 0.2 },
            '50%': { transform: 'translateY(-100vh) rotate(180deg)', opacity: 0.5 },
            '100%': { transform: 'translateY(-200vh) rotate(360deg)', opacity: 0 }
        }
    }
};

const colors = [
    'rgba(255,255,255,0.28)', // Weiß nur einmal
    'rgba(173,216,230,0.28)', // Blau
    'rgba(173,216,230,0.28)',
    'rgba(144,238,144,0.28)', // Grün
    'rgba(144,238,144,0.28)',
    'rgba(255,182,193,0.28)', // Rosa
    'rgba(255,182,193,0.28)',
    'rgba(255,255,224,0.28)', // Gelb
    'rgba(255,255,224,0.28)'
];

const ParticleLayer = () => {
    const numParticles = 40;
    const particles = useMemo(() => (
        Array.from({ length: numParticles }, (_, i) => {
            const size = Math.random() * 20 + 12;
            const left = Math.random() * 100;
            const delay = Math.random() * 80;
            const duration = Math.random() * 48 + 48;
            const rotate = Math.random() * 360;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const blur = Math.random() > 0.7 ? 3 : 1.5;

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
                        animationDuration: `${duration}s`,
                        filter: `blur(${blur}px)`,
                        transform: `rotate(${rotate}deg)`,
                    }}
                >
                    <svg width={size} height={size} viewBox="0 0 32 32" style={{ width: '100%', height: '100%' }}>
                        <defs>
                            <linearGradient id={`grad${i}`} x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
                                <stop offset="100%" stopColor={color} stopOpacity="0.3" />
                            </linearGradient>
                        </defs>
                        <polygon
                            points="16,0 32,32 0,32"
                            fill={`url(#grad${i})`}
                            style={{
                                filter: 'drop-shadow(0 2px 8px rgba(255,255,255,0.12))',
                                mixBlendMode: 'screen',
                            }}
                        />
                    </svg>
                </Box>
            );
        })
    ), []);

    return <Box sx={particleStyles.particleContainer}>{particles}</Box>;
};

export default ParticleLayer;