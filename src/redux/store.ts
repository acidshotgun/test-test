import { configureStore } from "@reduxjs/toolkit";
import trainsReducer, { IState as TrainsState } from "./slices/trains";

export interface RootState {
  trains: TrainsState;
}

const store = configureStore({
  reducer: {
    trains: trainsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
