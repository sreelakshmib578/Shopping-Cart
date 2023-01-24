import React, { useEffect, useState } from "react";
import CartIcon from "../Icons/CartIcon";
import QuantityButton from "../QuantityButton";
import { useNavigate, useParams } from "react-router-dom";
import matchers from "@testing-library/jest-dom/matchers";
import { getUserData } from "../../Utils";
import { toast ,ToastContainer} from "react-toastify";
import axios from "axios";


const Description = ({ onQuant, onAdd, onRemove, onSetOrderedQuant , productData}) => {
  const navigate = useNavigate();



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
             quantity: onQuant,
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


const discountedPrice = productData.price * productData.discountPercentage / 100;
const priceAfterDiscount = productData.price - discountedPrice
  return (
    <section className="description">
      <p className="pre">{productData.brand}</p>
      <h1>{productData.title}</h1>
      <p className="desc">
      {productData.description}
      </p>
      <div className="price">
        <div className="main-tag">
          {/* <p>₹{Math.round(priceAfterDiscount)}</p> */}
          <p>₹{priceAfterDiscount.toFixed(2)}</p>
          <p>{productData.discountPercentage}%</p>
        </div>
        <s>₹{productData.price}</s>
      </div>
      <div className="buttons">
        <QuantityButton onQuant={onQuant} onRemove={onRemove} onAdd={onAdd} />
        <button
          className="add-to-cart"
          onClick={() =>handleAddToCart(productData.id)}
        >
          <CartIcon />
          Add to cart
        </button>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default Description;
