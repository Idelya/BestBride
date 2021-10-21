import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import { createWrapper, MakeStore, HYDRATE } from "next-redux-wrapper";
import { authSlice } from "./slices/auth";

// Combine all the slices we created together.
const combinedReducers = combineReducers({
  authReducer: authSlice.reducer,
});

// Type that indicates our whole State will be used for useSelector and other things.
export type OurStore = ReturnType<typeof combinedReducers>;

const rootReducer: CombinedState<{ authReducer: unknown }> = (
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
  reducer: rootReducer,
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore, {});

export type MyThunkDispatch = typeof store.dispatch;
