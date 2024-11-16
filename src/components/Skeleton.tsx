"use client";

import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="mt-4 bg-neutral-900 p-4 rounded-lg shadow-lg animate-pulse flex justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-[50px] h-[50px] bg-gray-800 rounded-md"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-32"></div>
          <div className="h-4 bg-gray-700 rounded w-20"></div>
        </div>
      </div>
      <div className="w-24 h-10 bg-gray-700 rounded"></div>
    </div>
  );
};

export default ProductSkeleton;
