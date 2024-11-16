"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SearchBar from "@/components/SearchBar";
import ProductList from "@/components/ProductList";
import Cart from "@/components/Cart";
import { useProductSearch } from "@/hooks/useProductSearch";
import { useCart } from "@/hooks/useCart";

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

  const createdAt = useSelector(
    (state: RootState) => state.cartState.createdAt
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
    </div>
  );
}
