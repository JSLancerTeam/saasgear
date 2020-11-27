import { gql } from 'graphql.macro';

export default gql`
  query GetUserPlan {
    getUserPlan {
      userId
      productId
      priceId
      name
      amount
      productType
      priceType
    }
  }
`;
