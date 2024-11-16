import { motion } from "framer-motion";
import React from "react";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import Image from "next/image";
import { Button } from "./ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Input } from "./ui/input";

interface CartListProps {
  cart: any;
  createdAt: string | null;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (product: any) => void;
  totalPrice: number;
}

const CartList: React.FC<CartListProps> = ({
  cart,
  updateQuantity,
  removeFromCart,
  totalPrice,
}) => {
  return (
    <>
      {cart.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="hidden md:block">
            <Table>
              <TableBody>
                {cart.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={40}
                          height={40}
                          className="rounded-md h-auto w-auto"
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
          </div>

          <div className="md:hidden">
            {cart.map((item: any) => (
              <div
                key={item.id}
                className="bg-neutral-900 p-4 mb-4 rounded-lg shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={40}
                    height={40}
                    className="rounded-md h-auto w-auto"
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-400">
                      ${item?.price?.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-400">
                      Subtotal: ${(item.price * item.quantity)?.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      <Minus className="w-4 h-4 text-neutral-950" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value, 10))
                      }
                      className="w-16 text-center"
                      aria-label={`Quantity of ${item.title}`}
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      <Plus className="w-4 h-4 text-neutral-950" />
                    </Button>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

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
    </>
  );
};

export default CartList;
