    import * as React from 'react';
    import Typography from '@mui/material/Typography';
    import Grid from '@mui/material/Grid';
    import TextField from '@mui/material/TextField';
    import FormControlLabel from '@mui/material/FormControlLabel';
    import Checkbox from '@mui/material/Checkbox';
    import { useFormik } from "formik";
    import * as Yup from 'yup';

    export default function PaymentForm() {
      const formik = useFormik({
        initialValues: {
          cardName: '',
          cardNumber: '',
          expDate:'',
          cvv:''
        },
        validationSchema: Yup.object({
          cardName: Yup
            .string()
            .max(255)
            .required('Card Name is required'),
            cardNumber: Yup
            .string()
            .min(16)
            .max(16)
            .required('Card number is required'), 
            expDate: Yup
            .string()
            .min(7)
            .max(7)
            .required('Expiry date is required'),
            cvv: Yup
            .string()
            .min(3)
            .max(3)
            .required('CVV is required') 
        }),
        // onSubmit: (userData) => {
        //   validateLogin(userData);
        
        // }
      });
      return (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Payment method
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardName"
                name="cardName"
                label="Name on card"
                fullWidth
                autoComplete="cc-name"
                variant="standard"
                error={Boolean(formik.touched.cardName && formik.errors.cardName)}
                  helperText={formik.touched.cardName && formik.errors.cardName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.cardName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardNumber"
                name="cardNumber"
                label="Card number"
                fullWidth
                autoComplete="cc-number"
                variant="standard"
                error={Boolean(formik.touched.cardNumber && formik.errors.cardNumber)}
                  helperText={formik.touched.cardNumber && formik.errors.cardNumber}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.cardNumber}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="expDate"
                name="expDate"
                label="Expiry date (02/2024 )"
                fullWidth
                autoComplete="cc-exp"
                variant="standard"
                error={Boolean(formik.touched.expDate && formik.errors.expDate)}
                  helperText={formik.touched.expDate && formik.errors.expDate}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.expDate}
                
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cvv"
                name="cvv"
                label="CVV"
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
                variant="standard"
                error={Boolean(formik.touched.cvv && formik.errors.cvv)}
                  // helperText={formik.touched.cvv && formik.errors.cvv}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.cvv}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                label="Remember credit card details for next time"
              />
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }