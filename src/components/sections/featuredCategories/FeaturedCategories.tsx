"use client";
import Container from "@/components/shared/container/Container";
import SectionHeading from "@/components/shared/sectionHeading/SectionHeading";
import toyImg from "../../../../public/toy/toy-5.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useAxios } from "@/hooks/useAxios";
import { ToyCategory } from "@/types/Toycategories";

const FeaturedCategories = () => {
  const { data } = useAxios<ToyCategory[]>("categories.json");

  return (
    <div className="mb-20 bg-teal-100 py-20">
      <Container>
        {/* Section Title */}
        <SectionHeading heading="Featured Categories" borderWidth="w-90" />

        {/* categories */}
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-[95%] mx-auto"
        >
          <CarouselContent>
            {data?.map((category) => (
              <CarouselItem
                key={category.slug}
                className="md:basis-1/3 sm:basis-1/2 lg:basis-1/5"
              >
                <div className="p-4 border rounded-2xl border-gray-100 shadow-md mb-4 bg-white hover:bg-teal-50 transition-all  flex flex-col items-center justify-center ">
                  <div className="h-40 w-40 rounded-full overflow-hidden">
                    {/* Image Placeholder */}
                    <Image
                      src={toyImg}
                      alt="toy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="mt-5 font-bold text-xl">{category.name}</h2>
                  <p className="text-gray-500">13 Products</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </Container>
    </div>
  );
};

export default FeaturedCategories;
