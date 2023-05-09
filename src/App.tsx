
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

import './App.css';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'/>
        <Route path='/login' element={<Login />} />
        <Route path='/Home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
