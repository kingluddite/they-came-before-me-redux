import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
// queries
import { Query, Mutation } from 'react-apollo';

// custom queries
import {
  GET_USER_GENEALOGIES,
  DELETE_USER_GENEALOGY,
  GET_ALL_GENEALOGIES,
  GET_CURRENT_USER,
} from '../../queries';

// components
import EditGenealogyModal from '../Genealogy/EditGenealogyModal';

class UserGenealogies extends Component {
  state = {
    _id: '',
    firstName: '',
    lastName: '',
    imageUrl: '',
    category: '',
    description: '',
    modal: false,
  };

  handleDelete = deleteUserGenealogy => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this genealogy?'
    );

    if (confirmDelete) {
      deleteUserGenealogy().then(({ data }) => {
        // console.log(data);
      });
    }
  };

  handleSubmit = (event, updateUserGenealogy) => {
    event.preventDefault();
    updateUserGenealogy().then(({ data }) => {
      console.log(data);
      this.closeModal();
    });
  };

  loadGenealogy = genealogy => {
    // console.log(genealogy);
    this.setState({ ...genealogy, modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  handleChange = event => {
    const { name, value } = event.target;
    // console.log(name, ':', value);
    this.setState({ [name]: value });
  };

  render() {
    const { username } = this.props;
    const { modal } = this.state;
    return (
      <Query query={GET_USER_GENEALOGIES} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          // console.log(data);

          return (
            <ul>
              {modal && (
                <EditGenealogyModal
                  closeModal={this.closeModal}
                  handleChange={this.handleChange}
                  genealogy={this.state}
                  handleSubmit={this.handleSubmit}
                />
              )}
              <h3>Your Genealogies</h3>
              {!data.getUserGenealogies.length && (
                <p>
                  <strong>You have not added any genealogies yet</strong>
                </p>
              )}
              {data.getUserGenealogies.map(genealogy => (
                <li key={genealogy._id}>
                  <Link to={`/genealogy/${genealogy._id}`}>
                    <p>
                      {genealogy.firstName} {genealogy.lastName}
                    </p>
                  </Link>
                  <p style={{ marginBottom: '0' }}>{genealogy.likes}</p>
                  <Mutation
                    mutation={DELETE_USER_GENEALOGY}
                    variables={{ _id: genealogy._id }}
                    refetchQueries={() => [
                      { query: GET_ALL_GENEALOGIES },
                      { query: GET_CURRENT_USER },
                    ]}
                    update={(cache, { data: { deleteUserGenealogy } }) => {
                      // console.log(cache, data);
                      const { getUserGenealogies } = cache.readQuery({
                        query: GET_USER_GENEALOGIES,
                        variables: { username },
                      });

                      cache.writeQuery({
                        query: GET_USER_GENEALOGIES,
                        variables: { username },
                        data: {
                          getUserGenealogies: getUserGenealogies.filter(
                            genealogy =>
                              genealogy._id !== deleteUserGenealogy._id
                          ),
                        },
                      });
                    }}
                  >
                    {(deleteUserGenealogy, attrs = {}) => (
                      <Fragment>
                        <button
                          className="button-primary"
                          onClick={() => this.loadGenealogy(genealogy)}
                        >
                          Update
                        </button>
                        <p
                          className="delete-button"
                          onClick={() => this.handleDelete(deleteUserGenealogy)}
                        >
                          {attrs.loading ? 'deleting...' : 'X'}
                        </p>
                      </Fragment>
                    )}
                  </Mutation>
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default UserGenealogies;
