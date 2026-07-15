import Container from "@/components/shared/container/Container";
import { CircleDollarSign, Truck, Headset, HandCoins } from "lucide-react";

const Overview = () => {
  const overviewData = [
    {
      title: "Money Return",
      description: "Back guarantee under 7 days.",
      icon: CircleDollarSign,
      iconBackground: "bg-blue-400",
      background: "bg-blue-100",
    },
    {
      title: "Home Delivery",
      description: "Fast and reliable delivery.",
      icon: Truck,
      iconBackground: "bg-green-400",
      background: "bg-green-100",
    },
    {
      title: "24/7 Support",
      description: "Dedicated support in 24hrs.",
      icon: Headset,
      iconBackground: "bg-purple-400",
      background: "bg-purple-100",
    },
    {
      title: "Secure Payments",
      description: "Secure payment processing.",
      icon: HandCoins,
      iconBackground: "bg-orange-400",
      background: "bg-orange-100",
    },
  ];

  return (
    <Container>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-20 sm:mt-5 mb-20">
        {overviewData.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 ${item.background} rounded-lg`}
            >
              <div
                className={`${item.iconBackground} p-4 text-white rounded-full`}
              >
                <Icon size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p className="text-sm">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Overview;
