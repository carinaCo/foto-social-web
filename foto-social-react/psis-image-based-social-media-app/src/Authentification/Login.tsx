import { LockOutlined } from "@mui/icons-material";
import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Grid,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import ParticleLayer from "../GroupPage/ParticleLayer.tsx";
import {isRegisterOrLoginDisabled, loginUser} from "./helpers/authenticationHelper.tsx";
import toast from "react-hot-toast";

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

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginUser = async (userId: string) => {
        try {
            const result = await loginUser(userId);
            if (result.success) {
                toast.success('Login erfolgreich!');
            } else {
                toast.error('Login fehlgeschlagen.');
            }
            console.log('login result: ', result);
        } catch (error) {
            toast.error('Ein unerwarteter Fehler ist aufgetreten lmao.');
            console.error('Error in LoginUser: ', error);
            throw error;
        }
    };

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
                    <Typography variant="h5">Login</Typography>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={ async () => {
                                await handleLoginUser('7c71b52c-5454-4e7e-9b0d-34ee3d681d4f')
                            }}
                            disabled={isRegisterOrLoginDisabled(email, password)}
                        >
                            Login
                        </Button>
                        <Grid container justifyContent={"flex-end"}>
                            <Grid>
                                <Link to="/register">Don't have an account? Register</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Login;