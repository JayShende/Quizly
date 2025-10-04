import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCards = () => {
  return (
    <div className="sm:px-2 px-5 py-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="flex flex-col gap-4 border-2 border-gray-200 rounded-xl pb-4">
        <Skeleton className="h-44 w-full" />
        <div className="flex flex-col gap-4 px-6 py-6">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-9 w-48 mx-auto " />
      </div>
      <div className="flex flex-col gap-4 border-2 border-gray-200 rounded-xl pb-4">
        <Skeleton className="h-44 w-full" />
        <div className="flex flex-col gap-4 px-6 py-6">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-9 w-48 mx-auto " />
      </div>
      <div className="flex flex-col gap-4 border-2 border-gray-200 rounded-xl pb-4">
        <Skeleton className="h-44 w-full" />
        <div className="flex flex-col gap-4 px-6 py-6">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-9 w-48 mx-auto " />
      </div>
    </div>
  );
};

export default SkeletonCards;
