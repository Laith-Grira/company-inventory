import { Link } from "react-router-dom";
import './CreateItem.css';


const CreateItem = () => {
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
                    <input type="text" className="form-control" id="item-name" placeholder="Item" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="item-price">Price</label>
                    <input type="number" className="form-control" id="item-price" placeholder="Price" min={0.01} step={0.01} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="item-count">Count</label>
                    <input type="number" className="form-control" id="item-count" placeholder="Count" min={0} required/>
                </div>
                <div className="form-group" >
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link
                        to="/">
                        <button className="btn btn-danger" id="cancel-button">Cancel</button>
                    </Link>
                </div>
                </form>
        </div>
     );
}
 
export default CreateItem;