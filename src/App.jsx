import { Route, Routes } from 'react-router-dom';

// test components please ignore //
import TestCart from './components/nates-test-components/Cart';
import TestUser from './components/nates-test-components/User';


import LandingWelcome from './components/landing-welcome/LandingWelcome';
import Header from './components/header/Header';
import TestHeader from './components/header/nates-test-header';

// add routes to <Routes> and add a <Customlink> component to header to wire up additional pages
import { LogIn, NewProduct, NewUser } from './components/create-entry/CreateEntry';

import RenderAllItems from './components/delete-entry/DeleteEntry';
import { useState } from 'react';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  console.log(currentUser);

  return(
    <>
      <TestHeader />
      <div className='container'>
        <Routes>
          <Route path='/' element={<LandingWelcome />}/>
          <Route path='/cart' element={<TestCart />}/>
          {/* <Route path='/user' element={<TestUser />}/> */}
          <Route path='/user' element={currentUser == null ? <LogIn setCurUse={setCurrentUser} curUse={currentUser}/> : <h1>Welcome {currentUser.name}</h1>}/>
        </Routes>
        {/* <NewProduct /> */}
        {/* <RenderAllItems /> */}
        {/* <NewUser /> */}
        {/* <LogIn setCurUse={setCurrentUser} curUse={currentUser}/> */}
    </div>
    </>
  );
}

export default App;
