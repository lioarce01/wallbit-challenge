"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Minus, ShoppingCart, Trash2, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetProductByIdQuery } from "@/redux/api/productApi";
import { setCart } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import ProductSkeleton from "@/components/Skeleton";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

interface CartItem extends Product {
  quantity: number;
}

export default function Component() {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cartState.cart);
  const [inputValue, setInputValue] = useState<string>("");
  const [searchId, setSearchId] = useState<string>("");
  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
    isFetching,
  } = useGetProductByIdQuery(searchId ? parseInt(searchId, 10) : undefined, {
    skip: !searchId,
  });

  const addToCart = (product: any) => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );
    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1,
      };
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }
    dispatch(setCart(updatedCart));
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    dispatch(setCart(updatedCart));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    dispatch(setCart(updatedCart));
  };

  const handleSearch = () => {
    if (inputValue) {
      setSearchId(inputValue);
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Shopping Cart</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              Search Product by ID
            </h2>
            <div className="flex space-x-2">
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Enter product ID"
                className="bg-neutral-800 text-white border-neutral-700 border-2 focus:border-neutral-600"
              />
              <Button
                onClick={handleSearch}
                className="bg-white text-neutral-950 hover:bg-gray-200"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            {(isFetching || isProductLoading) && <ProductSkeleton />}

            {productError && (
              <div className="mt-4 text-center text-red-700">
                Error: {productError.toString()}
              </div>
            )}

            {searchId &&
              !isFetching &&
              !isProductLoading &&
              !product &&
              !productError && (
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="bg-neutral-900 py-4 text-center text-sm md:text-lg text-red-700 font-bold rounded">
                    Product not found. Try searching a valid ID.
                  </p>
                </motion.div>
              )}

            {product && !isFetching && !isProductLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-neutral-900 hover:bg-neutral-800 p-4 rounded-lg shadow-lg flex justify-between transition duration-300"
              >
                <div className="flex items-center space-x-4">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={50}
                      height={50}
                      className="rounded-md h-auto w-auto"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{product.title}</h3>
                    <p className="text-gray-400">
                      ${product?.price?.toFixed(2)}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => addToCart(product)}
                  className="mt-2 bg-white text-neutral-950 hover:bg-gray-200"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          <Table>
            <TableHeader>
              <TableRow className="hover:none">
                <TableHead className="w-[40%]">Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <AnimatePresence>
            {cart.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <Table>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={40}
                              height={40}
                              className="rounded-md"
                            />
                            <span>{item.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              aria-label={`Decrease quantity of ${item.title}`}
                            >
                              <Minus className="w-4 h-4 text-neutral-950" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  parseInt(e.target.value, 10)
                                )
                              }
                              className="w-16 text-center"
                              aria-label={`Quantity of ${item.title}`}
                            />
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              aria-label={`Increase quantity of ${item.title}`}
                            >
                              <Plus className="w-4 h-4 text-neutral-950" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>${item?.price?.toFixed(2)}</TableCell>
                        <TableCell>
                          ${(item.price * item.quantity)?.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.title} from cart`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-xl font-semibold">
                    Total: ${totalPrice?.toFixed(2)}
                  </p>
                  <Button className="bg-white text-neutral-950 hover:bg-gray-200">
                    Proceed to Checkout
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.p
                className="text-gray-400 text-center py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Your cart is empty. Try adding new items to cart.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
