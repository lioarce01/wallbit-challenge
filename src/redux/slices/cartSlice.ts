import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  cart: CartItem[];
  createdAt: string | null;
}

const initialState: CartState = {
  cart: [],
  createdAt: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
      if (state.cart.length > 0 && !state.createdAt) {
        state.createdAt = new Date().toLocaleString();
      }
      if (state.cart.length === 0) {
        state.createdAt = null;
      }
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      if (state.cart.length === 1 && !state.createdAt) {
        state.createdAt = new Date().toLocaleString();
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      if (state.cart.length === 0) {
        state.createdAt = null;
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const updatedCart = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      state.cart = updatedCart;
    },
  },
});

export const { setCart, addToCart, removeFromCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
