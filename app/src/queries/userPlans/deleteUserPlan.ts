import { gql } from 'graphql.macro';

export default gql`
  mutation DeleteUserPlan($userPlanId: Int!) {
    deleteUserPlan(userPlanId: $userPlanId)
  }
`;
