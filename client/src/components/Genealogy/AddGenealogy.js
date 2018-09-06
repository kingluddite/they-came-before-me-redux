import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';

// components
import Error from '../Error';

// graphql
import { Mutation } from 'react-apollo';

// mutations
import {
  ADD_GENEALOGY,
  GET_ALL_GENEALOGIES,
  GET_USER_GENEALOGIES,
} from '../../queries';

const initialState = {
  firstName: '',
  lastName: '',
  imageUrl: '',
  category: 'Family',
  description: '',
  username: '',
};

class AddGenealogy extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({
      ...initialState,
    });
  };

  componentDidMount = () => {
    if (this.props.session) {
      // console.log(this.props.session.getCurrentUser.username);
      this.setState({
        username: this.props.session.getCurrentUser.username,
      });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    // console.log(name, ':', value);
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, addGenealogy) => {
    event.preventDefault();
    addGenealogy().then(({ data }) => {
      // console.log(data);
      this.clearState();
      this.props.history.push('/');
    });
  };

  validateForm = () => {
    const { firstName, lastName, imageUrl, category, description } = this.state;
    const isInvalid =
      !firstName || !lastName || !imageUrl || !category || !description;
    return isInvalid;
  };

  updateCache = (cache, { data: { addGenealogy } }) => {
    // console.log(cache, data);
    const { getAllGenealogies } = cache.readQuery({
      query: GET_ALL_GENEALOGIES,
    });
    // console.log('from cache', getAllGenealogies);
    // console.log('from data', addGenealogy);

    cache.writeQuery({
      query: GET_ALL_GENEALOGIES,
      data: {
        getAllGenealogies: [addGenealogy, ...getAllGenealogies],
      },
    });
  };

  render() {
    const {
      firstName,
      lastName,
      imageUrl,
      category,
      description,
      username,
    } = this.state;

    return (
      <Mutation
        mutation={ADD_GENEALOGY}
        variables={{
          firstName,
          lastName,
          imageUrl,
          category,
          description,
          username,
        }}
        refetchQueries={() => [
          {
            query: GET_USER_GENEALOGIES,
            variables: { username },
          },
        ]}
        update={this.updateCache}
      >
        {(addGenealogy, { data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          // console.log(data);

          return (
            <div className="App">
              <h2 className="App">Add Genealogy</h2>
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, addGenealogy)}
              >
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={this.handleChange}
                  value={firstName}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                  value={lastName}
                />
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Genealogy Image"
                  onChange={this.handleChange}
                  value={imageUrl}
                />
                <select
                  name="category"
                  onChange={this.handleChange}
                  value={category}
                >
                  <option value="Family">Family</option>
                  <option value="Church">Church</option>
                  <option value="Ethnic">Ethnic</option>
                  <option value="Historic">Historic</option>
                  <option value="Miscellany">Miscellany</option>
                </select>
                <textarea
                  name="description"
                  placeholder="Add Description"
                  onChange={this.handleChange}
                  value={description}
                />
                <button
                  type="submit"
                  className="button-primary"
                  disabled={loading || this.validateForm()}
                >
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddGenealogy)
);
