import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Admin from './Admin';
import LogoutButton from './LogoutButton';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import CreateTravel from './CreateTravel';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/logout' element={<LogoutButton />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/create-user' element={<CreateUser />}></Route>
          <Route path='/update-user/:userId' element={<UpdateUser />}></Route>
          <Route path='/create-travel' element={<CreateTravel />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
