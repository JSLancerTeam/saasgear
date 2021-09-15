import { gql } from 'graphql.macro';

export default gql`
  mutation InviteMember($type: JoinTeamType!, $token: String!){
    joinTeam(type: $type, token: $token)
  }
`