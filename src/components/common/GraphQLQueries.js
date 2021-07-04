import { gql, useQuery } from '@apollo/client';


export const GET_ALL_USERS = gql`
  query GetAllUsers {
    User {
      id
    }
  }
`;
//"google-oauth2|112532042179139043360"
export const GET_ALL_CONFERENCES_FOR_USER = gql`
  query ($userId: String!) {
    User_by_pk(id: $userId) {
        registrants {
          conference {
            id
            name
            shortName
          }
        }
      }
  }
`;

export const GET_ALL_EVENTS = gql`
query MyQuery($confId: uuid!) {
    schedule_Event(where: {conferenceId: {_eq: $confId} }) {
      conferenceId
      durationSeconds
      endTime
      id
      name
      roomId
      startTime
    }
  }
`
