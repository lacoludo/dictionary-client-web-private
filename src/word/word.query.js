import gql from 'graphql-tag'

export const READ_WORD = gql`
  query($wordId: ID!) {
    word(wordId: $wordId) {
      _id
      name
    }
  }
`
