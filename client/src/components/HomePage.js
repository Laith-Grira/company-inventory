import './HomePage.css';

const HomePage = () => {

    const itemsArray = [
        {
            _id: "ab24cab57a",
            name: "Keyboard",
            price: 20.55,
            count: 20
        },
        {
            _id: "zd89aab50b",
            name: "Mouse",
            price: 15.99,
            count: 44
        },
        {
            _id: "cz24caa99c",
            name: "headphones",
            price: 40.95,
            count: 13
        }
    ]

    return ( 
        <div>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Count</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {
                    itemsArray.map((data, key) => (
                        <tr id={key}>
                            <td>{data.name}</td>
                            <td>{data.price}</td>
                            <td>{data.count}</td>
                            <td><button>Edit</button></td>
                            <td><button>Delete</button></td>
                        </tr>
                    ))
                }
                </table>
        </div>
     );
}
 
export default HomePage;