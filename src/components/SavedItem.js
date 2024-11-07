// import shoe from '../assets/red-cement.png'
import api from "../utils/api"

export default function SavedItem({item, handleSetError, handleSavedFetch}){

    const handleRemove = async() =>{
        const confirmRemoval = window.confirm('Are you sure you want to remove this item from your saved items?')
        if (confirmRemoval){
            try {
                await api.delete(`saved/?item_id=${item.id}`, {'item_id': item.id})
                handleSavedFetch()
            } catch (error) {
                console.error('Error while deleting saved item', error)
                handleSetError('Error while deleting saved item')
            }   
        }
        
    }

    return(
        <div className="saved-item">
            <img src={item.image_url} alt={item.name} className="saved-item-image" />
            <div className="saved-item-details">
                <h3>{item.name}</h3>
                <p className="saved-item-price">${item.price}</p>
            </div>
            
            <button className="remove-saved-item" onClick={handleRemove}>Remove</button>
        </div>
    )
}