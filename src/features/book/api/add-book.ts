import { gql } from '@/__generated__';

export const ADD_BOOK = gql(`
  mutation AddBook($title: String!, $author: String!, $year: Int!) {
    addBook(title: $title, author: $author, year: $year) {
      id
      title
      author
      year
    }
  }
`);
