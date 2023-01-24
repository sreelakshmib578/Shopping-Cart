import React, { useState, useEffect } from "react";
import { Backdrop, IconButton } from "@mui/material";
import prod1 from "../../assets/images/image-product-1.jpg";
import prod2 from "../../assets/images/image-product-2.jpg";
import prod3 from "../../assets/images/image-product-3.jpg";
import prod4 from "../../assets/images/image-product-4.jpg";

import thumb1 from "../../assets/images/image-product-1-thumbnail.jpg";
import thumb2 from "../../assets/images/image-product-2-thumbnail.jpg";
import thumb3 from "../../assets/images/image-product-3-thumbnail.jpg";
import thumb4 from "../../assets/images/image-product-4-thumbnail.jpg";

import CloseIcon from "../Icons/CloseIcon";
import PreviousIcon from "../Icons/PreviousIcon";
import NextIcon from "../Icons/NextIcon";

const IMAGES = [prod1, prod2, prod3, prod4];
const THUMBS = [thumb1, thumb2, thumb3, thumb4];
const BackdropGallery = ({ open, handleClose, currentPassedImage, images }) => {
  const [backdropImage, setBackdropImage] = useState(currentPassedImage);
  const [currentPassedImageIndex, setCurrentPassedImageIndex] = useState(1);

  useEffect(() => {
    setBackdropImage(currentPassedImage);
    images.forEach((imgg, index) => {
      imgg === currentPassedImage && setCurrentPassedImageIndex(index);
    });
  }, [currentPassedImage]);

  const handleClick = (index = null) => {
    setBackdropImage(images[index]);
    setCurrentPassedImageIndex(index);
  };

  const handleIncrement = () => {
    if (currentPassedImageIndex === IMAGES.length - 1) {
      setBackdropImage(images[0]);
      setCurrentPassedImageIndex(0);
    } else {
      setBackdropImage(images[currentPassedImageIndex + 1]);
      setCurrentPassedImageIndex(currentPassedImageIndex + 1);
    }
  };

  const handleDecrement = () => {
    if (currentPassedImageIndex === 0) {
      setBackdropImage(IMAGES[IMAGES.length - 1]);
      setCurrentPassedImageIndex(IMAGES.length - 1);
    } else {
      setBackdropImage(IMAGES[currentPassedImageIndex - 1]);
      setCurrentPassedImageIndex(currentPassedImageIndex - 1);
    }
  };

  const removeActivatedClass = (parent) => {
    parent.childNodes.forEach((node) => {
      node.childNodes[0].classList.contains("activated") &&
        node.childNodes[0].classList.remove("activated");
    });
  };

  return (
    <Backdrop
      className="backdrop"
      sx={{
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <section className="backdrop-content">
        <IconButton
          onClick={handleClose}
          sx={{ color: "#fff", bgcolor: "transparent", alignSelf: "flex-end" }}
        >
          <CloseIcon fillColor={"#fff"} />
        </IconButton>
        <div className="image">
          <IconButton
            className="icon-button-prev"
            disableRipple
            onClick={() => {
              handleDecrement();
              removeActivatedClass(document.querySelector(".thumbnails"));
            }}
            sx={{
              height: "42px",
              width: "42px",
              bgcolor: "#fff",
            }}
          >
            <PreviousIcon />
          </IconButton>
          <IconButton
            className="icon-button-next"
            disableRipple
            onClick={() => {
              handleIncrement();
              removeActivatedClass(document.querySelector(".thumbnails"));
            }}
            sx={{
              height: "42px",
              width: "42px",
              bgcolor: "#fff",
            }}
          >
            <NextIcon />
          </IconButton>
          <img
            src={backdropImage}
            alt="selected-product"
            style={{ cursor: "auto" }}
          />
        </div>
        <div className="thumbnails">
          {images.map((th, index) => {
            return (
              <div
                className="img-holder-backd"
                key={index}
                onClick={(e) => {
                  handleClick(index);
                  removeActivatedClass(e.currentTarget.parentNode);
                  e.currentTarget.childNodes[0].classList.toggle("activated");
                }}
              >
                <div
                  className={`outlay ${
                    index === currentPassedImageIndex && "activated"
                  }`}
                ></div>
                <img src={th} alt={`product-${index + 1}`} />
              </div>
            );
          })}
        </div>
      </section>
    </Backdrop>
  );
};

export default BackdropGallery;