import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { createUserAsync, selectUserCreated } from '../auth/authSlice';
import classes from "./styles.module.scss";


export default function Details(props) {
  // const user = useSelector(selectCreatedUser);
  const isUserCreated = useSelector(selectUserCreated)
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("email", props.credential.email)
    data.append("password", props.credential.password)
    data.append("role", props.credential.role)
    dispatch(createUserAsync(data))
  };

  return (
    <>
      {isUserCreated && (
        <Navigate
          to={"/signin"}
          replace={true}
        />
      )}
      <Container component="main" maxWidth="sm">
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
          <Typography component="h1" variant="h4">
            Get Started With Mascot
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2, color: 'white' }}>
            <Stack direction={'row'} spacing={8}>
              <Box sx={{ bgcolor: 'primary.dark', padding: '1rem', borderRadius: '10px', boxShadow: '-4px 4px 5px 1px black' }}>
                <Stack direction={'column'}>
                  <Typography component="h1" variant="h5">
                    Personal Details
                  </Typography>
                  <Stack sx={{ mt: 2 }} direction={'row'} spacing={2}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="name.first"
                      autoComplete="firstName"
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
                      name="name.last"
                      label="Last Name"
                      id="lastName"
                      autoComplete="lastName"
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
                  </Stack>
                  <Stack sx={{ mt: 2 }} direction={'row'} spacing={2}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="dob"
                      label="Date of Birth"
                      id="dob"
                      autoComplete="dob"
                      type="date"
                      InputLabelProps={{ shrink: true }}
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
                      name="phone"
                      label="Phone Number"
                      id="phoneNumber"
                      autoComplete="phoneNumber"
                      type="number"
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
                  </Stack>
                  <Stack sx={{ mt: 2 }} direction={'row'} spacing={2}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="bio"
                      label="Write a brief about your bio"
                      id="userBio"
                      autoComplete="userBio"
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
                  </Stack>
                  <Stack sx={{ mt: 2 }} direction={'row'} spacing={2}>
                    <TextField
                      type='file'
                      margin="normal"
                      required
                      fullWidth
                      name="profilePhoto"
                      // label="Profile Image Url"
                      id="profileImageUrl"
                      autoComplete="profileImageUrl"
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
                      inputProps={{
                        accept: "image/*"
                      }}
                    />
                  </Stack>
                </Stack>
              </Box>
            </Stack>
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
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}