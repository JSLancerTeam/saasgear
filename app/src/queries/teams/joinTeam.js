import { gql } from 'graphql.macro';

export default gql`
  mutation InviteMember($token: String!){
    joinTeam(token: $token)
  }
`