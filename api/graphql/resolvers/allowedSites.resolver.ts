import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization.resolver';
import { addSite, changeURL, deleteSite, findSite, findUserSites } from '~/services/allowedSites/allowedSites.service';

const resolvers = {
  Query: {
    getUserSites: combineResolvers(
      isAuthenticated,
      (_, t, { user }) => findUserSites(user.id)
    ),
    
    getSiteByURL: combineResolvers(
      isAuthenticated,
      (_, {url},  { user }) => findSite(user.id, url)
    ),
  },
  Mutation: {
    addSite: combineResolvers(
      isAuthenticated,
      (_, { url }, { user }) => addSite(user.id, url),
    ),
    changeURL: combineResolvers(
      isAuthenticated,
      (_, { newURL, siteId}, {user}) => changeURL(siteId, user.id, newURL),
    ),
    deleteSite: combineResolvers(
      isAuthenticated,
      (_, { url }, {user}) => deleteSite(user.id, url),
    ),
  },
};

export default resolvers;
