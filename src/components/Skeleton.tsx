"use client";

import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="mt-4 bg-neutral-900 p-4 rounded-lg shadow-lg animate-pulse flex flex-col md:flex-row justify-between">
      <div className="flex items-center space-x-4 md:space-x-6">
        <div className="w-[50px] h-[80px] bg-gray-800 rounded-md"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-32 md:w-40"></div>
          <div className="h-4 bg-gray-700 rounded w-20 md:w-28"></div>
        </div>
      </div>
      <div className="w-24 h-8 bg-gray-700 rounded mt-4 md:mt-0 sm:w-full md:w-32"></div>
    </div>
  );
};

export default ProductSkeleton;
