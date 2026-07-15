import Marquee from "react-fast-marquee";

const MarqueeSection = () => {
  return (
    <div className="bg-teal-600 py-4 mb-20">
      <Marquee autoFill={true} pauseOnHover={true}>
        <span className="text-white font-bold">20% DISCOUNT ON THE FIRST ORDER.</span>
        <span className="mx-3">🔥</span>
      </Marquee>
    </div>
  );
};

export default MarqueeSection;
