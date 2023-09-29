import { UserState } from "@/types/users";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  userForm: {
    show: false,
    action: "add",
    defaultValues: undefined,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserFormProps: (state, action) => {
      state.userForm = action.payload;
    },
    clearUserFormProps: (state) => {
      state.userForm = {
        show: false,
        action: "add",
        defaultValues: undefined,
      };
    },
  },
});

export const { setUserFormProps, clearUserFormProps } = userSlice.actions;

export default userSlice.reducer;
