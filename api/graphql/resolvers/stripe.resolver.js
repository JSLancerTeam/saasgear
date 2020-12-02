import { createNewSubcription } from '~/services/stripe/subcription.service';

const resolvers = {
  Mutation: {
    createSubcription(_, { token }, { user }) {
      return createNewSubcription(token, user);
    },
  },
};

export default resolvers;
