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
import {Link, useNavigate} from "react-router-dom";
import ParticleLayer from "../GroupPage/ParticleLayer.tsx";
import {isRegisterOrLoginDisabled, loginUser} from "./helpers/authenticationHelper.tsx";
import toast from "react-hot-toast";
import {authStyles} from "./helpers/authenticationStyles.ts";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLoginUser = async (userId: string) => {
        try {
            const result = await loginUser(userId);
            if (result.success) {
                toast.success('Login erfolgreich!');
                navigate('/groups');
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
                    <Box sx={authStyles.lockWrapper}>
                        <Avatar sx={authStyles.lockIcon}>
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
                                await handleLoginUser('0a60fb39-d985-4543-8b3f-69aa79eb3839')
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