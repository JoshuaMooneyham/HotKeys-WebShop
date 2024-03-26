// // add routes to <Routes> and add a <Customlink> component to header to wire up additional pages
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { randomizedCall } from './components/landing-welcome/LandingWelcome'
import TestCart from './components/cart/Cart';
import LandingWelcome from './components/landing-welcome/LandingWelcome';
import TestHeader from './components/header/nates-test-header';
import { LogIn } from './components/create-entry/CreateEntry';
import MyAccount from './components/my-account/MyAccount';
import HappyShopping from './components/Shopping/ShoppingDisplay';

function App({featured}) {
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

  return(
    <>
      <div className='overall-app-container'>
        <TestHeader />
        <div className='container'>
          <Routes>
            <Route path='/' element={<LandingWelcome featured={featured} shoppingCart={cart} addToCart={setCart}/>}/>
            <Route path='/shopping' element={<HappyShopping cart={cart} setCart={setCart}/>}/>
            <Route path='/cart' element={<TestCart cart={cart} setCart={setCart}/>}/>
            <Route path='/user' element={currentUser == null ? <LogIn setCurUse={setCurrentUser} curUse={currentUser}/> : <MyAccount setCurUse={setCurrentUser} curUse={currentUser}/>}/>
          </Routes>
        </div>
      </div>
    </>
  );
}

function App2() {
  let [featured, setFeatured] = useState([]);
  featured = randomizedCall();
  console.log('test');

  return(
    <div className="lol">
      {featured.length > 0 && <App featured={featured}/>}
    </div>
  );

}

export default App2;
