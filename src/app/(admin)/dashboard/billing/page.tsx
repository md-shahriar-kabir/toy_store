"use client";

import { useState } from "react";
import AnimationContainer from "@/components/shared/animationContainer/AnimationContainer";
import Container from "@/components/shared/container/Container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard,
  Download,
  Receipt,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
} from "lucide-react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: "Paid" | "Unpaid" | "Overdue";
  billingDate: string;
  planName: string;
}

const BillingPage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      invoiceNumber: "INV-2026-004",
      amount: 2500,
      status: "Paid",
      billingDate: "2026-07-01",
      planName: "Premium Growth Plan",
    },
    {
      id: "2",
      invoiceNumber: "INV-2026-003",
      amount: 2500,
      status: "Paid",
      billingDate: "2026-06-01",
      planName: "Premium Growth Plan",
    },
    {
      id: "3",
      invoiceNumber: "INV-2026-002",
      amount: 2500,
      status: "Paid",
      billingDate: "2026-05-01",
      planName: "Premium Growth Plan",
    },
    {
      id: "4",
      invoiceNumber: "INV-2026-001",
      amount: 1200,
      status: "Paid",
      billingDate: "2026-04-01",
      planName: "Basic Starter Plan",
    },
  ]);

  const [couponCode, setCouponCode] = useState("");

  const getStatusBadge = (status: Invoice["status"]) => {
    switch (status) {
      case "Paid":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Paid
          </Badge>
        );
      case "Unpaid":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <AlertCircle className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case "Overdue":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="w-3 h-3 mr-1" /> Overdue
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      alert(`Promo code "${couponCode}" applied successfully!`);
      setCouponCode("");
    }
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
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Receipt className="h-6 w-6 text-teal-600" /> Billing & Subscription
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your store plan, review statement history, and update payment details.
              </p>
            </div>
          </div>
        </Container>
      </AnimationContainer>

      <Container>
        <div className="space-y-6 mt-6 pb-12">
          
          {/* Top Overview Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            
            {/* Active Plan Card */}
            <AnimationContainer variant="fade-up" className="md:col-span-2">
              <Card className="border rounded-xl bg-gradient-to-br from-white via-white to-teal-50/20 relative overflow-hidden h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 mb-2">
                        Active Plan
                      </Badge>
                      <CardTitle className="text-2xl font-bold">Premium Growth Plan</CardTitle>
                      <CardDescription>Billed monthly. Ultimate features for growing businesses.</CardDescription>
                    </div>
                    <span className="text-2xl font-extrabold text-teal-700">৳2,500<span className="text-xs text-muted-foreground font-normal">/mo</span></span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-sm border-t">
                    <div>
                      <p className="text-muted-foreground text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Next Billing Date
                      </p>
                      <p className="font-semibold text-gray-800 mt-0.5">August 01, 2026</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs flex items-center gap-1">
                        <CreditCard className="w-3 h-3" /> Payment Method
                      </p>
                      <p className="font-semibold text-gray-800 mt-0.5">bKash (•••• 678)</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <p className="text-muted-foreground text-xs flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Auto Renewal
                      </p>
                      <p className="font-semibold text-green-600 mt-0.5 flex items-center gap-1">
                        Enabled
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4">
                    <Button variant="btnTeal" size="sm">
                      Upgrade Plan <ArrowUpRight className="w-4 h-4 ml-1" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      Cancel Subscription
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimationContainer>

            {/* Promo / Coupon Box */}
            <AnimationContainer variant="fade-up" delay={0.2}>
              <Card className="border rounded-xl h-full flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-lg">Promotional Code</CardTitle>
                  <CardDescription>Have a referral or promo discount token?</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <form onSubmit={handleApplyPromo} className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="coupon">Coupon Code</Label>
                      <Input
                        id="coupon"
                        placeholder="e.g. SHOP50"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                    </div>
                    <Button type="submit" variant="outline" className="w-full">
                      Apply Promo
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </AnimationContainer>
          </div>

          {/* Payment Methods */}
          <AnimationContainer variant="fade-up" delay={0.3}>
            <Card className="border rounded-xl">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-teal-600" /> Saved Payment Methods
                    </CardTitle>
                    <CardDescription>Primary account info used for automatic billing cycles.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="w-fit">
                    <Plus className="w-4 h-4 mr-1" /> Add Method
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-12 bg-pink-100 rounded flex items-center justify-center font-bold text-pink-600 text-xs">
                      bKash
                    </div>
                    <div>
                      <p className="font-medium text-sm">Personal Wallet (•••• 01712345678)</p>
                      <p className="text-xs text-muted-foreground">Expires: N/A • Primary Method</p>
                    </div>
                  </div>
                  <Badge className="bg-teal-600 w-fit">Default</Badge>
                </div>
              </CardContent>
            </Card>
          </AnimationContainer>

          {/* Invoice History Table */}
          <AnimationContainer variant="fade-up" delay={0.4}>
            <Card className="border rounded-xl overflow-hidden">
              <CardHeader className="bg-gray-50/40 border-b">
                <CardTitle className="text-lg">Statement & Invoice History</CardTitle>
                <CardDescription>View, audit, and download your historical subscription payouts.</CardDescription>
              </CardHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Plan Instance</TableHead>
                    <TableHead>Billing Date</TableHead>
                    <TableHead>Amount Billed</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-semibold text-gray-900">{invoice.invoiceNumber}</TableCell>
                      <TableCell className="text-sm text-gray-700">{invoice.planName}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{invoice.billingDate}</TableCell>
                      <TableCell className="font-bold text-gray-800">৳{invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => alert(`Downloading ${invoice.invoiceNumber}...`)}
                        >
                          <Download className="h-4 w-4 text-gray-600" />
                        </Button>
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

export default BillingPage;