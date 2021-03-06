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

export const FETCH_TAGS = gql`
query Tags($conferenceId: uuid!) {
    collection_Tag(where: { conferenceId: { _eq: $conferenceId } }) {
        ...ItemList_TagInfo
    }
}

fragment ItemList_TagInfo on collection_Tag {
    id
    colour
    name
    priority
}
`;

export const VIDEO_ELEMENT = gql`
        query VideoPlayer_GetElement($elementId: uuid!) {
            content_Element_by_pk(id: $elementId) {
                id
                typeName
                isHidden
                data
                name
                item {
                    id
                    title
                }
            }
        }
    `;

export const FETCH_SENDER_IDS = gql`
query MyQuery {
  registrant_Registrant {
    displayName
    id
    userId
  }
}
`

export const FETCH_ALL_MESSAGES_FOR_CHAT = gql`
query MyQuery($chatId: uuid!) {
  chat_Message(where: {chatId: {_eq: $chatId}}) {
    message
    isPinned
    created_at
    chatId
    senderId
    type
    updated_at
    sId
  }
}
`
//  gql`
// query RegistrantsById($conferenceId: uuid!) {
//   registrant_Registrant(where: { conferenceId: { _eq: $conferenceId } }) {
//       ...RegistrantData
//   }
// }`


// export const FETCH_ROOM_CHAT_ID = gql`
// query GetRoomChatId($roomId: uuid!) {
//   room_Room_by_pk(id: $roomId) {
//       id
//       chatId
//       name
//   }
// }
// `