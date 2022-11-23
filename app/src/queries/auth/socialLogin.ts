import { gql } from 'graphql.macro';

export default gql`
  query socialLogin($provider: SocialProviderType!, $code: String!) {
    loginBySocial(provider: $provider, code: $code) {
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

export const registerAccountBySocial = gql`
  mutation registerSocial(
    $provider: SocialProviderType!
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
