import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  products: any[];
}

const initialState: ProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<any[]>) {
      state.products = action.payload;
    },
    clearProduct(state) {
      return initialState;
    },
  },
});

export const { setProduct, clearProduct } = productSlice.actions;

export default productSlice.reducer;
