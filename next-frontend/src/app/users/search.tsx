"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RootDispatch } from "@/redux/store";
import { setUserFormProps } from "@/redux/users";
import { getAllUsers } from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as z from "zod";

const UserSearchFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must not be empty" })
    .max(50, { message: "Name must not exceed 50 characters" }),
});

type UserSearchFormValues = z.infer<typeof UserSearchFormSchema>;

export default function UserSearchForm() {
  const router = useRouter();

  const disptach: RootDispatch = useDispatch();

  const form = useForm<UserSearchFormValues>({
    resolver: zodResolver(UserSearchFormSchema),
    mode: "onChange",
    defaultValues: { name: "" },
  });

  const { data } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,
  });

  const onSubmit = (formData: UserSearchFormValues) => {
    const searchUser = data.find(
      (user: UserSearchFormValues) =>
        user.name.trim().toLowerCase() === formData.name.trim().toLowerCase()
    );
    if (searchUser) {
      disptach(
        setUserFormProps({
          show: true,
          action: "edit",
          defaultValues: {
            ...searchUser,
            dateOfBirth: new Date(searchUser.dateOfBirth),
          },
        })
      );
    } else {
      disptach(
        setUserFormProps({
          show: true,
          action: "add",
          defaultValues: {
            name: formData.name.trim(),
            email: "",
            mobileNo: "",
            dateOfBirth: undefined,
          },
        })
      );
    }
  };

  return (
    <div className="p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search User By Name</FormLabel>
                <FormControl>
                  <Input placeholder="Search User By Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-[30px]">
            Add or Update
          </Button>
        </form>
      </Form>
    </div>
  );
}
