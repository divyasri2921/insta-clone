import './App.scss'
import Home from './pages/Home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Profile from './pages/profile/Profile'
function App() {
  const [active, setActive] = useState(false)
  const [postActive, setPostActive] = useState(false)
  const user = useSelector((state)=>state.user.user)
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={user ? <Home active={active} setActive={setActive} postActive={postActive} setPostActive={setPostActive}/> : <Navigate to="/login"/>}/>
          <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
          <Route path="/register" element={!user ? <Register/> : <Navigate to="/"/>}/>
          <Route path={user && `/${user.username}`} element={user ? <Profile/> : <Navigate to="/login"/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
