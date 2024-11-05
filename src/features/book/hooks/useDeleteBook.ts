import { useMutation } from '@apollo/client';
import { DELETE_BOOK } from '../api/delete-book';
import { GET_BOOKS } from '../api/get-books';

const useDeleteBook = () => {
  return useMutation(DELETE_BOOK, {
    refetchQueries: [GET_BOOKS],
  });
};

export default useDeleteBook;
