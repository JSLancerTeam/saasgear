import { gql } from 'graphql.macro';

export default gql`
  mutation CancelInvitation($userId: String!, $teamId: String!){
    cancelInvitation(userId: $userId, teamId: $teamId)
  }
`