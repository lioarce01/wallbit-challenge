import { useState } from "react";
import { useGetProductByIdQuery } from "@/redux/api/productApi";

export function useProductSearch(inputValue: string) {
  const [searchId, setSearchId] = useState<number | null>(null);

  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
    isFetching,
  } = useGetProductByIdQuery(searchId ?? undefined, {
    skip: searchId === null,
  });

  const handleSearch = () => {
    const parsedId = parseInt(inputValue, 10);
    if (!isNaN(parsedId)) {
      setSearchId(parsedId);
    } else {
      setSearchId(null);
    }
  };

  return {
    searchId,
    product,
    isProductLoading,
    productError,
    isFetching,
    handleSearch,
  };
}
