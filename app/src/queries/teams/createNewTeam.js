import { gql } from 'graphql.macro';

export default gql`
  mutation createTeam($name: String!, $alias: String!) {
    createTeam(name: $name, alias: $alias){
      id
      name
      alias
    }
  }
`;
