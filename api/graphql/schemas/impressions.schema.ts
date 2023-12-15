import { gql } from 'apollo-server-express';

export const ImpressionsSchema = gql`

		type Impression {
				id: Int!
				site_id: Int!
				visitor_id: Int!
				widget_opened: Boolean!
				widget_closed: Boolean!
				createAt: String!
		}

		type ImpressionUpdateResponse{
				success: Boolean!
				message: String!
		}

		type ImpressionList {
				impressions: [Impression]!
				count: Int!
		}

		extend type Query {
				getImpressionsByURL(url: String!): ImpressionList,
				getImpressionsBySiteId(site_id: Int!): ImpressionList
		}

		extend type Mutation {
				createImpression(site_id: Int!, ip: String!): ImpressionUpdateResponse!
				registerInteraction(site_id: Int!, ip: String!, interaction: String!): ImpressionUpdateResponse!
		}
		`;
