"use client";

import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../api/get-book";

interface UseBookDetailProps {
  id: string;
}

export const useBookDetail = ({ id }: UseBookDetailProps) => {
  const { data, ...other } = useQuery(GET_BOOK, { variables: { bookId: id } });

  return { book: data?.book, ...other };
};
