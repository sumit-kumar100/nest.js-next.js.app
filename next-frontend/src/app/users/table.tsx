"use client";

import { DataTable } from "@/components/data-table";
import { Icons } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RootDispatch } from "@/redux/store";
import { setUserFormProps } from "@/redux/users";
import { deleteAnUser, getAllUsers } from "@/services/users";
import { User } from "@/types/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useDispatch } from "react-redux";

import { columns } from "./columns";

export default function UsersTable() {
  const queryClient = useQueryClient();

  const dispatch: RootDispatch = useDispatch();

  const { data } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,
  });

  const deleteUser = useMutation({
    mutationFn: deleteAnUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    },
  });

  const actionColumn: ColumnDef<User> = {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row: { original } }) => {
      return (
        <div className="flex justify-center gap-2">
          <div
            onClick={() => {
              dispatch(
                setUserFormProps({
                  show: true,
                  action: "edit",
                  defaultValues: {
                    ...original,
                    dateOfBirth: original.dateOfBirth
                      ? new Date(original.dateOfBirth)
                      : undefined,
                  },
                })
              );
            }}
          >
            <Icons.Edit className="h-4 cursor-pointer" />
          </div>
          <Dialog>
            <DialogTrigger>
              <Icons.Delete className="h-4 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure you want to delete user?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  user data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogTrigger>
                  <span
                    className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-white"
                    onClick={() => deleteUser.mutate(original)}
                  >
                    Confirm
                  </span>
                </DialogTrigger>
                <DialogTrigger>
                  <span className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-white">
                    Cancel
                  </span>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  };

  return (
    <div className="p-4">
      <DataTable
        columns={[...columns, actionColumn]}
        data={data}
        searchable={true}
      />
    </div>
  );
}
