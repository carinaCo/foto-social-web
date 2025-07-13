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
import {Link, useNavigate} from "react-router-dom";
import ParticleLayer from "../GroupPage/ParticleLayer.tsx";
import {isRegisterOrLoginDisabled, registerUser} from "./helpers/authenticationHelper.tsx";
import toast from 'react-hot-toast';
import {authStyles} from "./helpers/authenticationStyles.ts";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            const result = await registerUser(email, name, password);

            if (result?.success && result?.userId) {
                toast.success('Registrierung erfolgreich!');
                navigate('/login');
                toast.success('Du kannst dich nun einloggen.');
            } else {
                toast.error(result?.message || 'Registrierung fehlgeschlagen.');
            }
        } catch (error) {
            toast.error('Ein unerwarteter Fehler ist aufgetreten.');
            console.error('Ein unerwarteter Fehler ist aufgetreten.', error);
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
                    <Typography variant="h5">Register</Typography>
                    <Box sx={{ mt: 3 }}>
                        <TextField
                            name="name"
                            required
                            fullWidth
                            sx={{ mt: 1, mb: 1, backdropFilter: 'blur(5px) contrast(98%)' }}
                            id="name"
                            label="Name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            required
                            fullWidth
                            sx={{ mt: 1, mb: 1, backdropFilter: 'blur(5px) contrast(98%)'}}
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            required
                            fullWidth
                            sx={{ mt: 1, mb: 1, backdropFilter: 'blur(5px) contrast(98%)'}}
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
                            disabled={isRegisterOrLoginDisabled(email, password, name)}
                        >
                            Register
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid>
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