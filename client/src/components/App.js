import React from 'react';
import { Query } from 'react-apollo';

import './App.css';

// components
import GenealogyItem from './Genealogy/GenealogyItem';

import { GET_ALL_GENEALOGIES } from '../queries';

const App = () => (
  <div className="App">
    <h1>Home</h1>
    <Query query={GET_ALL_GENEALOGIES}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        // console.log(data);

        return (
          <ul>
            {data.getAllGenealogies.map(genealogy => (
              <GenealogyItem key={genealogy._id} {...genealogy} />
            ))}
          </ul>
        );
      }}
    </Query>
  </div>
);

export default App;
