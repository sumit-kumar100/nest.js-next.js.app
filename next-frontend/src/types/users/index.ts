import { UserFormValues } from "../../app/users/form";

export interface User {
  id?: string;
  name: string;
  email: string;
  mobileNo: string;
  dateOfBirth: string | undefined;
}

export interface UserFormProps {
  show: boolean;
  action: string;
  defaultValues: UserFormValues | undefined;
}

export interface UserState {
  userForm: UserFormProps;
}
