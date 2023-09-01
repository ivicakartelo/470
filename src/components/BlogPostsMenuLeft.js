import { Link } from 'react-router-dom'
import React from 'react'

function BlogPostsMenuLeft({ posts }) {
  console.log(posts)

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

//export default BlogPostsMenuLeft;
export default React.memo(BlogPostsMenuLeft); // Memoize the component