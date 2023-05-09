import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/Login';
import Home from './pages/Home';

import './App.css'

function App() {
  const [session, setSession] = useState<boolean | undefined>(undefined);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={session ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
        <Route 
          path="/login" element={<LoginPage />}
        />
        <Route
          path="/home"
          element={<Home />}
        />
      </Routes>
    </BrowserRouter>

  )
}

export default App;
