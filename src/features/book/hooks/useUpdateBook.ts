import { useMutation } from '@apollo/client';
import { EDIT_BOOK } from '../api/edit-book';
import { GET_BOOKS } from '../api/get-books';
import { GET_BOOK } from '../api/get-book';

export const useUpdateBook = () => {
  return useMutation(EDIT_BOOK, { refetchQueries: [GET_BOOKS, GET_BOOK] });
};
