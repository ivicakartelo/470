import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function BlogPostsMenuLeft({ posts }) {
  //const [sortedPosts, setSortedPosts] = useState([]);
  console.log(posts)
  //console.log(sortedPosts)
  /*
  useEffect(() => {
    alert("BlogPostsMenuLeft.js finished rendering");
    console.log("BlogPostsMenuLeft.js finished rendering")
    const sorted = [...posts].sort((a, b) => b.id - a.id);
    setSortedPosts(sorted);
  }, [posts]);
  */
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/${post.id}`}>{post.heading}</Link>
        </li>
      ))}
    </ul>
  );
}

export default BlogPostsMenuLeft;