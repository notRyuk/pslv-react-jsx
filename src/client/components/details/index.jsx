import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import logo from "@client/assets/images/banner.png";
import classes from "./styles.module.scss";
import { Stack } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
      <Container component="main" maxWidth="lg">
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
          <Typography component="h1" variant="h4">
            Get Started With Mascot
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2, color: 'white' }}>
            <Stack direction={'row'} spacing={8}>
            <Box sx={{bgcolor: 'primary.dark', padding: '1rem', borderRadius:'10px', boxShadow: '-4px 4px 5px 1px black'}}>
            <Stack direction={'column'}>
            <Typography component="h1" variant="h5">
            Personal Details
          </Typography>
            <Stack sx={{mt:2}} direction={'row'} spacing={2}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
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
              name="lastName"
              label="Last Name"
              id="lastName"
              autoComplete="lastName"
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
            </Stack>
            <Stack sx={{mt: 2}} direction={'row'} spacing={2}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="dob"
              label="Date of Birth"
              id="dob"
              autoComplete="dob"
              type="date"
              InputLabelProps={{shrink: true}}
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
              name="phoneNumber"
              label="Phone Number"
              id="phoneNumber"
              autoComplete="phoneNumber"
              type="number"
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
            </Stack>
            <Stack sx={{mt: 2}} direction={'row'} spacing={2}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="instituteName"
              label="Institute Name"
              id="instituteName"
              autoComplete="instituteName"
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
            </Stack>
            <Stack sx={{mt: 2}} direction={'row'} spacing={2}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="joiningYear"
              label="Joining Year"
              id="joiningYear"
              autoComplete="joiningYear"
              type="number"
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
              name="passingYear"
              label="Passing Year"
              id="passingYear"
              autoComplete="passingYear"
              type="number"
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
            </Stack>
            </Stack>
            </Box>
            <Box sx={{bgcolor: 'primary.dark', padding: '1rem', borderRadius:'10px', boxShadow: '-4px 4px 5px 1px black'}}>
            <Stack direction={'column'}>
            <Typography component="h1" variant="h5">
            Address and Bio
          </Typography>
            <Stack sx={{mt:2}} direction={'row'} spacing={2}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="addressLine1"
              label="Address Line 1"
              name="addressLine1"
              autoComplete="addressLine1"
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
            </Stack>
            <Stack sx={{mt: 2}} direction={'row'} spacing={2}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="country"
              label="Country"
              name="country"
              autoComplete="country"
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
              name="pinCode"
              label="Pin Code"
              id="pinCode"
              autoComplete="pinCode"
              type="number"
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
            </Stack>
            <Stack sx={{mt: 2}} direction={'row'} spacing={2}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="bio"
              label="Write a brief about your bio"
              id="bio"
              autoComplete="bio"
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
            </Stack>
            <Stack sx={{mt: 2}} direction={'row'} spacing={2}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="profileImageUrl"
              label="Profile Image Url"
              id="profileImageUrl"
              autoComplete="profileImageUrl"
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
            </Stack>
            </Stack>
            </Box>  
            </Stack>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, "&.MuiButton-root:hover": {
                borderColor: '#1565c0',
                bgcolor: '#1565c0',
              },}}
            >
              Submit
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
  );
}