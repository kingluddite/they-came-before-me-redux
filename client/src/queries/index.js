import { gql } from 'apollo-boost';

import { genealogyFragments } from './fragments';

/* Genealogy Queries */
export const GET_ALL_GENEALOGIES = gql`
  query {
    getAllGenealogies {
      _id
      firstName
      lastName
      imageUrl
      category
    }
  }
`;

export const GET_GENEALOGY = gql`
  query($_id: ID!) {
    getGenealogy(_id: $_id) {
      ...CompleteGenealogy
    }
  }
  ${genealogyFragments.genealogy}
`;

export const SEARCH_GENEALOGIES = gql`
  query($searchTerm: String) {
    searchGenealogies(searchTerm: $searchTerm) {
      _id
      firstName
      lastName
      likes
    }
  }
`;

/* Genealogy Mutations */

export const ADD_GENEALOGY = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $imageUrl: String!
    $category: String!
    $description: String
    $username: String
  ) {
    addGenealogy(
      firstName: $firstName
      lastName: $lastName
      imageUrl: $imageUrl
      category: $category
      description: $description
      username: $username
    ) {
      firstName
      lastName
      imageUrl
      category
      description
    }
  }
`;

/* User Queries */

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
      favorites {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const GET_USER_GENEALOGIES = gql`
  query($username: String!) {
    getUserGenealogies(username: $username) {
      _id
      firstName
      lastName
      likes
    }
  }
`;

// Genealogy Mutations

export const DELETE_USER_GENEALOGY = gql`
  mutation($_id: ID!) {
    deleteUserGenealogy(_id: $_id) {
      _id
    }
  }
`;

export const LIKE_GENEALOGY = gql`
  mutation($_id: ID!, $username: String!) {
    likeGenealogy(_id: $_id, username: $username) {
      ...LikeGenealogy
    }
  }
  ${genealogyFragments.like}
`;

export const UNLIKE_GENEALOGY = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeGenealogy(_id: $_id, username: $username) {
      ...LikeGenealogy
    }
  }
  ${genealogyFragments.like}
`;

// User Mutations

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;
