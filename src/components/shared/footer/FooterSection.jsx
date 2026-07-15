import Image from "next/image";
import footerImage from "../../../../public/background/footerBackground.svg";
import flowers1 from "../../../../public/background/flowers1.svg";
import flowers2 from "../../../../public/background/flowers2.svg";
import child1 from "../../../../public/background/child1.svg";
import child2 from "../../../../public/background/child2.svg";
import Container from "../container/Container";
import bgCloud from "../../../../public/background/bgCloud.svg";
import Marquee from "react-fast-marquee";
import Logo from "../logo/Logo";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

const FooterSection = () => {
  return (
    <div className="relative bg-linear-to-b min-h-137.5 from-teal-100 to-teal-50 pt-10 border-t-2 border-teal-200">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-between">
          {/* logo & description */}
          <div className="">
            <Logo />
            <p className="mt-3">
              A modern toy store offering fun, educational, and high-quality
              toys that inspire creativity and joyful learning.
            </p>
          </div>
          {/* quick links */}
          <div>
            <h3 className="font-bold">Quick Links</h3>
            <ul className="text-[#006769] space-y-5 mt-5">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Products</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          {/* contact info */}
          <div>
            <h3 className="font-bold">Contact Us</h3>
            <p className="text-[#006769] mt-5">Email: example@example.com</p>
            <p className="text-[#006769] mt-5">Phone: (123) 456-7890</p>
          </div>
          {/* social media links */}
          <div>
            <h3 className="font-bold">Follow Us</h3>
            <ul className="text-[#006769] flex gap-5 mt-5">
              <li>
                <FaFacebook size={24} />
              </li>
              <li>
                <FaXTwitter size={24} />
              </li>
              <li>
                <FaInstagram size={24} />
              </li>
            </ul>
          </div>
        </div>
        <p className="absolute bottom-30 md:bottom-6 md:left-1/2 md:-translate-x-1/2 z-50 text-center">
          © 2026 Toy Stars. Crafted with care for joyful learning. All rights
          reserved.
        </p>
      </Container>
      {/* Background elements */}
      <Marquee className="absolute w-full -mt-20 opacity-60 pointer-events-none">
        <Image src={bgCloud} alt="Footer background" />
      </Marquee>
      <Image
        src={footerImage}
        alt="Footer background"
        className="object-fill bottom-0 absolute w-full "
      />
      <Image
        src={flowers1}
        alt="Footer background"
        className="bottom-0 left-0 absolute "
      />
      <Image
        src={flowers2}
        alt="Footer background"
        className="bottom-0 right-0 absolute "
      />
      <Image
        src={child1}
        alt="Footer background"
        width={150}
        height={300}
        className="bottom-5 h-auto w-32 md:left-70 sm:left-20 left-10 absolute animate-gentle-float hidden sm:block"
      />
      <Image
        src={child2}
        alt="Footer background"
        width={150}
        height={300}
        className="bottom-10 h-auto w-32 md:right-70 sm:right-20 right-10 absolute animate-float-smooth hidden sm:block"
      />
    </div>
  );
};

export default FooterSection;
