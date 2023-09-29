"use client";

import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DateInput } from "@/components/ui/date-input";
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
import { clearUserFormProps } from "@/redux/users";
import { createAnUser, updateAnUser } from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as z from "zod";

const userFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must not be empty" })
    .max(50, { message: "Name must not exceed 50 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  mobileNo: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Invalid mobile number format",
  }),
  dateOfBirth: z.date(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;

export default function UserForm({ action, defaultValues }: any) {
  const queryClient = useQueryClient();

  const dispatch: RootDispatch = useDispatch();

  const router = useRouter();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
    defaultValues,
  });

  const createUser = useMutation({
    mutationFn: createAnUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
      router.push("/result-msg?action=created");
    },
  });

  const updateUser = useMutation({
    mutationFn: updateAnUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
      router.push("/result-msg?action=updated");
    },
  });

  const onSubmit = (formData: UserFormValues) => {
    if (action === "edit" && defaultValues) {
      updateUser.mutate({
        ...formData,
        dateOfBirth: formData.dateOfBirth.toISOString(),
        id: defaultValues.id,
      });
    } else {
      createUser.mutate({
        ...formData,
        dateOfBirth: formData.dateOfBirth.toISOString(),
      });
    }
  };

  return (
    <Fragment>
      <Button
        onClick={() => dispatch(clearUserFormProps())}
        variant="outline"
        className="mb-4 w-16 border-primary text-primary hover:bg-green-50 hover:text-primary"
      >
        <Icons.ArrowLeft />
      </Button>
      <Card className="p-4">
        <h1 className="mb-8 text-center text-lg font-bold text-primary">
          {action === "edit" ? "UPDATE" : "Add"}&nbsp;&nbsp;USER
        </h1>
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Email ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobileNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile No.</FormLabel>
                  <FormControl>
                    <Input placeholder="Mobile No." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 pt-[5px]">
                  <FormLabel>DOB</FormLabel>
                  <FormControl>
                    <DateInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-3 flex gap-4">
              <Button type="submit">Submit</Button>
              <Button onClick={() => dispatch(clearUserFormProps())}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </Fragment>
  );
}
