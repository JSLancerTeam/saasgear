import pkg from 'apollo-server-express';
const { gql } = pkg;

export const UserSchema = gql`
	type User {
		id: ID!
		email: String!
		name: String
		isActive: Boolean
	}
	type Respone {
		token: String!
	}

	type Query {
		profileUser(id: ID): User
	}

	type Mutation {
		register(email: String, password: String, name: String): Respone!
		login(email: String, password: String): Respone!
	}
`;
