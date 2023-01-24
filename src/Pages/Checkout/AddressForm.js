    import * as React from 'react';
    import Grid from '@mui/material/Grid';
    import Typography from '@mui/material/Typography';
    import TextField from '@mui/material/TextField';
    import FormControlLabel from '@mui/material/FormControlLabel';
    import Checkbox from '@mui/material/Checkbox';
    import { useFormik } from "formik";
    import * as Yup from 'yup';

    export default function AddressForm() {

      const formik = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          address1:'',
          address2:'',
          city:'',
          state:'',
          zip:'',
          country:''
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
          address1: Yup
            .string()
            .max(255)
            .required('Address Line 1 is required'),
          address2: Yup
            .string()
            .max(255)
            .required('Address Line 2 is required'),
          city: Yup
            .string()
            .max(255)
            .required('City is required'),
          state: Yup
            .string()
            .max(255)
            .required('State is required'),
          zip: Yup
            .string()
            .max(10)
            .required('Zip code is required'),
        
          country: Yup
            .string()
            .max(255)
            .required('Country is required')
        }),
        // onSubmit: (userData) => {
        //   validateLogin(userData);
        
        // }
      });
      
      return (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Shipping address
          </Typography>
          <form onSubmit={formik.handleSubmit}> 
<Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                autoComplete="shipping address-line1"
                variant="standard"
                error={Boolean(formik.touched.address1 && formik.errors.address1)}
                helperText={formik.touched.address1 && formik.errors.address1}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address1}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                autoComplete="shipping address-line2"
                variant="standard"
                error={Boolean(formik.touched.address2 && formik.errors.address2)}
                helperText={formik.touched.address2 && formik.errors.address2}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
                error={Boolean(formik.touched.city && formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="State/Province/Region"
                fullWidth
                variant="standard"
                error={Boolean(formik.touched.state && formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.state}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                variant="standard"
                error={Boolean(formik.touched.zip && formik.errors.zip)}
                helperText={formik.touched.zip && formik.errors.zip}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.zip}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
                variant="standard"
                error={Boolean(formik.touched.country && formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                label="Use this address for payment details"
              />
            </Grid>
          </Grid>
          </form>
          
          
        </React.Fragment>
      );
    }