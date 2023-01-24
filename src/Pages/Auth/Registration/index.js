import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName:'',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      firstName: Yup
        .string()
        .max(255)
        .required('First Name is required'),
      lastName: Yup
        .string()
        .max(255)
        .required('Last Name is required'),
      username: Yup
        .string()
        .max(255)
        .required('Username is required'),
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .min(6)
        .required('Password is required')
    }),
    onSubmit: (registrationData) => {
      onUserRegistration(registrationData)
      
    }
  });
  const onUserRegistration = (registrationData) => {
    axios.post('https://dummyjson.com/users/add',JSON.stringify(registrationData),{
      headers: {
          'Content-Type': 'application/json',
      }
  }).then(response =>{
    console.log("Registration successful",response);
    showToast('success', "Registration succesfull" )
    setTimeout(() => {
      navigate("/auth/login")
    }, 3000)
    

  } ).catch(error => {
    console.log("Registration error");
    showToast('error', "Registration Failed" )

  })
  
  }
  const showToast = (type, message) => {
    if(type === 'success') {
      toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

    return (
        <Box
sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          backgroundSize:'cover',
          minHeight: '100vh',
          backgroundImage: 'linear-gradient(to right, #ffdde1 , #ee9ca7)'
          // backgroundImage:`url(${Image})`
        }}
        > 
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          
          <Box  sx={{ mt: 3 }}>
          <form onSubmit={formik.handleSubmit}> 
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
                  autoComplete="given-name"
                  name="firstName"
                  // required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              label="Username"
              margin="normal"
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
              variant="outlined"
            />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            </form>
          </Box>
          
        </Box>
      </Container>
      <ToastContainer />
      </Box>
    )
}
export default Registration;