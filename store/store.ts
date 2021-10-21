import {
  configureStore,
  combineReducers,
  AnyAction,
  Dispatch,
} from "@reduxjs/toolkit";
import { createWrapper, MakeStore, HYDRATE } from "next-redux-wrapper";
import { authSlice } from "./slices/auth";

// Combine all the slices we created together.
const combinedReducers = combineReducers({
  authReducer: authSlice.reducer,
});

// Type that indicates our whole State will be used for useSelector and other things.
export type OurStore = ReturnType<typeof combinedReducers>;

const rootReducer = (
  state: ReturnType<typeof combinedReducers>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return combinedReducers(state, action);
};

export const store = configureStore<OurStore>({
  // @ts-ignore
  reducer: rootReducer,
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore, {});
