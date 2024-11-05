import { gql } from '@/__generated__';

export const DELETE_BOOK = gql(`
  mutation DeleteBook($deleteBookId: ID!) {
    deleteBook(id: $deleteBookId)
  }
`);
