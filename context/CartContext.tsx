"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
clearCart: () => void;
};
const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);

      if (found) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };
const decreaseQty = (id: number) => {
  setCart((prev) =>
    prev.map((p) =>
      p.id === id
        ? { ...p, quantity: Math.max(1, p.quantity - 1) }
        : p
    )
  );
};
  const clearCart = () => {
  setCart([]);
};
  return (
    <CartContext.Provider
      value={{
  cart,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
}}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext)!;