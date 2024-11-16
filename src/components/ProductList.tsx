import { ShoppingCart } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import ProductSkeleton from "./Skeleton";
import Image from "next/image";
import Rating from "./Rating";

interface ProductListProps {
  isFetching: boolean;
  isProductLoading: boolean;
  productError: any;
  searchId: string;
  product: any;
  addToCart: (product: any) => void;
  productCount: number;
}

const ProductList: React.FC<ProductListProps> = ({
  isFetching,
  isProductLoading,
  productError,
  searchId,
  product,
  addToCart,
  productCount,
}) => {
  return (
    <>
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
            <p className="bg-neutral-900 py-4 text-center text-sm md:text-md text-red-700 font-bold rounded text-wrap px-2">
              Product not found. Try searching by ID between 1 - {productCount}
            </p>
          </motion.div>
        )}

      {product && !isFetching && !isProductLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-neutral-900 hover:bg-neutral-800 p-4 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between md:items-center transition duration-300"
        >
          <div className="flex items-center space-x-4 sm:flex-row flex-col ">
            {product.image && (
              <Image
                src={product.image}
                alt={product.title}
                width={50}
                height={50}
                className="rounded-md h-auto w-auto"
              />
            )}
            <div className="mt-2 sm:mt-0 space-y-2">
              <h3 className="font-semibold text-lg sm:text-xl">
                {product.title}
              </h3>
              <Rating product={product} />
              <div className="flex space-x-4">
                <p className="text-gray-400 text-sm sm:text-base">
                  ${product?.price?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => addToCart(product)}
            className="mt-2 sm:mt-0 bg-white text-neutral-950 hover:bg-gray-200"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </motion.div>
      )}
    </>
  );
};

export default ProductList;
