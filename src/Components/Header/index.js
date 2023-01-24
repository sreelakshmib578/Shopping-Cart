import React, { useEffect, useRef, useState } from "react";
import menu from "../../assets/images/icon-menu.svg";
import logo from "../../assets/images/logo.jpg";
import avatar from "../../assets/images/image-avatar.png";
import { Badge, Button, ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import Cart from "../Cart";
import MobileLinksDrawer from "../MobileLinksDrawer";
import axios from "axios";
import { Link } from "react-router-dom";
import { clearUserData, getUserData, isLoggedInUser } from "../../Utils";
import { Stack } from "@mui/system";

const Header = ({ onReset }) => {
  const [showCart, setShowCart] = useState(false);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInUser());
  const [user, setUser] = useState(getUserData());
  const [cartData, setCartData] = useState([])

  const anchorRef = useRef(null);

  const handleToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    // if (
    //   anchorRef.current &&
    //   anchorRef.current.contains(event.target )
    // ) {
    //   return;
    // }

    setMenuOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setMenuOpen(false);
    } else if (event.key === 'Escape') {
      setMenuOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(menuOpen);
  React.useEffect(() => {
    if (prevOpen.current === true && menuOpen === false) {
      //anchorRef.current.focus();
    }

    prevOpen.current = menuOpen;
  }, [menuOpen]);
  const handleOpen = (val) => {
    setMenuOpen(val);
  };

  useEffect(() => {
    const user = getUserData();
    getAllCategoryies();
  }, [])

  useEffect(() => {
    if(user) {
      getCartOfUser();
    }
  }, [user])

  const getAllCategoryies = async() => {
    await axios.get("https://dummyjson.com/products/categories")
    .then(async (response) => {
      const {data} = response;
      setCategories(data.slice(0,5));
    });
  }

  const getCartOfUser = () => {
    axios.get("https://dummyjson.com/carts/user/"  + user.id)
    .then(response => {
      console.log(response)
      setCartData(response.data.carts[0].products)
    })
  }

  const handleLogOut = () => {
    clearUserData();
    setIsLoggedIn(false);
    setUser(null);
    handleClose();
    
  }

  return (
    <header>
      <nav>
        <section className="left">
          <div className="imgs">
            <img
              className="hide-in-desktop"
              src={menu}
              alt="icon-menu"
              onClick={() => {
                handleOpen(true);
              }}
            />
            <MobileLinksDrawer onHandleOpen={handleOpen} onOpen={open} />
            <Link to={"/"}>
            <img width='100px' src={logo} alt="logo"  />

            </Link>
          </div>
          <div className="links hide-in-mobile">
            <ul>
              {categories.map(category => (
                
                <li key={category}>
                  <Link to = {"/products/"+category}>
                <button>{category.charAt(0).toUpperCase() + category.slice(1)}</button>
                </Link>
              </li>
                
              ))}
            </ul>
          </div>
        </section>
        <div className="right">
          <IconButton
            disableRipple
            onClick={() => {
              setShowCart(!showCart);
            }}
          >
            <Badge
              invisible={cartData.length === 0}
              badgeContent={cartData.length}
              variant="standard"
              sx={{
                color: "#fff",
                fontFamily: "Kumbh sans",
                fontWeight: 700,
                "& .css-fvc8ir-MuiBadge-badge ": {
                  fontFamily: "kumbh sans",
                  fontWeight: 700,
                },
              }}
            >
              <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                  fill="#69707D"
                  fillRule="nonzero"
                />
              </svg>
            </Badge>
          </IconButton>
          {isLoggedIn && user&& (
            //<img src={user.image} alt="img-avatar" className="avatar" />
            <Stack direction="row" spacing={2}>
      
      <div>
        
        <img ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle} src={user.image} alt="img-avatar" className="avatar" />
        <Popper
          open={menuOpen}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={menuOpen}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem> */}
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
          )}
          
          {showCart && (
            <Cart
              onOrderedQuant={cartData.length}
              onReset={onReset}
              cartData={cartData}
              onShow={setShowCart}
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;