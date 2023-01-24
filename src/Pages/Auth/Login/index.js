import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { saveUserData } from "../../../Utils";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup
        .string()
        .max(255)
        .required('Username is required'),
      password: Yup
        .string()
        .max(255)
        .min(6)
        .required('Password is required')
    }),
    onSubmit: (userData) => {
      validateLogin(userData);
     
    }
  });


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

  const validateLogin = (userData) => {
    axios.post('https://dummyjson.com/auth/login', JSON.stringify(userData), {
      headers: {
          'Content-Type': 'application/json',
      }
  }).then(response => {
console.log("Login succesfull", response)
    showToast('success', "Login succesfull" );
    saveUserData(response.data)
    setTimeout(() => {
      navigate('/')
    }, 3000)
   
    }).catch(error => {
      console.log("Login error", error)
      showToast('error', "Login Failed" )
    })
  }
    return (
       
      <Box
        component="main"
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
        <Container maxWidth="xs">
        <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Login
              </Typography>
             
            </Box>
          <form onSubmit={formik.handleSubmit}> 
            {/*  */}
           
            
            
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
            <TextField
            error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
             helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
             onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="success"
               // disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Don&apos;t have an account?
              {' '}
                <Link
                  to="/auth/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Sign Up
                </Link>
            </Typography>
          </form>
        </Container>
        <ToastContainer  />
      </Box>
    )
}
export default Login;