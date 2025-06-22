import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import ParticleLayer from "../MainPage/ParticleLayer.tsx";

const styles = {
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

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {};

    return (
        <>
            <ParticleLayer />
            <Container maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        mt: 20,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box sx={styles.lockWrapper}>
                        <Avatar sx={styles.lockIcon}>
                            <LockOutlined />
                        </Avatar>
                    </Box>
                    <Typography variant="h5">Register</Typography>
                    <Box sx={{ mt: 3 }}>
                        <TextField
                            name="name"
                            required
                            fullWidth
                            sx={{ mt: 1, mb: 1 }}
                            id="name"
                            label="Name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            required
                            fullWidth
                            sx={{ mt: 1, mb: 1 }}
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            required
                            fullWidth
                            sx={{ mt: 1, mb: 1 }}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login">Already have an account? Login</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Register;