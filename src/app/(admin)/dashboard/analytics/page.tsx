"use client";

import { useState } from "react";
import AnimationContainer from "@/components/shared/animationContainer/AnimationContainer";
import Container from "@/components/shared/container/Container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Layers,
  Percent,
} from "lucide-react";

interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  stock: number;
  conversion: number;
}

interface RevenueBar {
  day: string;
  amount: number;
  percentage: number; // কাস্টম গ্রাফ বারের হাইটের জন্য
}

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "12m">("7d");

  // ড্যাশবোর্ড স্ট্যাটস ডেটা
  const stats = {
    revenue: { total: 142500, change: "+12.5%", isPositive: true },
    orders: { total: 1240, change: "+8.2%", isPositive: true },
    customers: { total: 840, change: "-2.1%", isPositive: false },
    conversionRate: { total: "3.42%", change: "+0.6%", isPositive: true },
  };

  // কাস্টম পিওর সিএসএস উইকলি সেলস গ্রাফ ডেটা
  const weeklyRevenue: RevenueBar[] = [
    { day: "Sat", amount: 12000, percentage: 45 },
    { day: "Sun", amount: 18000, percentage: 68 },
    { day: "Mon", amount: 15000, percentage: 55 },
    { day: "Tue", amount: 26500, percentage: 100 }, // Peak Day
    { day: "Wed", amount: 21000, percentage: 80 },
    { day: "Thu", amount: 19500, percentage: 74 },
    { day: "Fri", amount: 14000, percentage: 50 },
  ];

  // টপ সেলিং প্রোডাক্টস ডেটা
  const topProducts: TopProduct[] = [
    { id: "1", name: "Wireless Earbuds M10", sales: 340, revenue: 17000, stock: 45, conversion: 4.2 },
    { id: "2", name: "Smart Watch Series 8", sales: 210, revenue: 31500, stock: 12, conversion: 3.8 },
    { id: "3", name: "Mechanical Keyboard", sales: 185, revenue: 14800, stock: 88, conversion: 2.9 },
    { id: "4", name: "UltraFast Power Bank", sales: 150, revenue: 4500, stock: 120, conversion: 5.1 },
  ];

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
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-teal-600" /> Business Analytics
              </h1>
              <p className="text-sm text-muted-foreground">
                Monitor sales performance, revenue insights, and user behavior metrics.
              </p>
            </div>

            {/* Time Filter Control */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg border w-fit">
              <Button
                variant={timeRange === "7d" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange("7d")}
                className="h-8 text-xs"
              >
                7 Days
              </Button>
              <Button
                variant={timeRange === "30d" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange("30d")}
                className="h-8 text-xs"
              >
                30 Days
              </Button>
              <Button
                variant={timeRange === "12m" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange("12m")}
                className="h-8 text-xs"
              >
                12 Months
              </Button>
            </div>
          </div>
        </Container>
      </AnimationContainer>

      <Container>
        <div className="space-y-6 mt-6 pb-12">
          
          {/* Analytics Overview Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <AnimationContainer variant="fade-up" delay={0.1}>
              <Card className="border rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <div className="h-8 w-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                      <DollarSign className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold">৳{stats.revenue.total.toLocaleString()}</span>
                    <span className={`text-xs font-semibold flex items-center ${stats.revenue.isPositive ? "text-green-600" : "text-red-600"}`}>
                      {stats.revenue.isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                      {stats.revenue.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </AnimationContainer>

            <AnimationContainer variant="fade-up" delay={0.2}>
              <Card className="border rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Orders Processed</p>
                    <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      <ShoppingBag className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{stats.orders.total}</span>
                    <span className={`text-xs font-semibold flex items-center ${stats.orders.isPositive ? "text-green-600" : "text-red-600"}`}>
                      {stats.orders.isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                      {stats.orders.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </AnimationContainer>

            <AnimationContainer variant="fade-up" delay={0.3}>
              <Card className="border rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
                    <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                      <Users className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{stats.customers.total}</span>
                    <span className={`text-xs font-semibold flex items-center ${stats.customers.isPositive ? "text-green-600" : "text-red-600"}`}>
                      {stats.customers.isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                      {stats.customers.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </AnimationContainer>

            <AnimationContainer variant="fade-up" delay={0.4}>
              <Card className="border rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                    <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                      <Percent className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{stats.conversionRate.total}</span>
                    <span className={`text-xs font-semibold flex items-center ${stats.conversionRate.isPositive ? "text-green-600" : "text-red-600"}`}>
                      {stats.conversionRate.isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                      {stats.conversionRate.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </AnimationContainer>
          </div>

          {/* Graphical Section & Traffic Channels */}
          <div className="grid gap-6 md:grid-cols-3">
            
            {/* Custom Bar Graph Card */}
            <AnimationContainer variant="fade-up" className="md:col-span-2">
              <Card className="border rounded-xl h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-teal-600" /> Revenue Performance Graph
                  </CardTitle>
                  <CardDescription>Daily financial generation flow for the selected timeline.</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  {/* Graph Wrapper */}
                  <div className="h-64 flex items-end justify-between gap-2 pt-6 px-2 border-b border-l border-gray-100 relative">
                    {weeklyRevenue.map((bar, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center group relative">
                        {/* Tooltip on Hover */}
                        <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-md z-10 pointer-events-none">
                          ৳{bar.amount.toLocaleString()}
                        </div>
                        {/* Animated Visual Bar */}
                        <div
                          style={{ height: `${bar.percentage}%` }}
                          className="w-full sm:w-8 bg-teal-500 hover:bg-teal-600 rounded-t-md transition-all duration-1000 ease-out cursor-pointer shadow-sm relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-white/10 bg-gradient-to-t from-transparent to-white/20" />
                        </div>
                        <span className="text-xs text-muted-foreground mt-2 font-medium">{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimationContainer>

            {/* Platform / Traffic Source distribution */}
            <AnimationContainer variant="fade-up" delay={0.2}>
              <Card className="border rounded-xl h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Layers className="w-5 h-5 text-teal-600" /> Order Channels
                  </CardTitle>
                  <CardDescription>Where your successful sales originated.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-2">
                  {/* Channel 1 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">Mobile Android App</span>
                      <span className="text-muted-foreground font-semibold">58%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: "58%" }}></div>
                    </div>
                  </div>

                  {/* Channel 2 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">Desktop Web Platform</span>
                      <span className="text-muted-foreground font-semibold">27%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "27%" }}></div>
                    </div>
                  </div>

                  {/* Channel 3 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">iOS Mobile Application</span>
                      <span className="text-muted-foreground font-semibold">15%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimationContainer>
          </div>

          {/* Top Selling Products Data-Table */}
          <AnimationContainer variant="fade-up" delay={0.3}>
            <Card className="border rounded-xl overflow-hidden">
              <CardHeader className="bg-gray-50/40 border-b">
                <CardTitle className="text-lg">Product Performance Analytics</CardTitle>
                <CardDescription>Detailed overview of top-performing items based on sales volume.</CardDescription>
              </CardHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Identity</TableHead>
                    <TableHead>Units Sold</TableHead>
                    <TableHead>Gross Revenue</TableHead>
                    <TableHead>Conversion</TableHead>
                    <TableHead>Stock Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium text-gray-900">{product.name}</TableCell>
                      <TableCell className="font-semibold">{product.sales} units</TableCell>
                      <TableCell className="font-semibold text-gray-800">৳{product.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          {product.conversion}% CR
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {product.stock < 20 ? (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Low Stock ({product.stock})
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-50 text-gray-600">
                            In Stock ({product.stock})
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </AnimationContainer>

        </div>
      </Container>
    </div>
  );
};

export default AnalyticsPage;