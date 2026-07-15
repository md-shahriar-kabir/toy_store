"use client";
import {
  ChevronDown,
  Heart,
  LogOut,
  Mail,
  Menu,
  Search,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import Link from "next/link";
import Container from "../container/Container";
import NavItem from "./NavItem";
import { useScroll } from "@/hooks/useScroll";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "../logo/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import CategoryList from "../categoryList/CategoryList";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const scrolled = useScroll(200);
  const {cart}  = useCart();
  console.log(cart)
  const navLinks = (
    <>
      <NavItem href="/">Home</NavItem>
      <HoverCard openDelay={50} closeDelay={50}>
        <HoverCardTrigger asChild>
          <Button className="flex justify-start" mode="link">
            <NavItem href="/products">
              Products <ChevronDown />
            </NavItem>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <CategoryList />
        </HoverCardContent>
      </HoverCard>
      <NavItem href="/about">About</NavItem>
      <NavItem href="/contact">Contact</NavItem>
      <NavItem href="/dashboard">Dashboard</NavItem>
    </>
  );

  return (
    <nav className="sticky top-2 z-50">
      <Container>
        <div
          className={cn(
            "mt-4 flex items-center justify-between rounded-full px-6 py-3 backdrop-blur-md transition-all",
            scrolled ? "bg-background/80 shadow-md border" : "bg-teal-100"
          )}
        >
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center lg:gap-2">{navLinks}</ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* <ThemeToggle /> */}
            <Link
              href={"/cart"}
              className="hidden sm:block relative p-2 hover:scale-110 transition"
            >
              <ShoppingCart />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                {cart.length}
              </span>
            </Link>

            <button className="hidden sm:block p-2 hover:scale-110 transition">
              <Heart />
            </button>

            <button className="hidden sm:block p-2 hover:scale-110 transition">
              <Search />
            </button>

            {/* hamburger Menu */}

            <div className="lg:hidden mt-1">
              <Sheet>
                <SheetTrigger>
                  <Menu className="hover:bg-gray-500/20 p-0.5 rounded-sm" />
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>
                      <Logo />
                    </SheetTitle>
                  </SheetHeader>
                  {/* nav links */}
                  <SheetBody>
                    <div className="flex gap-5">
                      {/* <ThemeToggle /> */}
                      <Link
                        href={"/cart"}
                        className="relative p-2 hover:scale-110 transition"
                      >
                        <ShoppingCart />
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                          {cart.length}
                        </span>
                      </Link>

                      <button className="p-2 hover:scale-110 transition">
                        <Heart />
                      </button>

                      <button className="p-2 hover:scale-110 transition">
                        <Search />
                      </button>
                    </div>
                    <ul className="flex flex-col gap-4 mt-6">{navLinks}</ul>
                  </SheetBody>
                  {/* My Account */}
                  <SheetFooter>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="border w-full" asChild>
                        <Button variant="btnTeal">My Account</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-64">
                        {/* Account Section */}
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <User />
                            <span>Profile</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail />
                            <span>Inbox</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings />
                            <span>Settings</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>

                        {/* Logout */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <LogOut />
                          <span>Log Out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
