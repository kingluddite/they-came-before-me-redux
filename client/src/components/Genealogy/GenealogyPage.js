import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import Spinner from '../Spinner';

// components
import LikeGenealogy from '../Genealogy/LikeGenealogy';

// queries
import { GET_GENEALOGY } from '../../queries';

const GenealogyPage = ({ match }) => {
  const { _id } = match.params;
  // console.log(match.params._id);
  return (
    <Query query={GET_GENEALOGY} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <Spinner />;
        if (error) return <div>Error</div>;
        // console.log(data);

        return (
          <div className="App">
            <div
              style={{
                background: `url(${
                  data.getGenealogy.imageUrl
                }) center center / cover no-repeat`,
              }}
              className="genealogy-image"
            />

            <div className="genealogy">
              <div className="genealogy-header">
                <h2 className="genealogy-name">
                  <strong>
                    {data.getGenealogy.firstName} {data.getGenealogy.lastName}
                  </strong>
                </h2>
                <h5>
                  <strong>{data.getGenealogy.category}</strong>
                </h5>
                <p>
                  Created by <strong>{data.getGenealogy.username}</strong>
                </p>
                <p>
                  {data.getGenealogy.likes}{' '}
                  <span role="img" aria-label="heart">
                    ❤️
                  </span>
                </p>
              </div>
              <blockquote
                className="analogy-description"
                dangerouslySetInnerHTML={{
                  __html: data.getGenealogy.description,
                }}
              />
              <LikeGenealogy _id={_id} />
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(GenealogyPage);
