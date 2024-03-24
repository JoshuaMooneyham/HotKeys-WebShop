import { GetProducts } from "../crud-requests/CrudRequests.jsx";
import { useState } from "react";
// import {FaSearch} from "react-icons/fa";


export const SearchBar = () => {
    const [input, setInput] = useState("");
    const shoppingItems = GetProducts()
    const handleChange = (event) => {
        setInput(event.target.value);
     
    }
    return(
        <div className = "searchBarContainer">
            <div className="input-wrapper">
                {/* <FaSearch id="search-icon"/> */}
                <input placeholder="Type to search..."
                  value={input}
                  onChange={handleChange}/>
            </div>
            <div className= "shoppingResults">
                <div>
                    <img src = {shoppingItems.picture}></img>
                </div>
                <div>
                    <h3>{shoppingItems.title}</h3>
                    <p>{shoppingItems.description}</p>
                    <p>{shoppingItems.price}</p>
                    {/* <button className="featured-card-button" onClick={getShoppingItemsId}>{shoppingCart.includes(shoppingItems) ? 'Added!' : 'Add to Cart'}</button> */}
                </div>
            </div>
        </div>
    )
}