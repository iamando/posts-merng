import React, { Fragment, useState } from "react";
import { Button, Icon, Confirm, Popup } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { FETCH_POSTS_QUERY } from "../utils/GraphQL";

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        var data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        var posts;
        if (data) {
          posts = data.getPosts;
        }
        posts = posts.filter((p) => p.id !== postId);
        data = posts;
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data,
        });
      }
      if (callback) callback();
      window.location.reload();
      return false;
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <Fragment>
      <Popup
        content={commentId ? "Delete comment" : "Delete post"}
        inverted
        trigger={
          <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => setConfirmOpen(true)}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        }
      />

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </Fragment>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
