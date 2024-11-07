import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../utils/api';

export default function AddToCartModal({ item, closeModal, handleShopFetch }) {
    const [quantity, setQuantity] = useState(item.quantity);
    const [errorMessage, setErrorMessage] = useState('')

    // Function to handle quantity change
    const handleQuantityChange = (type) => {
        if (type === 'increment') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const navigate = useNavigate()

    const handleViewCart = () =>{
        navigate('/cart')
    }

    const handleAddToCart = async() => {
        console.log(`Request data is ${item.id} and ${quantity}`)
        try {
            await api.post('/cart/', {'item_id':item.id, 'quantity':quantity})
            closeModal()
            handleShopFetch()
        } catch (error) {
            console.error('Error while adding to cart', error)
            setErrorMessage('Server Error')
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Close Button */}
                <button className="close-btn" onClick={closeModal}>×</button>

                {/* Modal Body */}
                <div className="modal-body">
                    {/* Left Side: Item Image */}
                    <div className="item-image-wrapper">
                        <img src={item.image_url} alt={item.name} className="item-image" />
                    </div>

                    {/* Right Side: Quantity and Actions */}
                    <div className="item-info">
                    {errorMessage && (
                        <p className="error">{errorMessage}</p>
                    )}
                        <label className="item-label">Set Item Quantity</label>

                        {/* Quantity Controls */}
                        <div className="quantity-controls">
                            <button className="quantity-btn" onClick={() => handleQuantityChange('decrement')}>-</button>
                            <span className="quantity">{quantity}</span>
                            <button className="quantity-btn" onClick={() => handleQuantityChange('increment')}>+</button>
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons">
                            <button className="continue-btn" onClick={handleAddToCart}>Add to Cart</button>
                            <button className="checkout-btn" onClick={handleViewCart}>View Cart & Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
