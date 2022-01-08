import { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {


    // Grouping the API data insude of an array of objects.
    let [itemsArray, setItemsArray] = useState([]);

    // React hook to fetch the data
    useEffect(() => {
        axios.get('/items')
            .then(res => setItemsArray(res.data.items))
            .catch(err => console.error(err));
    }, []);

    
    return ( 
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Count</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        itemsArray.map((data, key) => (
                            <tr key={key}>
                                <td>{data.name}</td>
                                <td>{data.price}</td>
                                <td>{data.count}</td>
                                <td><button>Edit</button></td>
                                <td><button>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
     );
}
 
export default HomePage;