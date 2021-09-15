import { gql } from 'graphql.macro';

export default gql`
  query GetUserPlan {
    getUserPlan {
      id
      userId
      productId
      priceId
      name
      amount
      productType
      priceType
      expiredAt
      deletedAt
    }
  }
`;
