import { combineResolvers } from 'graphql-resolvers';
import { addImpressions, addInteraction, findImpressionsBySiteId, findImpressionsByURL } from '~/services/Impressions/impressions.service';
import { addNewVisitor, deleteVisitorById, deleteVisitorByIp, getSiteVisitors, getVisitorByIp, updateVisitorDetails } from '~/services/uniqueVisitors/uniqueVisitor.service';

const resolvers = {
    Query: {
        getImpressionsByURL: combineResolvers(
            // isAuthenticated,
            (_, { url }, {user}) => findImpressionsByURL(user.id, url)
        ),
        getImpressionsBySiteId: combineResolvers(
            // isAuthenticated,
            (_, { siteId }) => findImpressionsBySiteId(siteId)
        ),

    },
    Mutation: {
        addImpression: combineResolvers(
            (_, { siteId }, { ip }) => addImpressions(siteId, ip)
        ),
        registerInteraction: combineResolvers(
            (_, { impressionId, interaction}, ) => addInteraction(impressionId, interaction)
        ),
    },
};

export default resolvers;
