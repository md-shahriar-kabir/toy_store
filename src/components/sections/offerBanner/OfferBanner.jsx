import Container from "@/components/shared/container/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import toy4 from "@/assets/toy/toy-4.png";
import toy5 from "@/assets/toy/toy-5.png";

const OfferBanner = () => {
  return (
    <Container>
      <div className="relative flex flex-col md:flex-row items-center justify-between mb-20">
        {/* Title And Images */}
        <div className="bg-[#E6FF94] w-full xl:w-3/7 h-120 p-7 flex flex-col justify-between">
          <h2 className="text-5xl font-bold">Winter Collection!</h2>
          <div className="xl:absolute bottom-20 flex gap-10">
            <div className="bg-white w-full h-60 md:h-40 xl:w-80 xl:h-60 border-5 border-[#d6e79b]">
              <Image
                src={toy4}
                width={400}
                height={200}
                alt="toys"
                className="h-full object-cover"
              />
            </div>
            <div className="bg-white w-full hidden sm:block h-60 md:h-40 xl:w-80 xl:h-60 border-5 border-[#d6e79b]">
              <Image
                src={toy5}
                width={400}
                height={200}
                alt="toys"
                className="h-full object-cover"
              />
            </div>
          </div>
          <p className="text-right text-xl">
            Get 20% off on Winter Collection!
          </p>
        </div>

        {/* Offer Details */}
        <div className="bg-[#006769] w-full xl:w-4/7 h-120 text-right md:pr-30 pr-10 flex flex-col justify-center text-white">
          <div>
            <p className="text-3xl font-semibold ">Sale! Offer!</p>
            <h1 className="text-[7rem] font-black -my-5 ">50%</h1>
            <p className="mb-3 text-2xl">Discount Limited Time</p>
            <Button variant={"outline"}>See All Collection</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OfferBanner;
