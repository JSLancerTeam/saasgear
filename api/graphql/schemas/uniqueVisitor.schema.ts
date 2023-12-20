import { gql } from 'apollo-server-express';

export const UniqueVisitorSchema = gql`

		type Visitor {
            id: Int
            siteId: Int
            ipAddress: String
            city: String
            country: String
            zipcode: String
            continent: String
            firstVisit: String
		}
		input VisitorInput {
            id: Int
            siteId: Int
            ipAddress: String
            city: String
            country: String
            zipcode: String
            continent: String
            firstVisit: String
		}

        type visitorResponse{
            visitors: [Visitor],
            count: Int
        }

        extend type Query {
            getSiteVisitors(siteId: Int!): visitorResponse
            getVisitorByIp(ipAddress: String!): Visitor
        }

		extend type Mutation {
				addNewVisitor(siteId: Int!): [Int]!
				addNewVisitorWithIp(siteId: Int!, ipAddress:String! ): [Int]!
                updateVisitorDetails(data: VisitorInput): String
                deleteVisitorById(siteId: Int!): Int!
                deleteVisitorByIp(ipAddress: String!): Int!
		}
		
`;
