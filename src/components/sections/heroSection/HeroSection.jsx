"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import background from "../../../../public/background/cloudy.png";
import toy1 from "@/assets/toy/toy-1.png";
import toy2 from "@/assets/toy/toy-2.png";
import toy3 from "@/assets/toy/toy-3.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, EffectFlip } from "swiper/modules";
import Container from "@/components/shared/container/Container";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Marquee from "react-fast-marquee";
import bgCloud from "../../../../public/background/bgCloud.svg";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative -mt-20 h-[85vh] bg-teal-100">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center pt-25 lg:pt-40">
          {/* Main Title & Description */}
          <div className="flex flex-col items-center md:items-start z-10 animate__animated animate__bounceIn">
            <h1 className="lg:text-7xl md:text-5xl text-4xl text-center md:text-left font-bold text-[#006769]">
              Welcome to <br className="hidden md:block" />
              Toy Stars
            </h1>
            <p className="mt-4 text-[#36656B] text-lg text-center md:text-left">
              Empowering communities through shared growth and support.
            </p>
            <Link href={"/products"}>
              <Button variant={"btnTeal"} className="mt-4 px-4 rounded-sm">
                Shop Now
              </Button>
            </Link>
          </div>
          {/* Image Carousel */}
          <div>
            <Swiper
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              effect={"flip"}
              grabCursor={true}
              pagination={true}
              navigation={true}
              modules={[EffectFlip, Autoplay]}
              className="mySwiper  mt-5 md:mt-0 w-60 md:w-100 lg:w-150 h-100 "
            >
              <SwiperSlide>
                <div className="flex justify-center border-2 sm:border-none border-teal-200  bg-teal-100 h-60 sm:h-100">
                  <Image src={toy1} alt="toy photo" width={400} height={300} />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex justify-center border-2 sm:border-none border-teal-200  bg-teal-100 h-60 sm:h-100">
                  <Image src={toy2} alt="toy photo" width={400} height={300} />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex justify-center border-2 sm:border-none border-teal-200  bg-teal-100 h-60 sm:h-100">
                  <Image src={toy3} alt="toy photo" width={400} height={300} />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </Container>

      {/*Cloudy Background Image */}
      <div
        className="absolute -bottom-10 h-50 "
        style={{
          width: "100%",
          backgroundImage: `url(${background.src})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto",
        }}
      ></div>
      <Marquee className="absolute w-full  opacity-40  bottom-50 z-10 pointer-events-none">
        <Image src={bgCloud} alt="Footer background" />
      </Marquee>
    </div>
  );
};

export default HeroSection;
