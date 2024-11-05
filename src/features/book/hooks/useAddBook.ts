import { useMutation } from '@apollo/client';

import { ADD_BOOK } from '../api/add-book';
import { GET_BOOKS } from '../api/get-books';

export const useAddBook = () => {
  return useMutation(ADD_BOOK, {
    refetchQueries: [GET_BOOKS],
  });
};
