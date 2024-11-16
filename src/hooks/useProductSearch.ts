import { useState } from "react";
import { useGetProductByIdQuery } from "@/redux/api/productApi";

export function useProductSearch(inputValue: string) {
  const [searchId, setSearchId] = useState<number | null>(null);

  // Convert inputValue to a number only when the search is triggered
  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
    isFetching,
  } = useGetProductByIdQuery(searchId ?? undefined, {
    skip: searchId === null, // Skip the request if no searchId is set
  });

  const handleSearch = () => {
    // Convert inputValue to a number and set it if valid
    const parsedId = parseInt(inputValue, 10);
    if (!isNaN(parsedId)) {
      setSearchId(parsedId); // Update the searchId with the parsed number
    } else {
      setSearchId(null); // If invalid input, clear the searchId
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
