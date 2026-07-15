import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  LayoutDashboardIcon,
  ShoppingCart,
  Shapes,
  Tag,
  Users2,
  Smartphone,

  ChartNoAxesCombined,
  CreditCardIcon,
  ChevronLeft,
} from "lucide-react";
import Logo from "../logo/Logo";
import NavItem from "../navbar/NavItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import AnimationContainer from "../animationContainer/AnimationContainer";

const DashboardSidebar = () => {
  return (
    <AnimationContainer variant="fade-left">
      <ScrollArea className="h-screen">
        <aside className="hidden w-64 shrink-0 border-r bg-card lg:block">
          <div className="px-6 py-6 text-lg font-bold">
            <Logo />
          </div>
          {/* Main Menu */}
          <nav className="px-3 space-y-1 ml-3">
            <NavItem href="/dashboard">
              <LayoutDashboardIcon className="ml-1" size={17} /> Dashboard
            </NavItem>
            <NavItem href="/dashboard/orders">
              <ShoppingCart className="ml-1" size={17} /> Orders
            </NavItem>
            <NavItem href="/dashboard/products">
              <Shapes className="ml-1" size={17} /> Products
            </NavItem>
            <NavItem href="/dashboard/categories">
              <Tag className="ml-1" size={17} /> Categories
            </NavItem>
            <NavItem href="/dashboard/customers">
              <Users2 className="ml-1" size={17} /> Customers
            </NavItem>
          </nav>

          <div className="mt-6 px-6 text-xs font-semibold text-muted-foreground">
            CONFIGURATION
          </div>
          <nav className="mt-2 space-y-1 px-3 text-sm ml-3">
            <NavItem href="/dashboard/manage-shop">
              <LayoutDashboardIcon className="ml-1" size={17} /> Manage Shop
            </NavItem>
            <NavItem href="/dashboard/orders">
              <Smartphone className="ml-1" size={17} /> Mobile App Request
            </NavItem>
            <NavItem href="/dashboard/users-permission">
              <Users2 className="ml-1" size={17} /> Users & Permissions
            </NavItem>
          </nav>

          <div className="mt-6 px-6 text-xs font-semibold text-muted-foreground ">
            REPORTS
          </div>

          <nav className="mt-2 px-3 ml-3">
            <NavItem href="/dashboard/analytics">
              <ChartNoAxesCombined className="ml-1" size={17} /> Analytics
            </NavItem>
          </nav>

          <div className="mt-6 px-6 text-xs font-semibold text-muted-foreground">
            PAYMENT
          </div>
          <nav className="mt-2 px-3 ml-3">
            <NavItem href="/dashboard/billing">
              <CreditCardIcon className="ml-1" size={17} /> Billing
            </NavItem>
          </nav>

          <Link href="/" className="ml-6 pb-10">
            <Button className="mt-10 px-6 text-sm " variant="btnTeal">
              <ChevronLeft />
              Back to Store
            </Button>
          </Link>
        </aside>
      </ScrollArea>
    </AnimationContainer>
  );
};

export default DashboardSidebar;
