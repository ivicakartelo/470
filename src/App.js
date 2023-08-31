import { Link, Outlet } from 'react-router-dom'
import BlogPostsMenuLeft from './components/BlogPostsMenuLeft';
import "./App.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginModal from './components/LoginModal' 

function App() {

  const [posts, setPosts] = useState([]);
  console.log(posts)

  useEffect(() => {
    alert("App.js finished rendering")
    console.log("App.js finished rendering")
    axios.get(`https://640114a00a2a1afebee5c77d.mockapi.io/post1`)
        .then((response) => {
            setPosts(response.data);
        })
}, [])

    const simplifiedPosts = [...posts].sort((a, b) => b.id - a.id).map(({ id, heading }) => ({ id, heading }));

  return (
    <div className="container">
      <div className="grid_6 last">
        <Link to="/">Home</Link> | { }
        <Link to="/read">Admin</Link> | { }
        <LoginModal />
      </div>
      <div className="grid_2">
      {posts.length > 0 ? ( // Check if 'posts' has data
          <BlogPostsMenuLeft posts={simplifiedPosts} />
        ) : (
          <p>Loading...</p> // Display a loading message while fetching data
        )}
      </div>
      <div className="grid_4 last">
        <Outlet />
      </div>
    </div> 
  )
}
export default App