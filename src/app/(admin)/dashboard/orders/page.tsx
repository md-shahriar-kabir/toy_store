"use client";
import AnimationContainer from "@/components/shared/animationContainer/AnimationContainer";
import Container from "@/components/shared/container/Container";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  RefreshCcw,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  MoreVertical,
  Search,
  Filter,
  LucideIcon,
} from "lucide-react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: 'delivered' | 'processing' | 'shipped' | 'pending' | 'cancelled';
  items: number;
}

interface ChartData {
  name: string;
  value: number;
}

const stats: StatItem[] = [
  {
    title: "Total Products",
    value: "342",
    change: "+20.1%",
    icon: DollarSign,
  },
  {
    title: "Created last month",
    value: "50",
    change: "+18.0%",
    icon: ShoppingCart,
  },
  {
    title: "Approval Pending",
    value: "10",
    change: "+19%",
    icon: Users,
  },
  {
    title: "Archived",
    value: "21",
    change: "-2.3%",
    icon: Package,
  },
];


const orders: Order[] = [
  {
    id: "#ORD-7841",
    customer: "John Smith",
    date: "2024-01-15",
    amount: "$245.99",
    status: "delivered",
    items: 3,
  },
  {
    id: "#ORD-7840",
    customer: "Sarah Johnson",
    date: "2024-01-14",
    amount: "$189.50",
    status: "processing",
    items: 5,
  },
  {
    id: "#ORD-7839",
    customer: "Michael Chen",
    date: "2024-01-13",
    amount: "$450.00",
    status: "shipped",
    items: 2,
  },
  {
    id: "#ORD-7838",
    customer: "Emma Wilson",
    date: "2024-01-12",
    amount: "$99.99",
    status: "pending",
    items: 1,
  },
  {
    id: "#ORD-7837",
    customer: "David Brown",
    date: "2024-01-11",
    amount: "$320.75",
    status: "cancelled",
    items: 4,
  },
];

const data: ChartData[] = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "processing":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "shipped":
      return <Truck className="h-4 w-4 text-purple-500" />;
    case "pending":
      return <Clock className="h-4 w-4 text-amber-500" />;
    case "cancelled":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusColor = (status: Order['status']): string => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-purple-100 text-purple-800";
    case "pending":
      return "bg-amber-100 text-amber-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: Order['status']): string => {
  switch (status) {
    case "delivered":
      return "Delivered";
    case "processing":
      return "Processing";
    case "shipped":
      return "Shipped";
    case "pending":
      return "Pending";
    case "cancelled":
      return "Cancelled";
    default:
      return "Unknown";
  }
};

const Page = () => {
  return (
    <div>
      <AnimationContainer
        variant="fade-down"
        className="sticky top-0 z-70 pt-5 pb-3 bg-white backdrop:2xl border-b "
      >
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Orders</h1>
              <p className="text-sm text-muted-foreground">
                Manage and track all customer orders
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant={"outline"}>Last 30 Days</Button>
              <Button variant={"outline"}>
                <RefreshCcw className="h-4 w-4" /> Refresh
              </Button>
              <Button variant={"btnTeal"}>
                <Download className="h-4 w-4" /> Export
              </Button>
            </div>
          </div>
        </Container>
      </AnimationContainer>
      <Container>
        <div className="space-y-10 mt-5">
          {/* Header */}

          {/* Stats Cards */}
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item, i) => (
              <AnimationContainer key={i} variant="fade-up">
                <div className="rounded-2xl border bg-card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {item.title}
                    </p>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-4 w-4" />
                    </div>
                  </div>

                  <p className="mt-4 text-2xl font-bold">{item.value}</p>
                  <p
                    className={`mt-2 text-xs font-medium ${
                      item.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {item.change}
                  </p>
                </div>
              </AnimationContainer>
            ))}
          </div>

          <div className="flex gap-10">
            {/* Chart Section */}
            <AnimationContainer className="w-1/2">
              <div className="rounded-2xl border h-100 bg-card p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie 
                      data={data} 
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={80} 
                      fill="#8884d8" 
                      label 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </AnimationContainer>

            {/* Order List */}
            <AnimationContainer className="w-1/2">
              <div className="rounded-2xl border bg-card p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Recent Orders</h2>
                    <p className="text-sm text-muted-foreground">
                      Latest 5 customer orders
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-lg border p-4 hover:bg-muted/50 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(order.status)}
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.customer}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold">{order.amount}</p>
                            <p className="text-xs text-muted-foreground">
                              {order.date}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {order.items} item{order.items > 1 ? 's' : ''}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t pt-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {orders.length} of 342 orders
                  </p>
                  <Button variant="outline" size="sm">
                    View All Orders
                  </Button>
                </div>
              </div>
            </AnimationContainer>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Page;