import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/logo.png";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <Image src={logo} alt="Logo" width={50} height={32} />
      <span className="text-2xl font-black text-teal-700">Toy Stars</span>
    </Link>
  );
};

export default Logo;
