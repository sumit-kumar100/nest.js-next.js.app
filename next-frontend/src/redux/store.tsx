import userReducer from "@/redux/users";
import { UserState } from "@/types/users";
import {
  AnyAction,
  Reducer,
  Store,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

export type RootState = {
  user: UserState;
};

export type RootDispatch = ThunkDispatch<RootState, any, AnyAction>;

const reducers: Reducer<RootState> = combineReducers({
  user: userReducer,
});

export const store: Store<RootState> = configureStore({
  reducer: reducers,
});

export interface SerializedError {
  name?: string;
  message?: string;
  code?: string;
  stack?: string;
}

export interface PendingAction<ThunkArg> {
  type: string;
  payload: undefined | any;
  meta: {
    requestId: string;
    arg: ThunkArg;
  };
}

export interface FulfilledAction<ThunkArg, PromiseResult> {
  type: string;
  payload: PromiseResult | any;
  meta: {
    requestId: string;
    arg: ThunkArg;
    requestStatus: string;
  };
}

export interface RejectedAction<ThunkArg> {
  type: string;
  payload: undefined;
  error: SerializedError | any;
  meta: {
    requestId: string;
    arg: ThunkArg;
    aborted: boolean;
    condition: boolean;
  };
}

export interface RejectedWithValueAction<ThunkArg, RejectedValue> {
  type: string;
  payload: RejectedValue;
  error: { message: "Rejected" };
  meta: {
    requestId: string;
    arg: ThunkArg;
    aborted: boolean;
  };
}

export type Pending = <ThunkArg>(
  requestId: string,
  arg: ThunkArg
) => PendingAction<ThunkArg>;

export type Fulfilled = <ThunkArg, PromiseResult>(
  payload: PromiseResult,
  requestId: string,
  arg: ThunkArg
) => FulfilledAction<ThunkArg, PromiseResult>;

export type Rejected = <ThunkArg>(
  requestId: string,
  arg: ThunkArg
) => RejectedAction<ThunkArg>;

export type RejectedWithValue = <ThunkArg, RejectedValue>(
  requestId: string,
  arg: ThunkArg
) => RejectedWithValueAction<ThunkArg, RejectedValue>;
