import { useState } from "react";
import { useGetProductByIdQuery } from "@/redux/api/productApi";

export function useProductSearch() {
  const [searchId, setSearchId] = useState<string>("");
  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
    isFetching,
  } = useGetProductByIdQuery(searchId ? parseInt(searchId, 10) : undefined, {
    skip: !searchId,
  });

  const handleSearch = () => {
    if (searchId) {
      setSearchId(searchId);
    }
  };

  return {
    searchId,
    setSearchId,
    product,
    isProductLoading,
    productError,
    isFetching,
    handleSearch,
  };
}
