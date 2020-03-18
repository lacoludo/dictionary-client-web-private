import gql from 'graphql-tag'

export const READ_WORDS = gql`
  {
    words {
      _id
      name
    }
  }
`
