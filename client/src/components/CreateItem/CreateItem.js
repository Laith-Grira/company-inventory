import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import './CreateItem.css';


const CreateItem = () => {

    // Input values by the user
    const [nameValue, setNameValue] = useState('');
    const [priceValue, setPriceValue] = useState(0);
    const [countValue, setCountValue] = useState(0);

    // Helper function for the POST request
    const handlePost = async () => {
        if ((nameValue === '') || (priceValue <= 0) || (countValue <= 0)) {
            return;
        }

        const item = {
            name: nameValue,
            price: priceValue,
            count: countValue
        }
        
        await axios.post('/items', item)
                    .then(alert('Item was created successfully! \n You can create a new Item or you can "Go Back"'))
                    .catch(err => console.log(err));
    }

    return ( 
        <div className="create-main">
            <h1>Create new Item</h1>
            <form>
                <div className="form-group">
                    Create a new item by inserting the <b>Name</b> of the item, the <b>Price</b>, and the <b>Count</b> which 
                    is the number of items available in the inventory
                </div>
                <div className="form-group">
                    <label htmlFor="item-name">Item Name</label>
                    <input type="text" className="form-control" name="name" id="item-name" placeholder="Item" onChange={(e) => setNameValue(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="item-price">Price</label>
                    <input type="number" className="form-control" name="price" id="item-price" placeholder="Price" min={0.01} step={0.01} required onChange={(e) => setPriceValue(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="item-count">Count</label>
                    <input type="number" className="form-control" name="count" id="item-count" placeholder="Count" min={0} required onChange={(e) => setCountValue(e.target.value)}/>
                </div>
                <div className="form-group" >
                    <button type="submit" className="btn btn-primary" onClick={handlePost}>Submit</button>
                    <Link to="/" className="btn btn-danger" id="cancel-button">Go Back</Link>
                </div>
            </form>
        </div>
     );
}
 
export default CreateItem;