import { gql } from '@/__generated__';

export const EDIT_BOOK = gql(`
    mutation UpdateBook($updateBookId: ID!, $title: String, $author: String, $year: Int) {
        updateBook(id: $updateBookId, title: $title, author: $author, year: $year) {
            id
            title
            author
            year
        }
    }
`);
