import { gql } from '@/__generated__';

export const GET_BOOKS = gql(`
  query GetBooks($offset: Int, $limit: Int) {
    books(offset: $offset, limit: $limit) {
      total
      hasMore
      results {
        author
        id
        year
        title
      }
    }
  }
`);
