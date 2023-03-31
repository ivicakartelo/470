import { Link, Outlet } from 'react-router-dom'
import BlogPostsMenuLeft from './components/BlogPostsMenuLeft';
import "./App.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginModal from './components/LoginModal' 

function App() {

  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    axios.get(`https://640114a00a2a1afebee5c77d.mockapi.io/post1`)
        .then((response) => {
            setAPIData(response.data);
            alert("App.js finished rendering")
        })
}, [])

  return (
    <div className="container">
      <div className="grid_6 last">
        <Link to="/">Home</Link> | { }
        <Link to="/read">Admin</Link> | { }
        <LoginModal />
      </div>
      <div className="grid_2">
        <BlogPostsMenuLeft blogposts={ APIData }/>
      </div>
      <div className="grid_4 last">
        <Outlet />
      </div>
    </div> 
  )
}
export default App