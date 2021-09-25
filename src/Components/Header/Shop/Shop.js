import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../../utilities/fakedb';
import Cart from '../../Cart/Cart.js';
import Product from '../../Product/Product';
import  './Shop.css'

const Shop = () => {
    const [products,setProducts]= useState([])
    const [cart,setCart] = useState([])
    const[displayProducts,setDisplayProduct] = useState([])

    useEffect( ()=>{
        console.log("product api called")
        fetch('./products.JSON')
        .then(res=>res.json())
        .then(data=>{
            setProducts(data)
            setDisplayProduct(data)
            console.log("Products received")
        })
    },[])
    useEffect( ()=>{
        console.log('Localstorage cart called')
   if(products.length){
        const savedCart = getStoredCart();
        const storeCart = []
        for (const key in savedCart) {
            // console.log(key, savedCart[key])
        //   console.log(key)
          const addedproduct = products.find((product) => product.key === key);
          if(addedproduct){
              const quantity = savedCart[key]
              addedproduct.quantity = quantity
            //   console.log(addedproduct)
             storeCart.push(addedproduct);
          }
          
        //   console.log(key, addedproduct);
        }
         setCart(storeCart);
   }
  
    },[products])
    const handleAddToCart = (product)=>{
        console.log(product.name)
        const newCart = [...cart,product]
        console.log(product)
        setCart(newCart)
        //Save to local storage for now
        addToDb(product.key)
    }
    const handleSearch = event=>{
       const searchText = event.target.value
       const matchedProducts = products.filter(product=> product.name.toLowerCase().includes(searchText.toLowerCase()))
       setDisplayProduct(matchedProducts)
       console.log(matchedProducts.length)
    }
    return (
      <div>
        <div className="search-container">
          <input type="text"
           onChange={handleSearch}
           placeholder="Search Product" />
        </div>
        <div className="shop-container">
          <div className="product-container">
            {displayProducts.map((product) => (
              <Product
                key={product.key}
                product={product}
                handleAddToCart={handleAddToCart}
              ></Product>
            ))}
          </div>
          <div className="cart-container">
            <Cart cart={cart}></Cart>
          </div>
        </div>
      </div>
    );
};

export default Shop;