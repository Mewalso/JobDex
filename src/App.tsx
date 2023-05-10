
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ChooseStarter from './pages/ChooseStarter';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/'/> */}
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/starter' element={<ChooseStarter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
