import { gql } from 'graphql.macro';

export default gql`
  query VerifyInvitationToken($invitationToken: String! ) {
    verifyInvitationToken(invitationToken: $invitationToken) {
      teamName
      owner
    }
  }
`;
