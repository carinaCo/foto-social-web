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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLoginUser = async (username: string, password: string) => {
        try {
            const result = await loginUser(username, password);
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
                            sx={{ backdropFilter: 'blur(5px) contrast(98%)', }}
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="User name"
                            name="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <TextField
                            sx={{ backdropFilter: 'blur(5px) contrast(98%)', }}
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
                                // await handleLoginUser('0a60fb39-d985-4543-8b3f-69aa79eb3839')
                                await handleLoginUser(username, password);
                            }}
                            disabled={isRegisterOrLoginDisabled(username, password)}
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