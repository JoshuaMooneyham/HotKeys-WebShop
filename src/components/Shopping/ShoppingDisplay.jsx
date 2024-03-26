import { GetProducts } from "../crud-requests/CrudRequests.jsx";
import { useState } from "react";
import FeaturedCard from '../featured-card/FeaturedCard.jsx';
import SearchBar from "../searchbar/SearchBar.jsx";


//==========={ Display shopping list after search input }============//
function ShoppingList({inputFromSearch, cart, setCart}){
    debugger;
    let [shoppingItems, setData] = useState([])
    shoppingItems = GetProducts()
    
    const searchResults = Object.keys(Object.assign({}, ...shoppingItems))
    function search(items){
        return items.filter((list) =>
        searchResults.some((object) =>
        list[object].toString().toLowerCase().includes(inputFromSearch)))
    }
    console.log('input from barsearch', inputFromSearch)
    console.log('shopping item', shoppingItems)
    return(
        <div className ="allProducts">
        {shoppingItems.length > 0 && search(shoppingItems).map((items) => <FeaturedCard productListing={items} shoppingCart={cart} addToCart={setCart}/>
        )}  
        </div>
   
        
    
     )
    
}



export default function HappyShopping ({cart, setCart}){
    let [allProducts, setData] = useState([])
    allProducts = GetProducts();
    const [barInput, setBarInput] = useState('');
    return(
        <div className="shopping-container">
            <div className="search">
            <SearchBar setInput={setBarInput}/>
            </div>
            <div className="shop-store">
            {barInput != '' ? <ShoppingList inputFromSearch={barInput} cart={cart} setCart={setCart}/> : <div className="allProducts">{allProducts.map((item)=> <FeaturedCard productListing={item} shoppingCart={cart} addToCart={setCart}/> )}</div>}
            </div>
        </div>
                       //^ this will make it display all items until search input//
    )
}