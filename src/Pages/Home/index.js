import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Stack, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import HomePageBanner from '../../assets/images/banner.jpg';
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { getUserData } from "../../Utils";
import ProductCard from "../../Components/ProductCard";
  
const Home = () => {
  const navigate = useNavigate();
  const [categoryRails, setCategoryRails] = useState([]);
  const [orderedQuant, setOrderedQuant] = useState(0);
  const [quant, setQuant] = useState(0);
  useEffect(() => {
    getAllCategoryies();
  }, [])

  const resetQuant = () => {
    setQuant(0);
    setOrderedQuant(0);
  };


  const getAllCategoryies = async() => {
   await axios.get("https://dummyjson.com/products/categories")
    .then(async (response) => {
      const {data} = response;
       

        const responses = await Promise.all([getProductsByCategories(data[0]),getProductsByCategories(data[1]), getProductsByCategories(data[2]), getProductsByCategories(data[3]), getProductsByCategories(data[4]), getProductsByCategories(data[5])]);
        console.log("Response", responses);
        const formattedData = []
        responses.map((productsData, index) => {
          return formattedData.push({
            category: data[index],
            products: productsData
          })
        });
        console.log("formattedData", formattedData)
        setCategoryRails(formattedData)
      //})
    })
  }
  const getProductsByCategories = async(category) => {
    return await axios.get("https://dummyjson.com/products/category/"+category)
    .then(response => {
      const {data} = response;
      return data.products;
    })
  }

 
    return (
      <main className="App">
        <Container component="section" sx={{py: '0px', px: 0}} maxWidth={"lg"}>
          <Header onOrderedQuant={orderedQuant} onReset={resetQuant} />
          <section className="flex">
          <Box
          sx={{
           backgroundImage:`url(${HomePageBanner})`,
            backgroundSize: 'cover',
            height: '400px'
          }}
        >
          <Container maxWidth="sm" sx={{
            width: '40%',
            justifyContent: 'left',
            display: 'flex',
            margin: '0px',
            flexDirection: 'column'
          }}>
            <Typography
              component="h4"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Dress world
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Shop Now</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 0, px:0, paddingLeft: 0, paddingRight: 0 }} maxWidth="lg">
            {categoryRails.map((categoryData) => (
              <div key={categoryData.category}>
              <Typography sx={{ py: 4, px:0 }} gutterBottom variant="h5" component="h2">
             {categoryData.category.toUpperCase()}
             </Typography>
             <Grid container spacing={3}>
             {categoryData.products.slice(0,4).map(product => {
              return(
                
              <Grid item key={product.id} xs={12} sm={6} md={3}>
              <ProductCard product={product}/>
            </Grid>
           
              )
              
             })}
              </Grid>
             </div>
              
            ))}
         
        </Container>
          </section>
          </Container>
          <ToastContainer />
          <Footer />
          </main>
        
    )
}
export default Home;

