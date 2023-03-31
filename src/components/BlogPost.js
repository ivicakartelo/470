import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BlogPost() {
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://640114a00a2a1afebee5c77d.mockapi.io/post1`)
      .then((response) => {
        setAPIData(response.data);
      });
  }, []);

  const params = useParams();
  const id = params.id;
  const blogpost = APIData.find((post) => post.id === id);

  if (!blogpost) {
    return <p>Blog post not found.</p>;
  }

  const paragraphs = blogpost.blogpost.split('\n');

  return (
    <>
    <h1>{blogpost.heading}</h1>
    {paragraphs.map((paragraph, index) => (
      <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
    ))}
  </>
  );
}

export default BlogPost;