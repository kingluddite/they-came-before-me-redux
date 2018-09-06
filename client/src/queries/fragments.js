import { gql } from 'apollo-boost';

export const genealogyFragments = {
  genealogy: gql`
    fragment CompleteGenealogy on Genealogy {
      _id
      firstName
      lastName
      imageUrl
      category
      description
      createdDate
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
