import logo from './logo.svg';
import './App.css';
import {Button} from 'react-bootstrap';
import Login from './Components/Login';
import { BrowserRouter} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Login/>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
