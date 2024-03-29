import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Button, Table, Loader } from 'semantic-ui-react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
//import Button from '@mui/material/Button';
import axios from 'axios';
import Update from './Update';
import Create from './Create';

const Read = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts)
  const [showEditForm, setShowEditForm] = useState(false);
  console.log(showEditForm)
  const [updateId, setUpdateId] = useState('');
  console.log(updateId)
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading)

  async function fetchPosts() {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://640114a00a2a1afebee5c77d.mockapi.io/post1`);
      const posts = response.data;
      setPosts(posts);
      setIsLoading(false);
      //alert("Read.js finished rendering")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {fetchPosts()}, [])

  const handleAddNewPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://640114a00a2a1afebee5c77d.mockapi.io/post1/${id}`);
      setPosts(posts.filter(post => post.id !== id));
    } catch
    (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {
    setUpdateId(id);
    setShowEditForm(true);
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
    setShowEditForm(false);
  };

  return (
    <div className="container">
      <Link to="/">Home</Link> | { }
      <Link to="/read">Admin</Link>
      <Create addNewPost={handleAddNewPost} />
      
      {isLoading ? (
        <Loader active inline='centered' />
      ) : (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Heading</Table.HeaderCell>
              <Table.HeaderCell>Blogpost</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {posts.slice().reverse().map(post => ( // use slice() to create a copy of the array before reversing it
              <Table.Row key={post.id}>
                <Table.Cell>{post.id}</Table.Cell>
                <Table.Cell>{post.heading}</Table.Cell>
                <Table.Cell>{post.blogpost}</Table.Cell>
                <Table.Cell >
                  {showEditForm && updateId === post.id ? (
                  <Update
                      post={post}
                      handleUpdatePost={handleUpdatePost}
                      setShowEditForm={setShowEditForm}
                    />
                  ) : (
                    <Button color='yellow' onClick={() => handleUpdate(post.id)}>
                      Update
                    </Button>
                  )
                  
                  }
                  <Button color='red' onClick={() => handleDelete(post.id)}>Delete</Button>
                  </Table.Cell>
                  </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};
export default Read;