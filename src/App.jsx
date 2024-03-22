import { Route, Routes } from 'react-router-dom';

// test components please ignore //
import TestCart from './components/nates-test-components/Cart';
import TestUser from './components/nates-test-components/User';


import LandingWelcome from './components/landing-welcome/LandingWelcome';
import Header from './components/header/Header';
import TestHeader from './components/header/nates-test-header';

// add routes to <Routes> and add a <Customlink> component to header to wire up additional pages

function App() {
  return(
    <>
      <TestHeader />
      <div className='container'>
        <Routes>
          <Route path='/' element={<LandingWelcome />}/>
          <Route path='/cart' element={<TestCart />}/>
          <Route path='/user' element={<TestUser />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
