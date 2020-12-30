import { gql } from 'graphql.macro';

export default gql`
  mutation InviteMember($email: String!, $alias: String!){
    inviteMember(email: $email, alias: $alias){
      userName
      userId
      email
      isOwner
      status
    }
  }
`