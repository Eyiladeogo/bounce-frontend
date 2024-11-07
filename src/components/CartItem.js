import { useState } from 'react'
import shoe from '../assets/red-cement.png'
import api from '../utils/api'
import { AiTwotoneSafetyCertificate } from 'react-icons/ai'

export default function CartItem({ item, quantity, handleSetError, handleCartFetch }){

    const handleRemove = async() =>{
        const confirmRemoval = window.confirm('Are you sure you want to remove this item from your cart?')
        if (confirmRemoval){
            try {
                await api.delete(`cart/?item_id=${item.id}`, {'item_id': item.id})
                handleCartFetch()
            } catch (error) {
                console.error('Error while deleting cart item', error)
                handleSetError('Error while deleting cart item')
            }   
        }
        
    }

    const handleIncreaseQuantity = async() =>{
        try {
            await api.patch('cart/increase/', {"item_id": item.id})
            handleCartFetch()
        } catch (error) {
            console.error('Error while increasing item quantity', error)
            handleSetError('Error while increasing item quantity')
        }
    }

    const handleReduceQuantity = async() =>{
        try {
            await api.patch('cart/decrease/', {"item_id": item.id})
            handleCartFetch()
        } catch (error) {
            console.error('Error while decreasing item quantity', error)
            handleSetError('Error while decreasing item quantity')
        }
    }

    return(
        <div className="saved-item">
            <img src={item.image_url} alt={item.name} className="saved-item-image" />
            <div className="saved-item-details">
                <h3>{item.name}</h3>
                <p className="saved-item-price">${item.price}</p>
                <span className="cart-item-quantity"><button className="reduce-quantity" onClick={handleReduceQuantity}>-</button><p className="quantity">{quantity}</p><button className="increase-quantity" onClick={handleIncreaseQuantity}>+</button></span>
            </div>

            
            <button className="remove-saved-item" onClick={handleRemove}>Remove</button>
        </div>
    )
}