import { gql } from 'graphql.macro';

export default gql`
  query githubLogin($code: String) {
    loginByGithub(code: $code) {
      token
      user {
        name
        email
        provider
        providerId
        avatarUrl
      }
    }
  }
`;

export const registerAccountByGithub = gql`
  mutation registerSocial(
    $provider: String!
    $email: String!
    $name: String!
    $avatarUrl: String!
    $providerId: String!
  ) {
    registerSocialAccount(
      provider: $provider
      email: $email
      name: $name
      avatarUrl: $avatarUrl
      providerId: $providerId
    ) {
      token
    }
  }
`;
