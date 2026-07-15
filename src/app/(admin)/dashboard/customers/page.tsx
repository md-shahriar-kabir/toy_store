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
  User,
  ShoppingBag,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Ban,
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

interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  status: "active" | "inactive" | "blocked";
  createdAt: string;
  avatar: string; // প্রোফাইল পিকচার বা ইনিশিয়াল দেখানোর জন্য
}

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "Rakib Ahmed",
      email: "rakib.ahmed@example.com",
      orders: 12,
      spent: 4500,
      status: "active",
      createdAt: "2024-01-10",
      avatar: "RA",
    },
    {
      id: "2",
      name: "Sadia Islam",
      email: "sadia.islam@example.com",
      orders: 25,
      spent: 12500,
      status: "active",
      createdAt: "2024-01-05",
      avatar: "SI",
    },
    {
      id: "3",
      name: "Tanvir Rahman",
      email: "tanvir.r@example.com",
      orders: 0,
      spent: 0,
      status: "inactive",
      createdAt: "2024-01-15",
      avatar: "TR",
    },
    {
      id: "4",
      name: "Anika Rahman",
      email: "anika.b@example.com",
      orders: 8,
      spent: 3200,
      status: "blocked",
      createdAt: "2024-01-08",
      avatar: "AR",
    },
    {
      id: "5",
      name: "Fahim Faisal",
      email: "fahim.faisal@example.com",
      orders: 19,
      spent: 7800,
      status: "active",
      createdAt: "2024-01-12",
      avatar: "FF",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
  });

  // সার্চ এবং ফিল্টারিং লজিক (Name এবং Email দুটি দিয়েই সার্চ করা যাবে)
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter((cust) => cust.id !== id));
  };

  const handleAddCustomer = () => {
    if (!newCustomer.name.trim() || !newCustomer.email.trim()) return;

    // নামের প্রথম অক্ষর দিয়ে ইনিশিয়াল অ্যাভাটার তৈরি
    const initials = newCustomer.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const newCust: Customer = {
      id: Date.now().toString(),
      name: newCustomer.name,
      email: newCustomer.email,
      orders: 0,
      spent: 0,
      status: "inactive", // ডিফল্ট স্ট্যাটাস
      createdAt: new Date().toISOString().split("T")[0],
      avatar: initials || "CU",
    };

    setCustomers([newCust, ...customers]);
    setNewCustomer({ name: "", email: "" });
    setShowAddModal(false);
  };

  const handleStatusChange = (id: string, newStatus: Customer["status"]) => {
    setCustomers(
      customers.map((cust) =>
        cust.id === id ? { ...cust, status: newStatus } : cust
      )
    );
  };

  const getStatusBadge = (status: Customer["status"]) => {
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
      case "blocked":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <Ban className="w-3 h-3 mr-1" /> Blocked
          </Badge>
        );
      default:
        return null;
    }
  };

  // কাস্টমার ড্যাশবোর্ড স্ট্যাটস ক্যালকুলেশন
  const stats = {
    total: customers.length,
    active: customers.filter((cust) => cust.status === "active").length,
    totalSpent: customers.reduce((acc, cust) => acc + cust.spent, 0),
    totalOrders: customers.reduce((acc, cust) => acc + cust.orders, 0),
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
              <h1 className="text-2xl font-bold">Customers</h1>
              <p className="text-sm text-muted-foreground">
                Manage your customer base, track their orders and lifetime value.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="btnTeal" onClick={() => setShowAddModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
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
                      <p className="text-sm text-muted-foreground">Total Customers</p>
                      <p className="text-2xl font-bold">{stats.total}</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
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
                      <p className="text-sm text-muted-foreground">Active Members</p>
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
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">${stats.totalSpent.toLocaleString()}</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-purple-50 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-purple-600" />
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
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold">{stats.totalOrders}</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-amber-50 flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-amber-600" />
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
                        placeholder="Search by name or email..."
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
                          All Customers
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setSelectedStatus("active")}>
                          Active
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedStatus("inactive")}>
                          Inactive
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedStatus("blocked")}>
                          Blocked
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "list" ? "primary" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "grid" ? "primary" : "outline"}
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

          {/* Customers List/Grid View */}
          {viewMode === "list" ? (
            <AnimationContainer variant="fade-up">
              <Card className="border rounded-xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 bg-teal-100 text-teal-800 font-semibold rounded-full flex items-center justify-center text-sm">
                              {customer.avatar}
                            </div>
                            <div>
                              <p className="font-medium">{customer.name}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>
                          <span className="font-medium">{customer.orders}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">${customer.spent.toLocaleString()}</span>
                        </TableCell>
                        <TableCell>{getStatusBadge(customer.status)}</TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {customer.createdAt}
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
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(
                                    customer.id,
                                    customer.status === "active" ? "blocked" : "active"
                                  )
                                }
                              >
                                {customer.status === "active" ? (
                                  <>
                                    <Ban className="h-4 w-4 mr-2 text-red-600" />
                                    Block Customer
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                                    Unblock / Activate
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
                                    Delete Account
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action will permanently delete the customer account for
                                      "{customer.name}" and erase their transaction history.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteCustomer(customer.id)}
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
                {filteredCustomers.map((customer) => (
                  <Card key={customer.id} className="border rounded-xl hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="h-12 w-12 bg-teal-100 text-teal-800 font-bold rounded-full flex items-center justify-center text-lg">
                          {customer.avatar}
                        </div>
                        {getStatusBadge(customer.status)}
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{customer.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 truncate">
                        {customer.email}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t text-sm mb-4">
                        <div>
                          <p className="text-muted-foreground text-xs">Orders</p>
                          <p className="font-semibold text-gray-800">{customer.orders}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Total Spent</p>
                          <p className="font-semibold text-gray-800">${customer.spent.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 mt-4">
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
                              <AlertDialogTitle>Delete Customer</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete the records for "{customer.name}"?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteCustomer(customer.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AnimationContainer>
          )}

          {/* Add Customer Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <AnimationContainer variant="fade-up">
                <Card className="w-full max-w-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Add New Customer</h3>
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
                          Full Name
                        </label>
                        <Input
                          placeholder="Enter customer name"
                          value={newCustomer.name}
                          onChange={(e) =>
                            setNewCustomer({ ...newCustomer, name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          value={newCustomer.email}
                          onChange={(e) =>
                            setNewCustomer({ ...newCustomer, email: e.target.value })
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
                      <Button onClick={handleAddCustomer}>
                        Add Customer
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

export default CustomersPage;