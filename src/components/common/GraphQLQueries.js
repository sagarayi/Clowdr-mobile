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
      itemId
    }
  }
`


export const GET_ITEM_ELEMENTS = gql`
query ItemElements_GetItem($itemId: uuid!) {
    content_Item_by_pk(id: $itemId) {
        ...ItemElements_ItemData
    }
}

fragment ItemElements_ItemData on content_Item {
    id
    title
    typeName
    chatId
    chat {
        rooms {
            id
            name
        }
    }

    elements(where: { isHidden: { _eq: false } }) {
        ...ElementData
    }
    itemPeople(order_by: { priority: asc }) {
        ...ProgramPersonData
    }
}

fragment ElementData on content_Element {
    id
    data
    layoutData
    name
    typeName
}

fragment ProgramPersonData on content_ItemProgramPerson {
    id
    person {
        id
        name
        affiliation
        registrantId
    }
    roleName
    priority
}
`;