import { Box, IconButton } from "@mui/material";
import React from "react";
// import thumb1 from "../../assets/images/image-product-1-thumbnail.jpg";
import deleteIcon from "../../assets/images/icon-delete.svg";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


// const PRICE = 125;

const Product = ({ onOrderedQuant, product, onReset }) => {
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


  const handleCartDelete = async(id) => {
    await axios.delete('https://dummyjson.com/carts/'+id)
    .then((response)=> {
      console.log("this is response from cart",response)
      showToast('success', "Product successfully deleted from the cart")

      
    })
  }
  console.log("CaratData", product);
  return (
    <div className="product">
      {/* <img src={thumb1} alt="product-thumbnail" /> */}
      <div className="info">
        <p>{product.title}</p>
        <div className="price">
          <span> {` ₹${product.price} x ${product.quantity}`} </span>
          <span> Discount {` ₹${product.discountedPrice}`} </span>
          <Box sx={{textAlign: 'left'}}> <span> Total </span>{` ₹${product.total}`} </Box>
        </div>
      </div>
      <IconButton
        className="delete-button"
        size="small"
        disableRipple
        onClick={()=>handleCartDelete(product.id)}
      >
        <img src={deleteIcon} alt="delete-item" />
      </IconButton>
      {/* <ToastContainer/> */}
    </div>
  );
};

export default Product;