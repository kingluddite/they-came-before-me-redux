import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const handleSignout = (client, history) => {
  // clear token
  localStorage.setItem('token', '');
  client.resetStore();
  // redirect using with Router
  history.push('/');
};

const Signout = ({ history }) => (
  <ApolloConsumer>
    {client => {
      // console.log(client);

      return (
        <button onClick={() => handleSignout(client, history)}>Signout</button>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(Signout);
