import { gql } from 'graphql.macro';

export default gql`
  query getTeamDetail($alias: String!) {
    getTeamDetail(alias: $alias){
      userName
      userId
      email
      isOwner
      status
      teamId
    }
  }
`;
