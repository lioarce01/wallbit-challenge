import { ShoppingCart } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import ProductSkeleton from "./Skeleton";
import Image from "next/image";

interface ProductListProps {
  isFetching: boolean;
  isProductLoading: boolean;
  productError: any;
  searchId: string;
  product: any;
  addToCart: (product: any) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  isFetching,
  isProductLoading,
  productError,
  searchId,
  product,
  addToCart,
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
              <p className="text-gray-400">${product?.price?.toFixed(2)}</p>
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
    </>
  );
};

export default ProductList;
