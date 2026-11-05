import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("cart", []);
  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1
        }
      ]);
    }

  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {

    if (qty < 1) {
      removeFromCart(id);
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: qty } : item
      )
    );

  };

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}