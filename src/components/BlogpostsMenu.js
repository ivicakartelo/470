import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BlogpostsMenu() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
            axios.get(`https://640114a00a2a1afebee5c77d.mockapi.io/post1`)
            .then((response) => {
                const sortedData = response.data.sort((a, b) => b.id - a.id);
                setPosts(sortedData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            {posts.map((post) => (
                <div key={post.id}> 
                    <h1>
                        <Link to={`/${post.id}`}>
                            {post.heading}
                        </Link>
                    </h1>
                    <p>{post.blogpost?.substring(0, 150)}...</p>
                </div> 
            ))}
        </>
    ) 
}

export default BlogpostsMenu