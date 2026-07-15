import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Toy } from "@/types/product";

type CardProps = {
  toy: Toy;
};

const Card = ({ toy }: CardProps) => {
  return (
    <div className="mt-5 relative flex flex-col  bg-linear-to-br from-white border bg-clip-border text-gray-700 max-h-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative mx-4 -mt-6  overflow-hidden border rounded-md bg-clip-border shadow-lg group">
        <Image
          src={toy?.images[0]}
          alt="toy image"
          width={450}
          height={200}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        {/* Ratings & Category */}
        <div className="flex justify-between items-center">
          <Badge
            size={"sm"}
            variant="secondary"
            appearance="outline"
            shape="circle"
          >
            {toy?.category}
          </Badge>
          <Rating rating={toy?.rating} showValue={true} size={"s"} />
        </div>
        {/* Title & Description */}
        <h5 className="my-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-primary antialiased group-hover:text-blue-600 transition-colors duration-300">
          {toy?.title}
        </h5>
        <p className="flex-1 block font-sans text-sm font-light leading-relaxed text-gray-700 antialiased">
          {toy?.shortDescription}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <FaBangladeshiTakaSign size={15} />
            <h3 className="font-semibold mr-2">{toy?.currentPrice}</h3>

            <del className="flex items-center text-gray-400">
              <span className="text-xl mb-1">৳</span>
              {toy?.oldPrice}
            </del>
          </div>
          {toy?.inStock ? (
            <Badge
              size={"md"}
              variant="success"
              appearance="outline"
              shape="circle"
            >
              In Stock
            </Badge>
          ) : (
            <Badge
              size={"md"}
              variant="destructive"
              appearance="outline"
              shape="circle"
            >
              Stock Out
            </Badge>
          )}
        </div>
      </div>
      {/* Button */}
      <div className=" border  pt-0">
        <Link href={`products/${toy?.slug}`}>
          <Button variant={"btnTeal"} className="w-full rounded-none">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
