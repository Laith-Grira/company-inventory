import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';


const EditItem = () => {

    // State passed from the home page
    const location = useLocation();
    const oldItem = Object.assign({}, location.state.item);

    // Input values by the user
    const [nameValue, setNameValue] = useState(oldItem.name);
    const [priceValue, setPriceValue] = useState(oldItem.price);
    const [countValue, setCountValue] = useState(oldItem.count);

    // Handle the Patch Request
    const handlePatch = async () => {
        if ((nameValue === '') || (priceValue <= 0) || (countValue <= 0)) {
            alert('Error. Could not edit item, please respect the constraints while editing any field.')
            return;
        }

        const patchedItem = [
            { "propName": "name", "value": nameValue },
            { "propName": "price", "value": priceValue },
            { "propName": "count", "value": countValue }
            
        ]

        await axios.patch('/items/'+oldItem._id, patchedItem)
                    .then(() => {
                        alert('The item was edited successfully!');
                       
                    })
                    .catch(err => console.log(err));
    }

    return ( 
        <div className="create-main">
            <h1>Edit the Item "{oldItem.name}"</h1>
            <form>
                <div className="form-group">
                    Edit the item by changing any of the values like the <b>Name</b> of the item, the <b>Price</b>, and the <b>Count</b> which 
                    is the number of items available in the inventory
                </div>
                <div className="form-group">
                    <label htmlFor="item-name">Item Name</label>
                    <input type="text" className="form-control" name="name" id="item-name" placeholder="Item" value={nameValue} onChange={(e) => setNameValue(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="item-price">Price</label>
                    <input type="number" className="form-control" name="price" id="item-price" placeholder="Price" value={priceValue} min={0.01} step={0.01} required onChange={(e) => setPriceValue(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="item-count">Count</label>
                    <input type="number" className="form-control" name="count" id="item-count" placeholder="Count" value={countValue} min={0} required onChange={(e) => setCountValue(e.target.value)}/>
                </div>
                <div className="form-group" >
                    <Link to="/" type="submit" className="btn btn-primary" onClick={handlePatch}>Edit</Link>
                    <Link to="/" className="btn btn-danger" id="cancel-button">Go Back</Link>
                </div>
            </form>
        </div>
     );
}
 
export default EditItem;