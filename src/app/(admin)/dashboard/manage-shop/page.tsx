"use client";

import { useState } from "react";
import AnimationContainer from "@/components/shared/animationContainer/AnimationContainer";
import Container from "@/components/shared/container/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // আপনার ui ফোল্ডারে label.tsx আছে
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Store,
  Save,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Truck,
  DollarSign,
  Percent,
  ToggleLeft,
  ToggleRight,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

interface ShopSettings {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  description: string;
  status: "open" | "closed" | "maintenance";
  deliveryFee: number;
  minOrder: number;
  taxRate: number;
  openingTime: string;
  closingTime: string;
}

const ManageShopPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shopData, setShopData] = useState<ShopSettings>({
    name: "TechMart Bangladesh",
    tagline: "Your Ultimate Gadget Destination",
    email: "support@techmart.com.bd",
    phone: "+8801712345678",
    website: "https://techmart.com.bd",
    address: "Level 4, Block C, Bashundhara City Shopping Mall, Dhaka",
    description: "Premium electronics, smart home devices, and official accessories shop in Bangladesh. Providing official warranty and fast home delivery.",
    status: "open",
    deliveryFee: 60,
    minOrder: 500,
    taxRate: 5,
    openingTime: "10:00",
    closingTime: "20:00",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShopData((prev) => ({
      ...prev,
      [name]: name === "deliveryFee" || name === "minOrder" || name === "taxRate" ? Number(value) : value,
    }));
  };

  const handleStatusChange = (status: ShopSettings["status"]) => {
    setShopData((prev) => ({ ...prev, status }));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Shop settings updated successfully!");
    }, 1000);
  };

  const getStatusBadge = (status: ShopSettings["status"]) => {
    switch (status) {
      case "open":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Accepting Orders
          </Badge>
        );
      case "closed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <ShieldAlert className="w-3 h-3 mr-1" /> Closed
          </Badge>
        );
      case "maintenance":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="w-3 h-3 mr-1" /> Maintenance Mode
          </Badge>
        );
      default:
        return null;
    }
  };

  // শ্যাডসিএন ইনপুটের সাথে ম্যাচ রেখে টেক্সটএরিয়া স্টাইলিং ক্লাস
  const textareaClassName = "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

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
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">Manage Shop</h1>
                {getStatusBadge(shopData.status)}
              </div>
              <p className="text-sm text-muted-foreground">
                Configure your store identity, business hours, and operational settings.
              </p>
            </div>

            <div>
              <Button
                type="submit"
                form="shop-settings-form"
                variant="btnTeal"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Saving Changes..." : "Save Settings"}
              </Button>
            </div>
          </div>
        </Container>
      </AnimationContainer>

      <Container>
        <form id="shop-settings-form" onSubmit={handleSaveSettings} className="space-y-6 mt-6 pb-12">
          <div className="grid gap-6 md:grid-cols-3">
            
            {/* Left Column - Identity & Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Store Identity Card */}
              <AnimationContainer variant="fade-up" delay={0.1}>
                <Card className="border rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Store className="w-5 h-5 text-teal-600" /> Store Identity
                    </CardTitle>
                    <CardDescription>Public information that customers will see across the platform.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="shop-name">Shop Name</Label>
                        <Input
                          id="shop-name"
                          name="name"
                          value={shopData.name}
                          onChange={handleChange}
                          placeholder="e.g. TechMart"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shop-tagline">Tagline / Slogan</Label>
                        <Input
                          id="shop-tagline"
                          name="tagline"
                          value={shopData.tagline}
                          onChange={handleChange}
                          placeholder="e.g. Quality over Quantity"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shop-description">About / Description</Label>
                      <textarea
                        id="shop-description"
                        name="description"
                        value={shopData.description}
                        onChange={handleChange}
                        placeholder="Describe your business..."
                        className={textareaClassName}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </AnimationContainer>

              {/* Contact Information Card */}
              <AnimationContainer variant="fade-up" delay={0.2}>
                <Card className="border rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Phone className="w-5 h-5 text-teal-600" /> Contact & Location
                    </CardTitle>
                    <CardDescription>How customers and administrators can reach your store.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="shop-email">Business Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="shop-email"
                            type="email"
                            name="email"
                            value={shopData.email}
                            onChange={handleChange}
                            className="pl-9"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shop-phone">Hotline / Phone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="shop-phone"
                            name="phone"
                            value={shopData.phone}
                            onChange={handleChange}
                            className="pl-9"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shop-website">Website URL</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="shop-website"
                          type="url"
                          name="website"
                          value={shopData.website}
                          onChange={handleChange}
                          className="pl-9"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shop-address">Physical Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <textarea
                          id="shop-address"
                          name="address"
                          value={shopData.address}
                          onChange={handleChange}
                          className={`${textareaClassName} pl-9 pt-2`}
                          placeholder="Full store location..."
                          rows={2}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimationContainer>
            </div>

            {/* Right Column - Status, Hours & Financials */}
            <div className="space-y-6">
              
              {/* Store Status Control */}
              <AnimationContainer variant="fade-up" delay={0.3}>
                <Card className="border rounded-xl overflow-hidden">
                  <CardHeader className="bg-gray-50/50 border-b">
                    <CardTitle className="text-lg">Shop Status</CardTitle>
                    <CardDescription>Instantly toggle your store availability.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-6 space-y-2">
                    <Button
                      type="button"
                      variant={shopData.status === "open" ? "primary" : "outline"}
                      className={`w-full justify-start ${shopData.status === "open" ? "bg-green-600 hover:bg-green-700" : ""}`}
                      onClick={() => handleStatusChange("open")}
                    >
                      <ToggleRight className="w-5 h-5 mr-2" /> Open / Accepting Orders
                    </Button>
                    <Button
                      type="button"
                      variant={shopData.status === "closed" ? "primary" : "outline"}
                      className={`w-full justify-start ${shopData.status === "closed" ? "bg-red-600 hover:bg-red-700" : ""}`}
                      onClick={() => handleStatusChange("closed")}
                    >
                      <ToggleLeft className="w-5 h-5 mr-2" /> Closed
                    </Button>
                    <Button
                      type="button"
                      variant={shopData.status === "maintenance" ? "primary" : "outline"}
                      className={`w-full justify-start ${shopData.status === "maintenance" ? "bg-amber-600 hover:bg-amber-700" : ""}`}
                      onClick={() => handleStatusChange("maintenance")}
                    >
                      <Clock className="w-5 h-5 mr-2" /> Maintenance Mode
                    </Button>
                  </CardContent>
                </Card>
              </AnimationContainer>

              {/* Business Hours */}
              <AnimationContainer variant="fade-up" delay={0.4}>
                <Card className="border rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="w-5 h-5 text-teal-600" /> Store Timing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase text-muted-foreground">Open At</Label>
                        <Input
                          type="time"
                          name="openingTime"
                          value={shopData.openingTime}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase text-muted-foreground">Close At</Label>
                        <Input
                          type="time"
                          name="closingTime"
                          value={shopData.closingTime}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimationContainer>

              {/* Order & Delivery Logic */}
              <AnimationContainer variant="fade-up" delay={0.5}>
                <Card className="border rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Truck className="w-5 h-5 text-teal-600" /> Shipping & Taxes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="shop-delivery-fee">Delivery Fee (৳)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="shop-delivery-fee"
                          type="number"
                          name="deliveryFee"
                          value={shopData.deliveryFee}
                          onChange={handleChange}
                          className="pl-9"
                          min="0"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shop-min-order">Minimum Order Amount (৳)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="shop-min-order"
                          type="number"
                          name="minOrder"
                          value={shopData.minOrder}
                          onChange={handleChange}
                          className="pl-9"
                          min="0"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shop-tax-rate">VAT / Tax Rate (%)</Label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="shop-tax-rate"
                          type="number"
                          name="taxRate"
                          value={shopData.taxRate}
                          onChange={handleChange}
                          className="pl-9"
                          min="0"
                          max="100"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimationContainer>

            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default ManageShopPage;