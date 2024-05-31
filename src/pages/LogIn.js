import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import loginUser from '../services/userServices';

export const LogIn = ( {setToken}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await loginUser(email, password);
          const { body } = response;
          if (body.success) {

            localStorage.setItem('token', body.accessToken);
            setToken(body.accessToken);
          } else {

            setError('Error al iniciar sesión');
          }
        } catch (error) {
            console.log("test")
          setError('Error al iniciar sesión');
        }
      };

    return (
        
        <Container component="main"  maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white', // Fondo blanco
            borderRadius: '10px', // Bordes redondeados
            padding: '20px', // Espaciado interno
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra suave
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
 );
}