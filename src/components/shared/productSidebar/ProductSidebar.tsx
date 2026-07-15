"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import AnimationContainer from "../animationContainer/AnimationContainer";
import SectionHeading from "../sectionHeading/SectionHeading";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { useAxios } from "@/hooks/useAxios";
import { ToyCategory } from "@/types/Toycategories";
import { AgeGroup } from "@/types/product";
import { Button } from "@/components/ui/button";

type ProductSidebarProps = {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedAges: AgeGroup[];
  onAgeChange: (ages: AgeGroup[]) => void;
  onClearFilters: () => void;
};

const ageOptions: { label: string; value: AgeGroup }[] = [
  { label: "0-2 Years (Infant Toys)", value: "0-2" },
  { label: "3-5 Years (Preschool Toys)", value: "3-5" },
  { label: "6-8 Years", value: "6-8" },
  { label: "9-12 Years", value: "9-12" },
  { label: "12+ Years", value: "12+" },
];

const ProductSidebar = ({
  selectedCategory,
  onCategoryChange,
  selectedAges,
  onAgeChange,
  onClearFilters,
}: ProductSidebarProps) => {
  const { data: categories } = useAxios<ToyCategory[]>("/categories.json");

  const toggleAge = (age: AgeGroup) => {
    if (selectedAges.includes(age)) {
      onAgeChange(selectedAges.filter((a) => a !== age));
    } else {
      onAgeChange([...selectedAges, age]);
    }
  };

  return (
    <AnimationContainer
      variant="fade-left"
      className="rounded-md xl:col-span-2 lg:col-span-3 md:col-span-3 border bg-white p-5"
    >
      {/* Category */}
      <SectionHeading heading="Shop by" borderWidth="w-30" textSize="text-xl" />

      <ScrollArea className="h-80 -mt-5 mb-5">
        {categories?.map((category) => (
          <div
            key={category.slug}
            onClick={() =>
              onCategoryChange(
                selectedCategory === category.name ? null : category.name,
              )
            }
            className={`border w-[96%] rounded-sm my-1 p-2 flex items-center justify-between cursor-pointer
              ${
                selectedCategory === category.name
                  ? "bg-teal-200 text-teal-800"
                  : "bg-teal-50 hover:bg-teal-100 text-teal-600"
              }`}
          >
            {category.name} <ArrowRight size={15} />
          </div>
        ))}
      </ScrollArea>
      <Button
        variant="outline"
        className="w-full mb-4"
        onClick={onClearFilters}
      >
        Clear Filters
      </Button>

      {/* Age Filter */}
      <SectionHeading
        heading="Filter by"
        borderWidth="w-35"
        textSize="text-xl"
      />

      <div className="space-y-3">
        {ageOptions.map((age) => (
          <div key={age.value} className="flex items-center space-x-2">
            <Checkbox
              checked={selectedAges.includes(age.value)}
              onCheckedChange={() => toggleAge(age.value)}
            />
            <Label>{age.label}</Label>
          </div>
        ))}
      </div>
    </AnimationContainer>
  );
};

export default ProductSidebar;
