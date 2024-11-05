import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../api/get-books';

const useBooks = ({
  offset = 0,
  limit = 10,
}: {
  offset?: number;
  limit?: number;
}) => {
  return useQuery(GET_BOOKS, { variables: { offset, limit } });
};

export default useBooks;
