import './App.css';
import './bootstrap-css/bootstrap.css';
import { useEffect, useState } from 'react'
import TeamName from './components/TeamName';
import Starters from './components/Starters';


function App() {

  const [appData, setAppData] = useState([])
  // we also need to initialize component state with useState

  async function getAppData() {
    let test = 'oh yea im, testing my guy';
  }

  useEffect(() => {
    getAppData()
  }, [])

  return (
    <div className="App">
      <div className="container">
        <TeamName />
        <Starters />
      </div>
    </div>
  );
}

export default App;
