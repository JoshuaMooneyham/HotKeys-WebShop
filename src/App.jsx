import { Route, Routes } from 'react-router-dom';

// test components please ignore //
import TestCart from './components/nates-test-components/Cart';
import TestUser from './components/nates-test-components/User';


import LandingWelcome, { randomizedCall } from './components/landing-welcome/LandingWelcome';
import Header from './components/header/Header';
import TestHeader from './components/header/nates-test-header';

// add routes to <Routes> and add a <Customlink> component to header to wire up additional pages
import { LogIn, NewProduct, NewUser } from './components/create-entry/CreateEntry';

import RenderAllItems from './components/delete-entry/DeleteEntry';
import { useState, useEffect } from 'react';
import MyAccount from './components/my-account/MyAccount';
import { GetProducts } from './components/crud-requests/CrudRequests';
import { SearchBar } from './components/Shopping/ShoppingDisplay';

function App({featured}) {
  // let [featured, setFeatured] = useState([])
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);

  console.log('user', currentUser);
  console.log('featured', featured);
  console.log('cart', cart);


  useEffect(() => { // pull current user from local storage
    const data = window.localStorage.getItem('currentUser');
    if (data !== undefined) {
    const obj = JSON.parse(data);
    setCurrentUser(obj);
    }
  }, [])

  useEffect(() => { // pull cart items from local storage
    const data = window.localStorage.getItem('cartItems');
    if (data !== undefined) {
    const obj = JSON.parse(data);
    setCart(obj);
    }
  }, [])

  useEffect(() => { // push current user to local storage on change
    window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
    console.log('saved');
  }, [currentUser])

  useEffect(() => { // push current cart items
    window.localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart])

  //change//
  return(
    <>
      <div className='overall-app-container'>
        <TestHeader />
        <div className='container'>
          <Routes>
            <Route path='/' element={<LandingWelcome featured={featured} shoppingCart={cart} addToCart={setCart}/>}/>
            <Route path='/cart' element={<TestCart cart={cart} setCart={setCart}/>}/>
            {/* <Route path='/user' element={<TestUser />}/> */}
            <Route path='/user' element={currentUser == null ? <LogIn setCurUse={setCurrentUser} curUse={currentUser}/> : <MyAccount setCurUse={setCurrentUser} curUse={currentUser}/>}/>
          </Routes>
          {/* <NewProduct /> */}
          {/* <RenderAllItems /> */}
        </div>
      </div>
    </>
  );
}

function App2() {
  let [featured, setFeatured] = useState([]);
  featured = randomizedCall();

  return(
    <div className="lol">
      {featured.length > 0 && <App featured={featured}/>}
    </div>
  )

}

export default App2;
