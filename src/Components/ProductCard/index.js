import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { getUserData } from "../../Utils";


const ProductCard = ({product}) => {
    const navigate = useNavigate();
    
    const handleViewCart = () => {
        navigate("/checkout")
      }
      const handleAddToCart = (id) => {
       const user = getUserData();
       if(!user) {
        navigate("/auth/login")
       } else {
        axios.post("https://dummyjson.com/carts/add", JSON.stringify({
          userId: user.id,
          products: [
              {
                id: id,
                quantity: 1,
              },
            ]
          }), {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => {
          console.log("Product added", response)
          showToast('success', "Product added to the cart")
        })
       }
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
        <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: '200px',
                    objectFit: 'cover',
                    
                  }}
                 image={product.thumbnail}
                 //image="https://source.unsplash.com/random"
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1}}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.title}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2" sx={{ color: "red"}}>
                  ₹{product.price}/-
                  </Typography>
                  <Typography>
                    {product.description} {product.id}
                  </Typography>
                  
                </CardContent>
                <CardActions sx={{justifyContent:'center'}}>
                  <Link className="noUnderLine" to={"/product/details/"+product.id}>
                <Button variant="contained" color="error" size="small" >View product</Button>

                  </Link>

                  <Button sx={{marginLeft:2}} variant="contained" color="success" size="small" onClick={() =>handleAddToCart(product.id)}>Add TO Cart</Button>
                </CardActions>
                <ToastContainer />
              </Card>
    )
}
export default ProductCard;