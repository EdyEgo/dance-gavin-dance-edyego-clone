import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import drawersReducer from "./drawers";
import productFiltersSearchReducer from "./productFiltersSearch";
import productsReducer from "./products";
import cartReducer from "./cart";
import usersReducer from "./users";
import checkoutReducer from "./checkout";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    drawers: drawersReducer,
    users: usersReducer,
    productFiltersSearch: productFiltersSearchReducer,
    products: productsReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // a lot of the app data it's non-serializable so this setting is for
      // not showing warnings
    }),
});
