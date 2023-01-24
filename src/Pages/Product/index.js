import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import Description from "../../Components/Description";
import Footer from "../../Components/Footer";
import Gallery from "../../Components/Gallery";
import Header from "../../Components/Header";
import MobileGallery from "../../Components/MobileGallery";
import axios from "axios";
import { useParams } from "react-router-dom";


const Product = () =>{
  const { productId } = useParams();

  const [productData,setProductData] = useState({})

    const [quant, setQuant] = useState(0);
  const [orderedQuant, setOrderedQuant] = useState(0);

  useEffect(() => {
    getProductDetails(productId);
   }, [])

const getProductDetails = async(id) => {
await axios.get('https://dummyjson.com/products/'+id)
.then((response) => {
const {data} = response;
console.log("response of pdp",data)
setProductData(data)
})
}
  const addQuant = () => {
    setQuant(quant + 1);
  };

  const removeQuant = () => {
    setQuant(quant - 1);
  };

  const resetQuant = () => {
    setQuant(0);
    setOrderedQuant(0);
  };
    return(
        <main className="App">
        <Container component="section" maxWidth={"lg"}>
          <Header onOrderedQuant={orderedQuant} onReset={resetQuant} />
          <section className="core">
            <Gallery 
            images = {productData && productData.images ? productData.images.slice(0,4) : []}
            />
            <MobileGallery />
            <Description
              onQuant={quant}
              onAdd={addQuant}
              onRemove={removeQuant}
              onSetOrderedQuant={setOrderedQuant}
              productData={productData}
            />
          </section>
        </Container>
        <Footer />
      </main>
    )
}
export default Product; 