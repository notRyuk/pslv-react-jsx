import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useState } from 'react';
// import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import classes from "./styles.module.scss";
  
import Hash from '@utils/hashClient';

import { useDispatch, useSelector } from 'react-redux';
import Details from '../../details';
import { selectCreatedUser } from '../authSlice';
import { useGetter } from '../../../hooks/fetcher';
import urls,{ basePath } from '../../../../utils/urls';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function SignUp() {
  const [credential, setCredential] = useState({})
  const [credentialAdded, setCredentialAdded] = useState(false)
  const [email, setEmail] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailBlur = () => {
    setIsEmailValid(email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  };

  const dispatch = useDispatch();
  const user = useSelector(selectCreatedUser);
  const [selectedValue, setSelectedValue] = useState('student');
  // const {data: userData} = useGetter(basePath+urls.auth.getUserByEmail.replace(":email", "hello@gmail.com"))
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')

    const res = await axios.get(basePath+urls.auth.getUserByEmail.replace(":email", email))
    if(!Object.keys(res?.data?.data).includes("email")){
      const password = data.get('password')
      const hashed = await Hash.create(password)
      setCredential({
        email,
        password: hashed,
        role: selectedValue,
      })
      setCredentialAdded(true)
      toast.success("Credentials Added Successfully")
    }
    else{
      toast.error("This Email has been already taken!!")
    }
    
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <>
      {credentialAdded && <Details credential={credential}></Details>}
      {!credentialAdded &&
        <Container component="main" maxWidth="xs">
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
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, color: 'white' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                inputProps={{ pattern: '^[^\s@]+@[^\s@]+\.[^\s@]+$' }}
                error={!isEmailValid}
                helperText={!isEmailValid ? 'Invalid email address' : ''}
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
              {/* <FormControlLabel
          control={<Radio />}
          label="Admin"
          value="admin"
          checked={selectedValue === 'admin'}
          onChange={handleChange}
        /> */}
              {/* {error.length > 0 && <Typography variant="body2" color="error">
              {error}
              </Typography>} */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!isEmailValid}
                sx={{
                  mt: 3, mb: 2, "&.MuiButton-root:hover": {
                    borderColor: '#1565c0',
                    bgcolor: '#1565c0',
                  },
                }}
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
      }
    </>
  );
}