import React, { useState } from 'react';
import { Button, Form, Input, TextArea, Dimmer, Loader } from 'semantic-ui-react';

const Update = ({ post, handleUpdatePost, setShowEditForm }) => {
  const [heading, setHeading] = useState(post.heading);
  const [blogpost, setBlogpost] = useState(post.blogpost);
  const [loading, setLoading] = useState();

  const handleSubmit = async () => {
  try {
    setLoading(true);
    const response = await fetch(`https://640114a00a2a1afebee5c77d.mockapi.io/post1/${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        heading,
        blogpost
      })
    });
    if (response.ok) {
      const updatedPost = {
        id: post.id,
        heading,
        blogpost
      };
      handleUpdatePost(updatedPost)
    } else {
      throw new Error('Failed to update post.');
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Heading</label>
        <Input
          placeholder='Heading'
          value={heading}
          onChange={e => setHeading(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Blogpost</label>
        <TextArea
          placeholder='Blogpost'
          value={blogpost}
          onChange={e => setBlogpost(e.target.value)}
        />
      </Form.Field>
      {loading ?
        <Dimmer active>
          <Loader />
        </Dimmer>
        :
        <>
          <Button type='submit' color='green'>Update</Button>
          <Button type='button' onClick={() => setShowEditForm(false)}>Cancel</Button>
        </>
      }
    </Form>
  );
};

export default Update;