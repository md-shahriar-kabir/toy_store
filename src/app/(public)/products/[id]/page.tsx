"use client";

import TopBar from "@/components/shared/topBar/TopBar";
import AnimationContainer from "../../../../components/shared/animationContainer/AnimationContainer";
import { Heart, Home, ShoppingCart } from "lucide-react";
import Navbar from "@/components/shared/navbar/Navbar";
import FooterSection from "@/components/shared/footer/FooterSection";
import Container from "@/components/shared/container/Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "next/navigation";
import { useAxios } from "@/hooks/useAxios";
import { Toy } from "@/types/product";
import { Rating } from "@/components/ui/rating";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import NumberField from "@/components/shared/numberField/NumberField";
import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { data, loading } = useAxios<Toy[]>("/toyData.json");
  const { addToCart } = useCart();

  if (loading) {
    return <p>Loading...</p>;
  }
  const product = data?.find((item) => item.slug === id);
  return (
    <div>
      <TopBar />
      <Navbar />

      <Container>
        <Breadcrumb className="mt-7">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="cursor-pointer" href="/">
                <Home className="size-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="cursor-pointer" href="/products">
                All Products
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="cursor-pointer">
                {product?.slug}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section className="pb-20 pt-10">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Product Image */}
            <AnimationContainer variant="scale">
              <div className="animate__animated animate__fadeInLeft rounded-3xl border bg-card p-6">
                <div className=" w-full rounded-2xl bg-muted overflow-hidden">
                  <Image
                    width={600}
                    height={300}
                    src={product?.images[0] || "/images/fallback.png"}
                    alt={product?.title || "Product Image"}
                    className="rounded-2xl w-full h-auto object-contain"
                  />
                </div>
              </div>
            </AnimationContainer>

            {/* Product Info */}
            <AnimationContainer variant="fade-right">
              <div className="animate__animated animate__fadeInRight">
                <h1 className="text-4xl font-bold text-teal-600">
                  {product?.title}
                </h1>
                <p className="mt-3 text-muted-foreground">
                  {product?.shortDescription}
                </p>

                {/* category */}
                <div className="mt-6 flex items-center  gap-1">
                  <Badge>{product?.category}</Badge>
                </div>
                {/* Rating */}
                <div className="mt-6 flex items-center  gap-1">
                  <Rating rating={4.5} showValue={true} size={"md"} />
                </div>

                {/* Price */}
                <p className="mt-6 text-3xl font-semibold text-primary flex items-center gap-2">
                  <FaBangladeshiTakaSign />
                  {product?.currentPrice}
                  <del className="text-gray-400 font-light">
                    {product?.oldPrice}
                  </del>
                </p>
                <div className="mt-5">
                  <NumberField value={1} min={1} max={10} />
                </div>
                {/* Actions */}
                <div className="mt-5 flex flex-wrap gap-4">
                  <Button
                    onClick={() =>
                      addToCart({
                        id: product!.id,
                        name: product!.title,
                        price: product!.currentPrice,
                        image: product!.images[0],
                      })
                    }
                    variant={"btnTeal"}
                    size={"lg"}
                    className="w-1/2"
                  >
                    <ShoppingCart className="h-5 w-5" /> Add to Cart
                  </Button>
                  <Button variant={"outline"} size={"lg"}>
                    Buy Now
                  </Button>
                </div>
                <Button className="mt-5" variant={"outline"}>
                  {" "}
                  <Heart /> Add to Wishlist
                </Button>
                {/* Extra Info */}
                <div className="mt-10 space-y-2 text-sm text-muted-foreground">
                  <p>✔ Free Delivery</p>
                  <p>✔ 7 Days Replacement</p>
                  <p>✔ Cash on Delivery Available</p>
                </div>
              </div>
            </AnimationContainer>
          </div>

          {/* Description Section */}
          <AnimationContainer className="mt-24">
            <div className="animate__animated animate__fadeInUp rounded-3xl border bg-card p-10">
              <h2 className="text-2xl font-bold">Product Description:</h2>
              <h3 className="text-xl font-semibold mt-3">Product Overview</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {product?.longDescription.productOverview.map((list, index) => (
                  <li className="ml-5" key={index}>
                    {list}
                  </li>
                ))}
              </p>
              <h3 className="text-xl font-semibold mt-3">Key Features</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {product?.longDescription.keyFeatures.map((list, index) => (
                  <li className="ml-5" key={index}>
                    {list}
                  </li>
                ))}
              </p>
              <h3 className="text-xl font-semibold mt-3">
                Product Specifications
              </h3>
              <Table className="w-full border my-3">
                <TableBody>
                  {product?.longDescription.productSpecifications.map(
                    (describe, index) => (
                      <TableRow
                        key={index}
                        className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
                      >
                        <TableCell className="bg-muted/50 py-2 font-medium">
                          {describe.split(":")[0]}
                        </TableCell>
                        <TableCell className="py-2">
                          {describe.split(":")[1]}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>

              <h3 className="text-xl font-semibold mt-3">
                Warranty Information
              </h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {product?.longDescription.warrantyInformation.map(
                  (list, index) => (
                    <li className="ml-5" key={index}>
                      {list}
                    </li>
                  )
                )}
              </p>
            </div>
          </AnimationContainer>
        </section>
      </Container>
      <FooterSection />
    </div>
  );
}
