const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

// models
const Genealogy = require('./models/Genealogy');
const User = require('./models/User');

// bring in GraphQL middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// graphql
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// Create schemas

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('DB connected');
  })
  .catch(err => {
    // console.log('Error on start: ' + err.stack);
    console.error(err);
    process.exit(1);
  });

// initialize your app
const app = express();

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
// };
// app.use(cors(corsOptions));
app.use(cors('*'));

// set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers['authorization'];

  console.log('auth-code:', req.headers['authorization']);
  if (token !== 'null') {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      console.log(currentUser);
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
    }
  }
  // console.log(token, typeof token);
  next();
});

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Connect schemas with GraphQL
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      // pass in mongoose models
      Genealogy,
      User,
      currentUser,
    },
  }))
);

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
