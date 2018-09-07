import React, { Component } from 'react';

import { Mutation } from 'react-apollo';

// queries
import { LIKE_GENEALOGY, GET_GENEALOGY, UNLIKE_GENEALOGY } from '../../queries';

// components
import withSession from '../withSession';

export class LikeGenealogy extends Component {
  state = { liked: false, username: '' };

  componentDidMount = () => {
    // console.log(this.props.session);

    if (this.props.session.getCurrentUser) {
      const { username, favorites } = this.props.session.getCurrentUser;
      // console.log(favorites);
      const { _id } = this.props;
      const prevLiked =
        favorites.findIndex(favorite => favorite._id === _id) > -1;

      this.setState({ liked: prevLiked, username });
    }
  };

  handleClick = (likeGenealogy, unlikeGenealogy) => {
    this.setState(
      prevState => ({ liked: !prevState.liked }),
      () => this.handleLike(likeGenealogy, unlikeGenealogy)
    );
  };

  handleLike = (likeGenealogy, unlikeGenealogy) => {
    if (this.state.liked) {
      // pass control of likeGenealogy to handleLike
      likeGenealogy().then(async ({ data }) => {
        // console.log(data);
        await this.props.refetch();
      });
    } else {
      // unlike recipe mutation
      unlikeGenealogy().then(async ({ data }) => {
        // console.log(data);
        await this.props.refetch();
      });
    }
  };

  updateLike = (cache, { data: { likeGenealogy } }) => {
    const { _id } = this.props;
    const { getGenealogy } = cache.readQuery({
      query: GET_GENEALOGY,
      variables: { _id },
    });

    cache.writeQuery({
      query: GET_GENEALOGY,
      variables: { _id },
      data: {
        getGenealogy: {
          ...getGenealogy,
          likes: likeGenealogy.likes + 1,
        },
      },
    });
  };

  updateUnlike = (cache, { data: { unlikeGenealogy } }) => {
    const { _id } = this.props;
    const { getGenealogy } = cache.readQuery({
      query: GET_GENEALOGY,
      variables: { _id },
    });

    cache.writeQuery({
      query: GET_GENEALOGY,
      variables: { _id },
      data: {
        getGenealogy: {
          ...getGenealogy,
          likes: unlikeGenealogy.likes - 1,
        },
      },
    });
  };

  render() {
    const { username, liked } = this.state;
    const { _id } = this.props;

    return (
      <Mutation
        mutation={UNLIKE_GENEALOGY}
        variables={{ _id, username }}
        update={this.updateUnlike}
      >
        {unlikeGenealogy => (
          <Mutation
            mutation={LIKE_GENEALOGY}
            variables={{ _id, username }}
            update={this.updateLike}
          >
            {likeGenealogy =>
              username && (
                <button
                  onClick={() =>
                    this.handleClick(likeGenealogy, unlikeGenealogy)
                  }
                  className="like-button"
                >
                  {liked ? 'Unlike' : 'Like'}
                </button>
              )
            }
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default withSession(LikeGenealogy);
