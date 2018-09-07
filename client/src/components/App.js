import React, { Component } from 'react';
import pose from 'react-pose';
import Spinner from './Spinner';

import { Query } from 'react-apollo';

import './App.css';

// components
import GenealogyItem from './Genealogy/GenealogyItem';

import { GET_ALL_GENEALOGIES } from '../queries';

const GenealogyList = pose.ul({
  shown: {
    x: '0%',
    staggerChildren: 100,
  },
  hidden: {
    x: '-100%',
  },
});

class App extends Component {
  state = {
    on: false,
  };

  componentDidMount = () => {
    setTimeout(this.slideIn, 200);
  };

  slideIn = () => {
    this.setState({ on: !this.state.on });
  };

  render() {
    return (
      <div className="App">
        <h1 className="main-title">
          Find Genealogies you <strong>Love</strong>
        </h1>
        <Query query={GET_ALL_GENEALOGIES}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return <div>Error</div>;
            // console.log(data);

            const { on } = this.state;

            return (
              <GenealogyList className="cards" pose={on ? 'shown' : 'hidden'}>
                {data.getAllGenealogies.map(genealogy => (
                  <GenealogyItem key={genealogy._id} {...genealogy} />
                ))}
              </GenealogyList>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;
