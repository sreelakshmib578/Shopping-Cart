import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Components/Header";
import ProductCard from "../../Components/ProductCard";

const Category = () => {
  const navigate = useNavigate();
  const [orderedQuant, setOrderedQuant] = useState(0);
  const [quant, setQuant] = useState(0);
  let { category } = useParams();
  const [productList,setProductList] = useState([])
  console.log("category", category);
  useEffect(() => {
   getProductByCategory(category);
  }, [category])

  const handleBuyNow = () => {
    navigate("/checkout")
  }
  const handleAddToCart = () => {
    navigate("/cart")
  }
  const resetQuant = () => {
    setQuant(0);
    setOrderedQuant(0);
  };
  const getProductByCategory = (category) => {
    axios.get('https://dummyjson.com/products/category/'+category)
    .then(response=>{
        setProductList(response.data.products)
        console.log("response",response);
    }).catch(error=>{
        console.log("error",error);
    })
  }
    return(
        <main className="App">
        <Container component="section" sx={{py: '0px', px: 0}} maxWidth={"lg"}>
          <Header onOrderedQuant={orderedQuant} onReset={resetQuant} />
          <section sx={{mt: 2}}>
          <Grid container spacing={3}>
             {productList.map(product => {
              return(
                
              <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product}/>
            </Grid>
           
              )
              
             })}
              </Grid>
              </section>
          </Container>
          </main>
    )
}
export default Category;