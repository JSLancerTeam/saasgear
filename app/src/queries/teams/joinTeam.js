import { gql } from 'graphql.macro';

export default gql`
  mutation InviteMember($type: String!, $token: String!){
    joinTeam(type: $type, token: $token)
  }
`