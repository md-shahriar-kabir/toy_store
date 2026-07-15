"use client";
import { useState } from "react";
import AnimationContainer from "@/components/shared/animationContainer/AnimationContainer";
import Container from "@/components/shared/container/Container";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Grid3x3,
  List,
  Eye,
  Tag,
  Package,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  description: string;
  products: number;
  status: "active" | "inactive" | "draft";
  createdAt: string;
  icon: string;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Electronics",
      description: "Electronic devices and gadgets",
      products: 45,
      status: "active",
      createdAt: "2024-01-10",
      icon: "💻",
    },
    {
      id: "2",
      name: "Clothing",
      description: "Men and women fashion wear",
      products: 120,
      status: "active",
      createdAt: "2024-01-05",
      icon: "👕",
    },
    {
      id: "3",
      name: "Home & Kitchen",
      description: "Home appliances and kitchen tools",
      products: 89,
      status: "active",
      createdAt: "2024-01-15",
      icon: "🏠",
    },
    {
      id: "4",
      name: "Books",
      description: "Educational and fiction books",
      products: 67,
      status: "inactive",
      createdAt: "2024-01-08",
      icon: "📚",
    },
    {
      id: "5",
      name: "Sports",
      description: "Sports equipment and accessories",
      products: 34,
      status: "active",
      createdAt: "2024-01-12",
      icon: "⚽",
    },
    {
      id: "6",
      name: "Beauty",
      description: "Cosmetics and beauty products",
      products: 56,
      status: "draft",
      createdAt: "2024-01-18",
      icon: "💄",
    },
    {
      id: "7",
      name: "Toys",
      description: "Children toys and games",
      products: 78,
      status: "active",
      createdAt: "2024-01-03",
      icon: "🧸",
    },
    {
      id: "8",
      name: "Automotive",
      description: "Car accessories and parts",
      products: 23,
      status: "active",
      createdAt: "2024-01-20",
      icon: "🚗",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    icon: "🏷️",
  });

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || category.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return;

    const newCat: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      description: newCategory.description,
      products: 0,
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
      icon: newCategory.icon,
    };

    setCategories([newCat, ...categories]);
    setNewCategory({ name: "", description: "", icon: "🏷️" });
    setShowAddModal(false);
  };

  const handleStatusChange = (id: string, newStatus: Category["status"]) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, status: newStatus } : cat
      )
    );
  };

  const getStatusBadge = (status: Category["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            <AlertCircle className="w-3 h-3 mr-1" /> Inactive
          </Badge>
        );
      case "draft":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Edit className="w-3 h-3 mr-1" /> Draft
          </Badge>
        );
      default:
        return null;
    }
  };

  const stats = {
    total: categories.length,
    active: categories.filter((cat) => cat.status === "active").length,
    products: categories.reduce((acc, cat) => acc + cat.products, 0),
  };

  return (
    <div>
      {/* Header Section */}
      <AnimationContainer
        variant="fade-down"
        className="sticky top-0 z-50 pt-5 pb-3 bg-white backdrop-blur-sm border-b"
      >
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Categories</h1>
              <p className="text-sm text-muted-foreground">
                Manage product categories and organization
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="btnTeal"
                onClick={() => setShowAddModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>
          </div>
        </Container>
      </AnimationContainer>

      <Container>
        <div className="space-y-6 mt-5">
          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <AnimationContainer variant="fade-up" delay={0.1}>
              <Card className="border rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Categories</p>
                      <p className="text-2xl font-bold">{stats.total}</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Tag className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimationContainer>

            <AnimationContainer variant="fade-up" delay={0.2}>
              <Card className="border rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Categories</p>
                      <p className="text-2xl font-bold">{stats.active}</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-green-50 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimationContainer>

            <AnimationContainer variant="fade-up" delay={0.3}>
              <Card className="border rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Products</p>
                      <p className="text-2xl font-bold">{stats.products}</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-purple-50 flex items-center justify-center">
                      <Package className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimationContainer>

            <AnimationContainer variant="fade-up" delay={0.4}>
              <Card className="border rounded-xl hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Average per Category</p>
                      <p className="text-2xl font-bold">
                        {Math.round(stats.products / stats.total)}
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-amber-50 flex items-center justify-center">
                      <Grid3x3 className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimationContainer>
          </div>

          {/* Filters and Controls */}
          <AnimationContainer variant="fade-up">
            <Card className="border rounded-xl">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="whitespace-nowrap">
                          <Filter className="h-4 w-4 mr-2" />
                          Status: {selectedStatus === "all" ? "All" : selectedStatus}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSelectedStatus("all")}>
                          All Categories
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setSelectedStatus("active")}>
                          Active
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedStatus("inactive")}>
                          Inactive
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedStatus("draft")}>
                          Draft
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimationContainer>

          {/* Categories List/Grid */}
          {viewMode === "list" ? (
            <AnimationContainer variant="fade-up">
              <Card className="border rounded-xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{category.icon}</span>
                            <div>
                              <p className="font-medium">{category.name}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-muted-foreground max-w-xs truncate">
                            {category.description}
                          </p>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{category.products}</span>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(category.status)}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {category.createdAt}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(
                                    category.id,
                                    category.status === "active" ? "inactive" : "active"
                                  )
                                }
                              >
                                {category.status === "active" ? (
                                  <>
                                    <AlertCircle className="h-4 w-4 mr-2" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onSelect={(e) => e.preventDefault()}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete
                                      the "{category.name}" category and remove all associated
                                      data.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteCategory(category.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </AnimationContainer>
          ) : (
            <AnimationContainer variant="fade-up">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredCategories.map((category) => (
                  <Card key={category.id} className="border rounded-xl hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-4xl">{category.icon}</span>
                        {getStatusBadge(category.status)}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm font-medium">
                          {category.products} products
                        </span>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{category.name}"?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteCategory(category.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AnimationContainer>
          )}

          {/* Add Category Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <AnimationContainer variant="fade-up">
                <Card className="w-full max-w-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Add New Category</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowAddModal(false)}
                      >
                        ✕
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Category Name
                        </label>
                        <Input
                          placeholder="Enter category name"
                          value={newCategory.name}
                          onChange={(e) =>
                            setNewCategory({ ...newCategory, name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Description
                        </label>
                        <textarea
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                          rows={3}
                          placeholder="Enter category description"
                          value={newCategory.description}
                          onChange={(e) =>
                            setNewCategory({ ...newCategory, description: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Icon (Emoji)
                        </label>
                        <Input
                          placeholder="Enter an emoji"
                          value={newCategory.icon}
                          onChange={(e) =>
                            setNewCategory({ ...newCategory, icon: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setShowAddModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddCategory}>
                        Add Category
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimationContainer>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CategoriesPage;