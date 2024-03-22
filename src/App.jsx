import LandingWelcome from './components/landing-welcome/LandingWelcome';
import Header from './components/header/Header';
import CreateEntry from './components/create-entry/CreateEntry';
import RenderAllItems from './components/delete-entry/DeleteEntry';
import { GetData } from './components/crud-requests/CrudRequests';

function App() {
  const data = GetData();
  return(
    <div className='app-container'>
      <Header/>
      <LandingWelcome />
      <CreateEntry />
      <RenderAllItems ITEMS={data}/>
    </div>
  );
}

export default App;
