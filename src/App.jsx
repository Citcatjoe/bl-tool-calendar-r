import { useState } from 'react';
import './App.scss';
import Titlebar from './components/Titlebar/Titlebar';
import Calendar from './components/Calendar/Calendar';


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Titlebar />
      <Calendar />
    </div>
  );
}

export default App;
