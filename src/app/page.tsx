"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SearchBar from "@/components/SearchBar";
import ProductList from "@/components/ProductList";
import Cart from "@/components/Cart";
import { useProductSearch } from "@/hooks/useProductSearch";
import { useCart } from "@/hooks/useCart";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import Footer from "@/components/Footer";

export default function Shop() {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const [inputValue, setInputValue] = useState<string>("");
  const {
    searchId,
    product,
    isProductLoading,
    productError,
    isFetching,
    handleSearch,
  } = useProductSearch(inputValue);

  const { data: products } = useGetAllProductsQuery({});

  const createdAt = useSelector(
    (state: RootState) => state.cartState.createdAt
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const productCount = products?.length;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-gray-100 p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">
        Wallbit Shop
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 flex-grow pt-20">
        <div>
          <div className="mb-6">
            <SearchBar
              inputValue={inputValue}
              handleSearch={handleSearch}
              setInputValue={setInputValue}
            />

            <ProductList
              isFetching={isFetching}
              isProductLoading={isProductLoading}
              productError={productError}
              searchId={searchId?.toString() || ""}
              product={product}
              addToCart={addToCart}
              productCount={productCount}
            />
          </div>
        </div>

        <div className="md:mt-0">
          <Cart
            cart={cart}
            createdAt={createdAt ? createdAt : null}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            totalPrice={totalPrice}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
