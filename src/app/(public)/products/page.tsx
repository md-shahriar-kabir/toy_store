"use client";

import { Home, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import TopBar from "@/components/shared/topBar/TopBar";
import Navbar from "@/components/shared/navbar/Navbar";
import FooterSection from "@/components/shared/footer/FooterSection";
import AnimationContainer from "@/components/shared/animationContainer/AnimationContainer";
import SectionHeading from "@/components/shared/sectionHeading/SectionHeading";
import Container from "@/components/shared/container/Container";
import Card from "@/components/shared/card/Card";
import ProductSidebar from "@/components/shared/productSidebar/ProductSidebar";
import { useAxios } from "@/hooks/useAxios";
import { Toy, AgeGroup } from "@/types/product";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 8;

export default function ProductsPage() {
  const { data: products } = useAxios<Toy[]>("/toyData.json");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAges, setSelectedAges] = useState<AgeGroup[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔍 Step 1: Filtering
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((toy) => {
      const categoryMatch = selectedCategory
        ? toy.category === selectedCategory
        : true;

      const ageMatch =
        selectedAges.length > 0 ? selectedAges.includes(toy.ageGroup) : true;

      return categoryMatch && ageMatch;
    });
  }, [products, selectedCategory, selectedAges]);

  // 🔢 Step 2: Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  // ♻️ Reset page on filter change
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleAgeChange = (ages: AgeGroup[]) => {
    setSelectedAges(ages);
    setCurrentPage(1);
  };

  // ❌ Clear Filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedAges([]);
    setCurrentPage(1);
  };

  return (
    <div>
      <TopBar />
      <Navbar />

      <section className="bg-teal-50 pt-30 -mt-20 py-24">
        <Container>
          <Breadcrumb className="mb-5">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="size-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">All Products</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <SectionHeading heading="Our Products" borderWidth="w-50" />

          <div className="md:grid grid-cols-9 gap-10">
            {/* Sidebar */}
            <ProductSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              selectedAges={selectedAges}
              onAgeChange={handleAgeChange}
              onClearFilters={clearFilters}
            />

            {/* Products */}
            <AnimationContainer className="grid xl:col-span-7 md:col-span-6 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((toy) => <Card key={toy.id} toy={toy} />)
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No products found.
                </p>
              )}
            </AnimationContainer>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="col-span-9 mt-10 justify-center">
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    >
                      <ChevronLeft /> Prev
                    </Button>
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <Button
                        variant={currentPage === i + 1 ? "outline" : "ghost"}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <Button
                      variant="ghost"
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
                    >
                      Next <ChevronRight />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </Container>
      </section>

      <FooterSection />
    </div>
  );
}
