const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllGenealogies: async (root, args, { Genealogy }) => {
      const allGenealogies = await Genealogy.find().sort({
        createdDate: 'desc',
      });
      return allGenealogies;
    },

    getGenealogy: async (root, { _id }, { Genealogy }) => {
      const genealogy = await Genealogy.findOne({ _id });
      return genealogy;
    },

    searchGenealogies: async (root, { searchTerm }, { Genealogy }) => {
      if (searchTerm) {
        // search
        const searchResults = await Genealogy.find(
          {
            $text: { $search: searchTerm },
          },
          {
            score: { $meta: 'textScore' },
          }
        ).sort({
          score: { $meta: 'textScore' },
        });
        return searchResults;
      } else {
        const genealogies = await Genealogy.find().sort({
          likes: 'desc',
          createdDate: 'desc',
        });
        return genealogies;
      }
    },

    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username,
      }).populate({
        path: 'favorites',
        model: 'Genealogy',
      });
      return user;
    },

    getUserGenealogies: async (root, { username }, { Genealogy }) => {
      const userGenealogies = await Genealogy.find({ username }).sort({
        createdDate: 'desc',
      });
      return userGenealogies;
    },
  },

  Mutation: {
    addGenealogy: async (
      root,
      { firstName, lastName, imageUrl, category, description, username },
      { Genealogy }
    ) => {
      // constructor
      const newGenealogy = await new Genealogy({
        firstName,
        lastName,
        imageUrl,
        category,
        description,
        username,
      }).save();
      return newGenealogy;
    },

    likeGenealogy: async (root, { _id, username }, { Genealogy, User }) => {
      const genealogy = await Genealogy.findOneAndUpdate(
        { _id },
        { $inc: { likes: 1 } }
      );
      const user = await User.findOneAndUpdate(
        { username },
        { $addToSet: { favorites: _id } }
      );
      return genealogy;
    },

    unlikeGenealogy: async (root, { _id, username }, { Genealogy, User }) => {
      const genealogy = await Genealogy.findOneAndUpdate(
        { _id },
        { $inc: { likes: -1 } }
      );
      const user = await User.findOneAndUpdate(
        { username },
        { $pull: { favorites: _id } }
      );
      return genealogy;
    },

    deleteUserGenealogy: async (root, { _id }, { Genealogy }) => {
      const genealogy = await Genealogy.findOneAndRemove({ _id });
      return genealogy;
    },

    updateUserGenealogy: async (
      root,
      { _id, firstName, lastName, imageUrl, category, description },
      { Genealogy }
    ) => {
      const updatedGenealogy = await Genealogy.findOneAndUpdate(
        { _id },
        { $set: { firstName, lastName, imageUrl, category, description } },
        { new: true }
      );
      return updatedGenealogy;
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      // check if user already exists
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists');
      }
      // user doesn't exist, create one
      const newUser = await new User({
        username,
        email,
        password,
      }).save();
      return { token: createToken(newUser, process.env.SECRET, '1hr') };
    },

    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      // check to make sure password matches with user that is found
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid Password');
      }
      // all good? then return a token
      return { token: createToken(user, process.env.SECRET, '1hr') };
    },
  },
};
