"use client";

import AnimationContainer from "@/components/shared/animationContainer/AnimationContainer";
import Container from "@/components/shared/container/Container";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  RefreshCcw,
  Download,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const stats = [
  {
    title: "Total Revenue",
    value: "$54565.00",
    change: "+20.1%",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "1,100",
    change: "+18.0%",
    icon: ShoppingCart,
  },
  {
    title: "Active Customers",
    value: "23,056",
    change: "+19%",
    icon: Users,
  },
  {
    title: "Product Availability",
    value: "92%",
    change: "-2.3%",
    icon: Package,
  },
];

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Dashboard() {
  return (
    <div>
      <AnimationContainer variant="fade-down" className="sticky top-0 z-70 pt-5 pb-3 bg-white backdrop:2xl border-b ">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Monitor performance and customer activity
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant={"outline"}>
                Last 30 Days
              </Button>
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

          <div>
            {/* Chart Section */}
            <AnimationContainer>
              <div className="rounded-2xl border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">Performance Overview</h2>
                    <p className="text-xs text-muted-foreground">
                      Organic sales performance (last 30 days)
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-lg bg-primary/10 px-3 py-1 text-xs text-primary">
                      Sales
                    </button>
                    <button className="rounded-lg border px-3 py-1 text-xs">
                      Orders
                    </button>
                    <button className="rounded-lg border px-3 py-1 text-xs">
                      Profit
                    </button>
                  </div>
                </div>

                {/* ReUI Chart placeholder */}
                <div className="h-80 p-5 rounded-xl bg-muted flex items-center justify-center text-sm text-muted-foreground">
                  <ResponsiveContainer>
                    <AreaChart
                      data={data}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="uv"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-green-50 p-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      Avg Order Value
                    </p>
                    <p className="mt-1 font-semibold">$89.42</p>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      Conversion Rate
                    </p>
                    <p className="mt-1 font-semibold">4.7%</p>
                  </div>
                  <div className="rounded-xl bg-purple-50 p-4 text-center">
                    <p className="text-xs text-muted-foreground">Retention</p>
                    <p className="mt-1 font-semibold">78.3%</p>
                  </div>
                </div>
              </div>
            </AnimationContainer>

            {/* Transactions */}
            <AnimationContainer>
              <div className="rounded-2xl border mt-12 bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold">Recent Transactions</h2>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                    Live
                  </span>
                </div>

                <ScrollArea>
                  <div className="space-y-4 h-108 w-[97%]">
                    {[
                      "Olivia Martin",
                      "Jackson Lee",
                      "Isabella Nguyen",
                      "William Kim",
                      "Sofia Davis",
                      "Olivia Martin",
                      "Jackson Lee",
                      "Isabella Nguyen",
                      "William Kim",
                      "Sofia Davis",
                    ].map((name, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                            {name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{name}</p>
                            <p className="text-xs text-muted-foreground">
                              Organic • 2 items
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-green-600">
                          +$99.00
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </AnimationContainer>
          </div>
        </div>
      </Container>
    </div>
  );
}
