import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {


    // Grouping the API data insude of an array of objects.
    let [itemsArray, setItemsArray] = useState([]);

    // Input in the search bar by the user
    const [searchItemName, setSearchItemName] = useState("");

    // React hook to fetch the data
    useEffect(() => {
        axios.get('/items')
            .then(res => setItemsArray(res.data.items))
            .catch(err => console.error(err));
    }, []);

    // Helper function for the delete request
    const handleItemDelete = async (id, name) => {
        if (confirm("Are you sure to delete the item " + name + " ?") == true) {
            await axios.delete('/items/'+id).then(res => console.log(res));
            window.location.reload();
        }
    }

    
    return ( 
        <div className='main-home'>
            <h1 className='mb-5'>Welcome to the Shopify Inventory</h1>
            <div className="create-item mb-5">
                <p>Welcome to the Shopify tech inventory. The table bellow contains all the equipments' name, price, and 
                    count (how much available in the inventory). You are also able to use the search bar to filter the items
                    by name. You can check all equipments, edit them or delete them. You can also use the "New" button to 
                    create a new item.</p>
                <label><b>Create a new Item: </b></label>
                <Link to="/create" className="btn btn-info" style={{ 'marginLeft': '20px'}}>NEW</Link>
            </div>
            <input
                type="text"
                className="form-control mb-2"
                placeholder='Search...'
                onChange={event => setSearchItemName(event.target.value)}
                />
            <table className="table table-hover" >
                <thead className="thead-dark table-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Count</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        itemsArray
                            .filter(val => {
                                if (searchItemName == "") return val;
                                else if (val.name.toLowerCase().includes(searchItemName.toLowerCase().trim())) return val;
                            })
                            .map((data, key) => (
                            <tr key={key}>
                                <td >{data.name}</td>
                                <td>{data.price}</td>
                                <td>{data.count}</td>
                                <td><Link className="btn btn-secondary" to={"/edit"} state={{item: data}} >Edit</Link></td>
                                <td><button className="btn btn-danger" onClick={() => handleItemDelete(data._id, data.name)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
     );
}
 
export default HomePage;