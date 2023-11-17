import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import logo from "@client/assets/images/banner.png";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormGroup from '@mui/material/FormGroup';
import classes from "./styles.module.scss";

import { selectLoggedInUser, createUserAsync } from '../authSlice';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function SignUp() {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const [selectedValue, setSelectedValue] = useState('student');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      role : selectedValue,
    })
    dispatch(
      createUserAsync({
        email: data.get('email'),
        password: data.get('password'),
        role : selectedValue,
        details : [],
      })
    );
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
      <>
        {user && <Navigate to="/" replace={true}></Navigate>}
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          className = {classes.box}
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
            Sign up
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
              sx={{"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
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
              sx={{"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
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
            <FormControlLabel
        control={<Radio />}
        label="Student"
        value="student"
        checked={selectedValue === 'student'}
        onChange={handleChange}
      />
      <FormControlLabel
        control={<Radio />}
        label="Alumni"
        value="alumni"
        checked={selectedValue === 'alumni'}
        onChange={handleChange}
      />
      <FormControlLabel
        control={<Radio />}
        label="Admin"
        value="admin"
        checked={selectedValue === 'admin'}
        onChange={handleChange}
      />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, "&.MuiButton-root:hover": {
                borderColor: '#1565c0',
                bgcolor: '#1565c0',
              },}}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signin" >
                  {"Already have an account? Login here"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
      </>
  );
}