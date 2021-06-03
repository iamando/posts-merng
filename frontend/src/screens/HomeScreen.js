import React, { Fragment, useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

// GraphQL Query
import { FETCH_POSTS_QUERY } from "../utils/GraphQL";

// Components
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  var posts;

  if (data) {
    posts = data.getPosts;
  }

  return (
    <Fragment>
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row className="page-input-form">
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <div className="loader-container">
              <Loader />
            </div>
          ) : (
            <Transition.Group>
              {posts &&
                posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default HomeScreen;
