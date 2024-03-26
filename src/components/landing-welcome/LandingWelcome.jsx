import { useState } from 'react';
import { GetProducts, GetUsers } from '../crud-requests/CrudRequests.jsx';
import FeaturedCard from '../featured-card/FeaturedCard.jsx';
// ====={ Randomly pulls 6 unique products }=====
export function randomizedCall() {

    const results = GetProducts();
    const RANDOMLIST = [];

    while (results.length !== 0 && RANDOMLIST.length < 6) {
        let randomNumber = Math.floor(Math.random()*results.length);

        if (RANDOMLIST.includes(results[randomNumber])) {
            continue;
        } else {
            RANDOMLIST.push(results[randomNumber]);
        }
    } 
    return RANDOMLIST;
}

// ====={ displays the welcome landing page and featured items }=====
function LandingWelcome({featured, shoppingCart, addToCart}) {

    let products = GetProducts();
    let users = GetUsers();
    // console.log('users', users);
    // console.log('products', products);

    return (
        <div className='welcome-container'>
            <div className="grid1" ><img className='welcome-banner' src='sale2.png'/></div>
            <div className='featured-title'><h2 className="sectionHeader">FEATURED</h2></div>
            <div className='featured'>
                {featured.length > 0 ? featured.map(indiv => <FeaturedCard key={featured.indexOf(indiv)} productListing={indiv} shoppingCart={shoppingCart} addToCart={addToCart}/>) : 'Loading..'}
            </div>
        </div>
    );
}

export default LandingWelcome;