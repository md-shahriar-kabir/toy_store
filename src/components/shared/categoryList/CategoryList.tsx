"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useAxios } from "@/hooks/useAxios";
import { ToyCategory } from "@/types/Toycategories";
import { ArrowRight, SquareMenu } from "lucide-react";
import { useRouter } from "next/navigation";

const CategoryList = () => {
  const { data } = useAxios<ToyCategory[]>("/categories.json");
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div>
      <h2 className="text-gray-500 font-semibold my-2">All Categories:</h2>

      <ScrollArea className="h-80">
        {data?.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className="border w-[97%] border-teal-200 text-teal-600 rounded-sm my-1 p-2 flex items-center justify-between bg-teal-50 hover:bg-teal-100 cursor-pointer"
          >
            <div className="flex items-center gap-1">
              <SquareMenu size={17} />
              {category.name}
            </div>
            <ArrowRight size={15} />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default CategoryList;
