import { gql } from 'graphql.macro';

export default gql`
  query getTeam {
    teams {
      id
      name
      alias
    }
  }
`;
