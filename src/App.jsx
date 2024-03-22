import LandingWelcome from './components/landing-welcome/LandingWelcome';
import Header from './components/header/Header';
import CreateEntry from './components/create-entry/CreateEntry';

function App() {
  return(
    <div className='app-container'>
      <Header/>
      <LandingWelcome />
      <CreateEntry />
    </div>
  );
}

export default App;
