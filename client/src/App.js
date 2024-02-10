import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Admin from './Admin';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
