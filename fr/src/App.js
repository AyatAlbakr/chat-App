import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import Login from './componants/Login';
import Main from './componants/Main';

function App() {
  return (
    <BrowserRouter> 
      <div className="App">
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/chatArea" element={<Main  />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

