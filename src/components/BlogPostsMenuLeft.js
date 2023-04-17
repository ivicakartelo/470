import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function BlogPostsMenuLeft({ blogposts }) {
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    const sorted = [...blogposts].sort((a, b) => b.id - a.id);
    setSortedPosts(sorted);
    //alert("BlogPostsMenuLeft.js finished rendering");
  }, [blogposts]);

  return (
    <ul>
      {sortedPosts.map((post) => (
        <li key={post.id}>
          <Link to={`/${post.id}`}>{post.heading}</Link>
        </li>
      ))}
    </ul>
  );
}

export default BlogPostsMenuLeft;