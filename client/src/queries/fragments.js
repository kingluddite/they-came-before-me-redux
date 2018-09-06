import { gql } from 'apollo-boost';

export const genealogyFragments = {
  genealogy: gql`
    fragment CompleteGenealogy on Genealogy {
      _id
      firstName
      lastName
      createdDate
      description
      likes
      username
    }
  `,
  like: gql`
    fragment LikeGenealogy on Genealogy {
      _id
      likes
    }
  `,
};
