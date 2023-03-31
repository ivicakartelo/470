import React, { useState } from 'react';
import { Button, Form, Input, TextArea, Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';

const Update = ({ post, handleUpdatePost, setShowEditForm }) => {
  const [heading, setHeading] = useState(post.heading);
  const [blogpost, setBlogpost] = useState(post.blogpost);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.put(`https://640114a00a2a1afebee5c77d.mockapi.io/post1/${post.id}`, {
        heading,
        blogpost
      });
      handleUpdatePost({
        id: post.id,
        heading,
        blogpost
      });
      setShowEditForm(false);
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