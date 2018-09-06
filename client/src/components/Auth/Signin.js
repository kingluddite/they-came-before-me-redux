import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

// components
import Error from '../Error';

// graphql mutations
import { SIGNIN_USER } from '../../queries';

const initialState = {
  username: '',
  password: '',
};

class Signin extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({
      ...initialState,
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then(async ({ data: { signinUser } }) => {
      // console.log(signinUser);
      localStorage.setItem('token', signinUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push('/');
    });
  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;

    return isInvalid;
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="App">
        <h2>Signin User</h2>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signinUser, { data, loading, error }) => {
            return (
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, signinUser)}
              >
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                  value={username}
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.handleChange}
                />
                <button
                  className="button-primary"
                  disabled={loading || this.validateForm()}
                >
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Signin);
