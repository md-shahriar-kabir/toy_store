"use client";

import { useAxios } from "@/hooks/useAxios";
import Card from "../../shared/card/Card";
import Container from "../../shared/container/Container";
import SectionHeading from "../../shared/sectionHeading/SectionHeading";
import { Toy } from "@/types/product";

const TrendingToy = () => {
  const { data } = useAxios<Toy[]>("/toyData.json");

  // filter & limited product
  const trendingToys = data?.filter((toy) => toy.isTrending).slice(0,10);

  return (
    <Container>
      <SectionHeading heading="Trending Toys" borderWidth="w-60" />
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mb-20 ">
        {trendingToys?.map((toy) => (
          <Card key={toy.id} toy={toy} />
        ))}
      </div>
    </Container>
  );
};

export default TrendingToy;
