import React from "react";
import { useNavigate } from "react-router-dom";
import Product from "../Products";
const Cart = ({ onOrderedQuant,cartData, onReset, onShow }) => {
  const navigate = useNavigate();
  return (
    <section className="cart">
      <div className="head">
        <p>Cart</p>
      </div>
      <hr />
      <div className="cart-content">
        {onOrderedQuant ? (
          <>
          {cartData.map(product => (
            <Product key={product.id} onOrderedQuant={onOrderedQuant} product={product} onReset={onReset} />
          ))}
            
            <button
              className="checkout"
              onClick={() => {
                navigate("/checkout")
                onReset();
                onShow(false);
              }}
            >
              checkout
            </button>
          </>
        ) : (
          <p className="empty">Your Cart Is Empty</p>
        )}
      </div>
    </section>
  );
};

export default Cart;