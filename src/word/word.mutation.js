import gql from 'graphql-tag'

export const CREATE_WORD = gql`
  mutation($name: String!) {
    createWord(name: $name) {
      _id
      name
    }
  }
`

export const UPDATE_WORD = gql`
  mutation($wordId: ID!, $name: String!) {
    updateWord(wordId: $wordId, name: $name) {
      _id
      name
    }
  }
`

export const DELETE_WORD = gql`
  mutation($wordId: ID!) {
    deleteWord(wordId: $wordId) {
      _id
    }
  }
`
