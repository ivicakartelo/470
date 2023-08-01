import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Button, Table, Loader } from 'semantic-ui-react';
import axios from 'axios';
import Update from './Update';
import Create from './Create';


const Read = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [postToUpdate, setPostToUpdate] = useState(null); // New state for the post to be updated

  async function fetchPosts() {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://640114a00a2a1afebee5c77d.mockapi.io/post1`);
      const posts = response.data;
      setPosts(posts);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddNewPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://640114a00a2a1afebee5c77d.mockapi.io/post1/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (post) => {
    setPostToUpdate(post); // Set the post that needs to be updated
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
    setPostToUpdate(null); // Clear the post to update after updating it
  };

  return (
    <div className="container">
      <Link to="/">Home</Link> | { }
      <Link to="/read">Admin</Link>
      <Create addNewPost={handleAddNewPost} />

      {isLoading ? (
        <Loader active inline="centered" />
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
            {posts.slice().reverse().map((post) => (
              <React.Fragment key={post.id}>
                <Table.Row>
                  <Table.Cell>{post.id}</Table.Cell>
                  <Table.Cell>{post.heading}</Table.Cell>
                  <Table.Cell>{post.blogpost}</Table.Cell>
                  <Table.Cell>
                    <Button color="yellow" onClick={() => handleEdit(post)}>
                      Update
                    </Button>
                    <Button color="red" onClick={() => handleDelete(post.id)}>
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
                {postToUpdate && postToUpdate.id === post.id && ( // Conditional rendering for the Update form
                  <Table.Row>
                    <Table.Cell colSpan={4}> {/* Use colSpan to span the entire row */}
                      <Update
                        post={postToUpdate}
                        handleUpdatePost={handleUpdatePost}
                        setShowEditForm={setPostToUpdate} // Pass the setPostToUpdate function to close the form
                      />
                    </Table.Cell>
                  </Table.Row>
                )}
              </React.Fragment>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default Read;