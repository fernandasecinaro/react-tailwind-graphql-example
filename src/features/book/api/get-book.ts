import { gql } from '@/__generated__';

export const GET_BOOK = gql(`
  query GetBook($bookId: ID!) {
    book(id: $bookId) {
      id
      title
      author
      year
    }
  }
`);
