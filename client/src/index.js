import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import Navbar from './components/Navbar';
import Search from './components/Genealogy/Search';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import withSession from './components/withSession';
import AddGenealogy from './components/Genealogy/AddGenealogy';
import Profile from './components/Profile/Profile';
import GenealogyPage from './components/Genealogy/GenealogyPage';

// uri: 'http://localhost:4444/graphql'
// uri (prod): https://protected-ravine-56983.herokuapp.com/
const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      // console.log('Network Error', networkError);
      localStorage.setItem('token', '');
    }
  },
});

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/search" component={Search} />
        <Route
          path="/genealogy/add"
          render={() => <AddGenealogy session={session} />}
        />
        <Route path="/genealogy/:_id" component={GenealogyPage} />
        <Route path="/profile" render={() => <Profile session={session} />} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
);
