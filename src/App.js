import './App.css';
import './bootstrap-css/bootstrap.css';
import { useEffect, useState } from 'react'
import TeamName from './components/TeamName';
import League from './components/League';


function App() {

  const [appData, setAppData] = useState([])
  // we also need to initialize component state with useState

  async function getAppData() {
    console.log('hello');
  }

  useEffect(() => {
    getAppData()
  }, [])

  return (
    <div className="App">
      <div className="container">
        <TeamName />
        <League/>
      </div>
    </div>
  );
}

export default App;
