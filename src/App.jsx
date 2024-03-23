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

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  let [featured, setFeatured] = useState([])

  featured = randomizedCall();
  console.log(currentUser);
  console.log(featured);

  useEffect(() => { // pull current user from local storage
    const data = window.localStorage.getItem('currentUser');
    if (data !== undefined) {
    const obj = JSON.parse(data);
    setCurrentUser(obj);
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
      <TestHeader />
      <div className='container'>
        <Routes>
          <Route path='/' element={<LandingWelcome featured={featured}/>}/>
          <Route path='/cart' element={<TestCart />}/>
          {/* <Route path='/user' element={<TestUser />}/> */}
          <Route path='/user' element={currentUser == null ? <LogIn setCurUse={setCurrentUser} curUse={currentUser}/> : <MyAccount setCurUse={setCurrentUser} curUse={currentUser}/>}/>
        </Routes>
        {/* <NewProduct /> */}
        {/* <RenderAllItems /> */}
    </div>
    </>
  );
}

export default App;
