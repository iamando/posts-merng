import React, { useState, Fragment } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

// GraphQL Query
import { FETCH_POSTS_QUERY } from "../utils/GraphQL";

const PostForm = (props) => {
  const [values, setValues] = useState({
    body: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    update(proxy, result) {
      var data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      var posts;
      if (data) {
        posts = data.getPosts;
      }
      posts = [result.data.createPost, ...data.getPosts];
      data = posts;
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data,
      });
      values.body = "";
    },
    variables: values,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    createPost();
    window.location.reload();
    return false;
  };

  return (
    <Fragment>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Enter a post"
            name="body"
            onChange={onChange}
            values={values.body}
            required
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </Fragment>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
