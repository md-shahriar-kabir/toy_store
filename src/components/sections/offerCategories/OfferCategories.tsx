import Container from "@/components/shared/container/Container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import toy1 from "@/assets/toy/toy-1.png";
import toy2 from "@/assets/toy/toy-2.png";
import toy3 from "@/assets/toy/toy-3.png";
import Link from "next/link";

const OfferCategories = () => {
  const categoriesData = [
    {
      title: "Learning Toys For kids",
      description: "Discover Amazing Offers!",
      imageUrl: toy1,
      backgroundColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      srcLink: "/categories/toys",
    },
    {
      title: "Superhero Collection 2026",
      description: "15% Off on Kids' Toys and Gifts!",
      imageUrl: toy2,
      backgroundColor: "bg-red-500",
      hoverColor: "hover:bg-red-600",
      srcLink: "/categories/toys",
    },
    {
      title: "Children Day Collection 2023",
      description: "15% Off on Kids' Toys and Gifts!",
      imageUrl: toy3,
      backgroundColor: "bg-teal-500",
      hoverColor: "hover:bg-teal-600",
      srcLink: "/categories/toys",
    },
  ];
  return (
    <Container>
      <div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mb-20">
        {categoriesData.map((category, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg flex flex-col-reverse sm:flex-row justify-between items-center transition ${category.backgroundColor} ${category.hoverColor} mb-4`}
          >
            <div>
              <h3 className="text-2xl text-white font-bold w-full sm:w-2/3 mb-2 text-center sm:text-left">
                {category.title}
              </h3>
              <p className="text-sm text-white/80 mb-3 text-center sm:text-left">
                {category.description}
              </p>
              <Link href={"/products"}>
                <Button className="w-full sm:w-2/3" variant={"secondary"}>
                  See Collections <ArrowRight />
                </Button>
              </Link>
            </div>
            <div className="mr-4">
              <Image
                src={category.imageUrl}
                width={200}
                height={200}
                alt="toys"
              ></Image>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default OfferCategories;
