import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

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
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        // console.log(data);

        return (
          <div className="App">
            <h2>
              {data.getGenealogy.firstName} {data.getGenealogy.lastName}
            </h2>
            <p>
              Created Date:
              {data.getGenealogy.createdDate}
            </p>
            <p>Description: {data.getGenealogy.description}</p>
            <p>Date of Birth: {data.getGenealogy.dateOfBirth}</p>
            <p>Likes: {data.getGenealogy.likes}</p>
            <p>Created By: {data.getGenealogy.username}</p>
            <LikeGenealogy _id={_id} />
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(GenealogyPage);
