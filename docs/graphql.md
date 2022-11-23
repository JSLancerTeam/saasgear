# [:globe_with_meridians: GraphQL](https://github.com/JSLancerTeam/saasgear/docs/graphql.md)
GraphQL is an open-source query language created by Facebook. It allows requests for specific data, giving clients more control over what information is sent.

There are 2 operations in GraphQL: read (query) and write (mutation). Every operation in GraphQL starts with a schema. The schema describes the properties and shape of each property in both request and response payload.

This is an example schema for register mutation:

```graphql
type ResponseUserLogin {
   token: String!
}

register(
	email: String!, 
	password: String!, 
	name: String!, 
	planName: String, 
	billingType: BillingType
): ResponseUserLogin!
```

You can see all operations available in backend API at the address: http://api.saasgear.dev/graphql. This is the GraphQL playground which is shipped along with every Apollo GraphQL server. You can even test the available queries and mutations directly on that page.

## Create a GraphQL operation in backend

### Define GraphQL schema

Let's walk through the steps need to create a new operation in backend

First, create an example schema in the folder: *./api/graphql/schema/example.schema.js*

```jsx
import pkg from 'apollo-server-express';

const { gql } = pkg;

export const ExampleSchema = gql`
  extend type Mutation {
    login(email: String!, password: String!): Boolean!
  }
`;
```

You can learn more about creating a GraphQL schema at here: [https://www.apollographql.com/docs/tutorial/schema/](https://www.apollographql.com/docs/tutorial/schema/).

We have created a schema, we need to put this schema into the root schema, so it is available to consume. In order to do that, we need to edit  *./api/graphql/root.schema.js*

```jsx
import { ExampleSchema } from './schemas/example.schema';
...
export default [rootSchema, UserSchema, StripeSchema, ExampleSchema];
```

You can visit the adddress: [http://api.saasgear.dev/graphql](http://api.saasgear.dev/graphql) again and you will see the new operation in the right sidebar.

### Create resolver

Resolver is a function which will response to a particular GraphQL query and mutation. Let's create an example resolver at here: ./api/graphql/resolvers/example.resolver.js

```jsx
import { exampleLogin } from '~/services/example/login.service';

const resolvers = {
  Mutation: {
    login(_, { email, password }) {
      return exampleLogin(token, user);
    },
  },
};

export default resolvers;
```

And then you need to add this resolve to the root resolver. Let's edit ./api/graphql/root.resolver.js

```jsx
import userResolver from './resolvers/user.resolver';
import stripeResolver from './resolvers/stripe.resolver';
import exampleResolver from './resolvers/example.resolver';

export default [
  userResolver, 
  stripeResolver, 
  exampleResolver
];
```

Since you have resolver, you can go back to our GraphQL playground again and start testing the new mutation.

## Consume the GraphQL operation in the front-end

These are the steps to consume the GraphQL operation in frontend.

### Define a query

Create a new query in the folder *./app/queries/example/login.js*

```jsx
import { gql } from 'graphql.macro';

export default gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
```

## Create and call the mutation

Now we can import and use the query in the container. Since our boilerplate follow the component and container pattern. All of the GraphQL operations and redux actions will be called from the container. The components are used for purely presentation purpose.

```jsx
import React from 'react';
import { useMutation } from '@apollo/client';
import loginQuery from '@/queries/example/login';

const LoginContainer = () => {
	const [loginMutation, { error, loading }] = useMutation(loginQuery);
	
	function onSubmit(email, password) {
		loginMutation({ variables: { email, password }});
	}

	return (....)
}

export default LoginContainer
```
