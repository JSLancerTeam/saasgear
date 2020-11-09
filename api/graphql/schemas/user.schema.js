import pkg from 'apollo-server-express';
const { gql } = pkg;

export const UserSchema = gql`
	type User {
		id: ID!
		email: String!
		name: String!
		is_active: Boolean!
	}
	type Response {
		token: String
		verified: Boolean
	}

	type Query {
		profileUser(id: ID): User
		verify(token: String!): Response!
	}

	type Mutation {
		register(email: String!, password: String!, name: String!): Response!
		login(email: String!, password: String!): Response!
	}
`;
