import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import * as React from 'react';
// import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import classes from "./styles.module.scss";

import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { checkUserAsync, selectError, selectLoggedInUser, selectLoginStatus } from '../authSlice';

import Hash from '@utils/hashClient';
import Loading from '../../loading';

export default function SignIn() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const status = useSelector(selectLoginStatus)


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')
    const password = data.get('password')
    const hashed = await Hash.create(password)
    dispatch(
      checkUserAsync({ email, password: hashed })
    );
    // console.log(error);
  };
  return (
    <>
      {status === "loading" && <Loading></Loading>}
      {!error && user && <Navigate to="/home" replace={true}></Navigate>}
      {status === "idle" && !user && <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          className={classes.box}
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, color: 'white' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white"
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                  color: "white"
                },
                "& .MuiInputLabel-outlined.Mui-focused": {
                  color: "white"
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white"
                },
              }}
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
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white"
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                  color: "white"
                },
                "& .MuiInputLabel-outlined.Mui-focused": {
                  color: "white"
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white"
                },
              }}
            />
            <Typography variant="body2" color="error">
              {error && error.message}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Link to="#">
                Forgot password?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3, mb: 2, "&.MuiButton-root:hover": {
                  borderColor: '#1565c0',
                  bgcolor: '#1565c0',
                },
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>}
    </>
  );
}