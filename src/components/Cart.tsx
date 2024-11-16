"use client";

import React from "react";
import { Table, TableHead, TableHeader, TableRow } from "./ui/table";
import { AnimatePresence } from "framer-motion";

import CartList from "./CartList";

interface CartProps {
  cart: any;
  createdAt: string | null;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (product: any) => void;
  totalPrice: number;
}

const Cart: React.FC<CartProps> = ({
  cart,
  createdAt,
  updateQuantity,
  removeFromCart,
  totalPrice,
}) => {
  return (
    <div className="px-4">
      <div className="flex flex-col md:flex-row w-full justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold mb-4 md:mb-0">Your Cart</h2>
        <h2 className="text-lg font-semibold mb-4 text-neutral-300">
          {createdAt}
        </h2>
      </div>

      <div className="hidden md:block">
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
          <CartList
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            totalPrice={totalPrice}
            createdAt={createdAt}
          />
        </AnimatePresence>
      </div>

      <div className="md:hidden">
        <AnimatePresence>
          <CartList
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            totalPrice={totalPrice}
            createdAt={createdAt}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Cart;
