
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Avatar,
    Box,
    Button,
    Checkbox, Container,
    createTheme, CssBaseline,
    FormControlLabel, TextField,
    ThemeProvider, Typography, Link, Grid
} from "@mui/material";

import { LockOutlined } from "@mui/icons-material";
import { signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { FirebaseAuth } from "../config/firebase.config";
import * as Constant from "../util/constant";

const theme = createTheme();

export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(FirebaseAuth, email, password);
            const user = userCredential.user;
            navigate(`${Constant.ROUTE_HOME}/${user.uid}`);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            if( errorCode === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
                console.error( "Invalid login credentials" );
            }
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember"
                                color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href={Constant.ROUTE_SIGNUP} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}