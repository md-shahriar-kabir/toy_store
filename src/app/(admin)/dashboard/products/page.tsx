"use client";

import { useState } from "react";
import Container from "@/components/shared/container/Container";
import AnimationContainer from "@/components/shared/animationContainer/AnimationContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

/* ---------------- Types ---------------- */

type ProductStatus = "active" | "out-of-stock" | "draft";

type Product = {
  id: string;
  title: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
};

/* ---------------- Dummy Data ---------------- */

const products: Product[] = [
  {
    id: "1",
    title: "Remote Control Car",
    sku: "TOY-1001",
    category: "Vehicles",
    price: 4500,
    stock: 12,
    status: "active",
  },
  {
    id: "2",
    title: "Kids Building Blocks",
    sku: "TOY-1002",
    category: "Educational",
    price: 3200,
    stock: 0,
    status: "out-of-stock",
  },
  {
    id: "3",
    title: "Soft Teddy Bear",
    sku: "TOY-1003",
    category: "Plush",
    price: 2800,
    stock: 25,
    status: "active",
  },
  {
    id: "4",
    title: "Puzzle Game",
    sku: "TOY-1004",
    category: "Educational",
    price: 1800,
    stock: 5,
    status: "draft",
  },
];

/* ---------------- Helpers ---------------- */

const statusBadge: Record<ProductStatus, string> = {
  active: "bg-green-100 text-green-700 border-green-200",
  "out-of-stock": "bg-red-100 text-red-700 border-red-200",
  draft: "bg-gray-100 text-gray-700 border-gray-200",
};

/* ---------------- Page ---------------- */

export default function DashboardProductsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProductStatus | "all">(
    "all"
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <Container>
      <div className="space-y-6 py-6">
        {/* Header */}
        <AnimationContainer variant="fade-down">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Products</h1>
              <p className="text-sm text-muted-foreground">
                Manage all products from one place
              </p>
            </div>

            <Button variant="btnTeal" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </AnimationContainer>

        {/* Search & Filter */}
        <AnimationContainer variant="fade-up">
          <div className="flex flex-col sm:flex-row gap-3 rounded-xl border bg-card p-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by product name or SKU..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("out-of-stock")}
                >
                  Out of Stock
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("draft")}>
                  Draft
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </AnimationContainer>

        {/* Product Table */}
        <AnimationContainer variant="fade-up">
          <div className="rounded-xl border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.title}
                    </TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>৳ {product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusBadge[product.status]}
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-red-600">
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredProducts.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground py-10"
                    >
                      No products found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </AnimationContainer>
      </div>
    </Container>
  );
}
