"use client";

import { motion } from "motion/react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Heart,
  X,
} from "lucide-react";
import TopBar from "@/components/shared/topBar/TopBar";
import Navbar from "@/components/shared/navbar/Navbar";
import FooterSection from "@/components/shared/footer/FooterSection";
import Container from "@/components/shared/container/Container";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useState } from "react";

const recommendedProducts = [
  {
    id: 101,
    name: "Remote Control Drone",
    price: 89.99,
    image: "/images/drone.jpg",
    rating: 4.5,
  },
  {
    id: 102,
    name: "Building Blocks Set",
    price: 34.99,
    image: "/images/blocks.jpg",
    rating: 4.8,
  },
  {
    id: 103,
    name: "Educational Tablet",
    price: 59.99,
    image: "/images/tablet.jpg",
    rating: 4.3,
  },
];

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [saveForLater, setSaveForLater] = useState<number[]>([]);
  const [shippingOption, setShippingOption] = useState("standard");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingCost = shippingOption === "express" ? 12.99 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax - discount;

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "TOY20") {
      setDiscount(subtotal * 0.2);
    } else if (couponCode.toUpperCase() === "TOY10") {
      setDiscount(subtotal * 0.1);
    }
  };

  const moveToSaveForLater = (id: number) => {
    setSaveForLater([...saveForLater, id]);
    removeFromCart(id);
  };

  const moveToCart = (id: number) => {
    setSaveForLater(saveForLater.filter((itemId) => itemId !== id));
  };

  const getEstimatedDelivery = () => {
    const today = new Date();
    if (shippingOption === "express") {
      today.setDate(today.getDate() + 2);
    } else {
      today.setDate(today.getDate() + 5);
    }
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  if (cart.length === 0 && saveForLater.length === 0) {
    return (
      <div>
        <TopBar />
        <Navbar />
        <Container>
          <section className="bg-background py-24 min-h-[70vh]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Looks like you have not added any toys to your cart yet. Explore
                our amazing collection!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium"
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          </section>
        </Container>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <TopBar />
      <Navbar />

      <Container>
        <section className="py-16 md:py-24">
          {/* Animated Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12 relative"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {cart.length}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Shopping Cart
                </h1>
              </div>

              {cart.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearCart}
                  className="text-sm text-muted-foreground hover:text-destructive flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </motion.button>
              )}
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width: `${Math.min(100, (cart.length / 10) * 100)}%`,
                }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-primary"
              />
            </div>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Cart Items */}
              {cart.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-semibold">
                    Your Items ({cart.length})
                  </h2>
                  {cart.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="group relative rounded-2xl border bg-card p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Product Image with Badge */}
                        <div className="relative">
                          <div className="relative w-32 h-32 rounded-xl bg-linear-to-br from-muted to-background overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 128px) 100vw, 128px"
                            />
                            {item.quantity > 1 && (
                              <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                                x{item.quantity}
                              </div>
                            )}
                          </div>

                          {/* Quick Actions on Hover */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <button
                              onClick={() => moveToSaveForLater(item.id)}
                              className="p-2 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-background"
                            >
                              <Heart className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {item.name}
                              </h3>
                              <p className="text-primary font-bold text-xl mt-2">
                                ${item.price.toFixed(2)}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                ${item.price} × {item.quantity} = $
                                {(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-6">
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                                className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-muted"
                              >
                                <Minus className="h-4 w-4" />
                              </motion.button>

                              <span className="w-12 text-center font-medium text-lg">
                                {item.quantity}
                              </span>

                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                                className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-muted"
                              >
                                <Plus className="h-4 w-4" />
                              </motion.button>
                            </div>

                            <div className="text-right">
                              <p className="font-bold text-xl">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>

                          {/* Stock Status */}
                          <div className="mt-4 flex items-center gap-4">
                            <span className="flex items-center gap-1 text-sm text-green-600">
                              <div className="w-2 h-2 bg-green-600 rounded-full" />
                              In Stock
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Free shipping
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Save for Later Section */}
              {saveForLater.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 pt-8 border-t"
                >
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Heart className="h-5 w-5 text-muted-foreground" />
                    Saved for Later ({saveForLater.length})
                  </h2>
                  {saveForLater.map((itemId, i) => {
                    // This would typically come from your data
                    const savedItem = {
                      id: itemId,
                      name: "Saved Toy",
                      price: 29.99,
                      image: "/images/toy.jpg",
                    };

                    return (
                      <motion.div
                        key={itemId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="rounded-xl border bg-card p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg bg-muted" />
                          <div>
                            <h4 className="font-medium">{savedItem.name}</h4>
                            <p className="text-primary font-semibold">
                              ${savedItem.price.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => moveToCart(itemId)}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
                          >
                            Move to Cart
                          </button>
                          <button className="p-2 hover:bg-muted rounded-lg">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* Recommended Products */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-8 border-t"
              >
                <h2 className="text-xl font-semibold mb-6">
                  You might also like
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ y: -5 }}
                      className="group rounded-xl border bg-card p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <div className="w-full h-32 rounded-lg bg-linear-to-br from-muted to-background mb-4" />
                      <h4 className="font-medium mb-2">{product.name}</h4>
                      <div className="flex justify-between items-center">
                        <p className="text-primary font-bold">
                          ${product.price.toFixed(2)}
                        </p>
                        <button className="opacity-0 group-hover:opacity-100 px-3 py-1 bg-primary text-primary-foreground text-sm rounded-lg transition-opacity">
                          Add to Cart
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="sticky top-24 space-y-6"
              >
                {/* Order Summary Card */}
                <div className="rounded-3xl border bg-card p-6 shadow-lg">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                  {/* Price Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Subtotal ({cart.length} items)
                      </span>
                      <span className="font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Shipping Options */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">
                          ${shippingCost.toFixed(2)}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="shipping"
                            checked={shippingOption === "standard"}
                            onChange={() => setShippingOption("standard")}
                            className="text-primary"
                          />
                          <Truck className="h-4 w-4" />
                          <span className="text-sm">Standard (5-7 days)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="shipping"
                            checked={shippingOption === "express"}
                            onChange={() => setShippingOption("express")}
                            className="text-primary"
                          />
                          <Truck className="h-4 w-4 text-primary" />
                          <span className="text-sm">Express (2-3 days)</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="border-t pt-4 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Coupon Code */}
                  <div className="space-y-2 mb-6">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 rounded-lg border px-4 py-2"
                      />
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={applyCoupon}
                        className="px-4 py-2 border rounded-lg font-medium hover:bg-muted"
                      >
                        Apply
                      </motion.button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Try: <span className="font-mono">TOY20</span> for 20% off
                    </p>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-linear-to-r from-primary to-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    Proceed to Checkout
                  </motion.button>

                  {/* Estimated Delivery */}
                  <div className="mt-6 p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Truck className="h-5 w-5 text-primary" />
                      <span className="font-medium">Estimated Delivery</span>
                    </div>
                    <p className="text-lg font-bold">
                      {getEstimatedDelivery()}
                    </p>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="rounded-2xl border bg-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RotateCcw className="h-5 w-5 text-primary" />
                      <span className="font-medium">30-Day Returns</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    All transactions are secure and encrypted
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Container>

      <FooterSection />
    </div>
  );
}
