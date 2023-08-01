import React, { useState } from 'react';
import { Button, Form, Loader } from 'semantic-ui-react';
import axios from 'axios';

const Create = ({ addNewPost }) => {
  const [heading, setHeading] = useState('');
  const [blogpost, setBlogpost] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const postData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://640114a00a2a1afebee5c77d.mockapi.io/post1`,
        {
          heading,
          blogpost,
        }
      );
      addNewPost(response.data);
      setIsLoading(false);
      setHeading('')
      setBlogpost('')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form>
      <Form.Field>
        <label>heading</label>
        <input
          placeholder='heading'
          onChange={(e) => setHeading(e.target.value)}
          value={heading}
        />
      </Form.Field>
      <div className='ui form'>
        <div className='field'>
          <label>blogpost</label>
          <textarea
            placeholder='blogpost'
            onChange={(e) => setBlogpost(e.target.value)}
            value={blogpost}
          ></textarea>
        </div>
      </div>
      {isLoading ? (
        <Loader active inline='centered' />
      ) : (
        <Button onClick={postData} type='submit'>
          Submit
        </Button>
      )}
    </Form>
  );
};

export default Create;