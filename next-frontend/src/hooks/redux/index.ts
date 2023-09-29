import { RootState, store } from "@/redux/store";

import useDispatch from "./useAppDispatch";
import useSelector from "./userAppSelector";

export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export const useAppSelector: <T>(selector: (state: RootState) => T) => T =
  useSelector;
