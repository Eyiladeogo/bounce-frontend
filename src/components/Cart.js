import Navbar from "./NavBar"
import CartItem from "./CartItem.js";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

import api from "../utils/api.js";

const cartItems = [
    {
      id: 1,
      name: 'Tatum 2 "Red Cement"',
      price: 87.97,
    },
    {
      id: 2,
      name: 'Tatum 2 "Red Cement"',
      price: 87.97,
    },
    {
      id: 3,
      name: 'Tatum 2 "Red Cement"',
      price: 87.97,
    },
    {
      id: 4,
      name: 'Tatum 2 "Red Cement"',
      price: 87.97,
    },
  ];

  

export default function Cart(){

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const navigate = useNavigate()
  const location = useLocation()

  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [removalErrorMessage, setRemovalErrorMessage] = useState('') 
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    // Calculate total price when cartItems changes
    const total = cartItems.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
    setTotalPrice(parseFloat(total.toFixed(2)));
  }, [cartItems]);

  useEffect(() => {
    if (!isAuthenticated) {
      // If user isn't logged in, redirect them to login
      navigate('/sign-in', { state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);


  async function fetchCartItems(){
    if (isAuthenticated){
      const token = localStorage.getItem('token');
      if (token){
        try{
          const response = await api.get('cart/')
          const cart = response.data['items']
          console.log(cart)
          setCartItems(cart)
          setLoading(false)
        }
        catch(error){
            setError(error.message)
            setLoading(false)
        }
      }
    }
  }

  useEffect(() =>{
    fetchCartItems()
  }, [isAuthenticated])

  const handleCheckout = async() => {
    try {
      await api.delete('cart/clear/')
      await api.get('cart/')
      navigate("/checkout");
    } catch (error) {
      console.error('Error while decreasing item quantity', error)
      setRemovalErrorMessage('Error while decreasing item quantity')
    }
  };
    return(
        <>
            <Navbar />
            <div className="saved-container">
            {loading && (
            <div className="spinner-container">
              <FaSpinner className="spinner" />
            </div>
          )}
        {error && <p>Error fetching data: {error}</p>}
        {!loading && (
          <>
            <div className="cart-summary">
                  <h2>TOTAL</h2>
                  <h3>${totalPrice}</h3>
                  {removalErrorMessage && <p className="error">{removalErrorMessage}</p>}
              </div>
              
              <div className="saved-list">
                  {cartItems.length > 0 ? (
                  cartItems.map((item) => <CartItem key={item.item.id} item={item.item} quantity={item.quantity} handleSetError ={setRemovalErrorMessage} handleCartFetch={fetchCartItems}/>)
                  ) : (
                  <p>Cart is Empty!</p>
                  )}
              </div>
          </>
          
        )}
            

            {cartItems.length > 0 && (
              <div className="checkout-button-container">
                <button className="checkout-button" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            )}
        </div>
        </>
        
    )
}
