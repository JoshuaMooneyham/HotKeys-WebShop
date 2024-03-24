import { GetProducts } from "../crud-requests/CrudRequests.jsx";
import { useState } from "react";
import FeaturedCard from '../featured-card/FeaturedCard.jsx';
import SearchBar from "../searchbar/SearchBar.jsx";



function ShoppingList({inputFromSearch, cart, setCart}){
    debugger;
    console.log('IFS', inputFromSearch)
    let [shoppingItems, setData] = useState([])
    shoppingItems = GetProducts()
    
    const searchResults = Object.keys(Object.assign({}, ...shoppingItems))
    function search(items){
        return items.filter((list) =>
        searchResults.some((object) =>
        list[object].toString().toLowerCase().includes(inputFromSearch)))
    }
    return(
        <div className ="allProducts">
        {shoppingItems.length > 0 && search(shoppingItems).map((items) => { 
        console.log("IDK", items);   
        <FeaturedCard productListing = {items} shoppingCart = {cart} addToCart = {setCart}/>
        })}
        </div>
        
    
     )
    
}



export default function HappyShopping ({cart, setCart}){
    let [allProducts, setData] = useState([])
    allProducts = GetProducts();
    const [barInput, setBarInput] = useState('');
    console.log('bar input', barInput);
    return(
        <div className="shopping-container">
            <div className="search">
            <SearchBar setInput={setBarInput}/>
            </div>
            <div className="shop-store">
            {barInput != '' ? <ShoppingList inputFromSearch={barInput} cart={cart} setCart={setCart}/> : <div className="allProducts">{allProducts.map((item)=> <FeaturedCard productListing={item} shoppingCart={cart} addToCart={setCart}/> )}</div>}
            </div>
        </div>
    )
}



// import { useState } from "react";

// function ShoppingList({item}){                          //Need to know what .something to pull from//
//     return (
//         <div className = "shopping.list">
//             <div>
//                 <img src = {item.picture}></img>
//             </div>
//             <div>
//                 <h3>{item.title}</h3>
//                 <p>{item.description}</p>
//                 <p>{item.price}</p>
//             </div>
//         </div>
//     )
// }
// //Need to add to pull from search bar///
// function FetchApi(){
//     const [items, setItems] = useState([]);
//     fetch('https://api.escuelajs.co/api/v1/products').then(response => response.json()).then(data => setItems(data));
//     return(
//         <div className = "shopping.container">
//             {items.map(item =>
//                 <ShoppingList item = {item}/>)}
//         </div>
//     )
    
// }