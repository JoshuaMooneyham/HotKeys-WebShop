// // add routes to <Routes> and add a <Customlink> component to header to wire up additional pages
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TestCart from './components/cart/Cart';
import LandingWelcome, { randomizedCall } from './components/landing-welcome/LandingWelcome';
import TestHeader from './components/header/nates-test-header';
import { LogIn } from './components/create-entry/CreateEntry';
import MyAccount from './components/my-account/MyAccount';
import HappyShopping from './components/Shopping/ShoppingDisplay';

function App({featured}) {
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);

  // pull current user from local storage

  useEffect(() => { 
    const data = window.localStorage.getItem('currentUser');
    if (data !== undefined) {
    const obj = JSON.parse(data);
    setCurrentUser(obj);
    }
  }, [])

  // pull cart items from local storage

  useEffect(() => { 
    const data = window.localStorage.getItem('cartItems');
    if (data !== undefined) {
    const obj = JSON.parse(data);
    setCart(obj);
    }
  }, [])

  // push current user to local storage on change

  useEffect(() => { 
    window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser])

  // push current cart items
  
  useEffect(() => { 
    window.localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart])

  return(
    <>
      <div className='overall-app-container'>
        <TestHeader />
        <div className='container'>
          <Routes>
            <Route path='/' element={<LandingWelcome featured={featured} shoppingCart={cart} addToCart={setCart}/>}/>
            <Route path='/shopping' element={<HappyShopping cart={cart} setCart={setCart}/>}/>
            <Route path='/cart' element={<TestCart cart={cart} setCart={setCart}/>}/>
            <Route path='/user' element={currentUser == null ? <LogIn setCurUse={setCurrentUser}/> : <MyAccount setCurUse={setCurrentUser} curUse={currentUser}/>}/>
          </Routes>
        </div>
      </div>
    </>
  );
}

function App2() {
  let [featured, setFeatured] = useState([]);
  featured = randomizedCall()

  return(
    <div className="lol">
      {featured.length > 0 && <App featured={featured}/>}
    </div>
  );

}

export default App2;
