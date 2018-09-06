exports.typeDefs = `

  type Genealogy {
    _id: ID
    firstName: String!
    lastName: String!
    imageUrl: String!
    category: String!
    description: String
    createdDate: String
    likes: Int
    username: String
  }

  type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String! @unique
    joinDate: String
    favorites: [Genealogy]
  }

  type Query {
      getAllGenealogies: [Genealogy]
      getGenealogy(_id: ID!): Genealogy
      searchGenealogies(searchTerm: String): [Genealogy]

      getCurrentUser: User
      getUserGenealogies(username: String!): [Genealogy]
  }

  type Token {
    token: String!
  }

  type Mutation {
    addGenealogy(firstName: String!, lastName: String!, imageUrl: String!, category: String!, description: String, username: String): Genealogy
    deleteUserGenealogy(_id: ID): Genealogy
    likeGenealogy(_id: ID!, username: String!): Genealogy
    unlikeGenealogy(_id: ID!, username: String!): Genealogy

    signupUser(username: String!, email: String!, password: String!): Token
    signinUser(username: String!, password: String!): Token

  }
`;
