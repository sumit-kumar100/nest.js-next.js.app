"use client";

import { User } from "@/types/users";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: () => {
      return (
        <div className="min-w-[120px]">
          <div className="text-center text-xs">Name</div>
        </div>
      );
    },
    cell: ({ row: { original } }: { row: { original: User } }) => {
      return <div className="text-center">{original.name}</div>;
    },
  },
  {
    accessorKey: "email",
    header: () => {
      return (
        <div className="min-w-[125px]">
          <div className="text-center text-xs">Email ID</div>
        </div>
      );
    },
    cell: ({ row: { original } }: { row: { original: User } }) => {
      return <div className="text-center">{original.email}</div>;
    },
  },
  {
    accessorKey: "mobileNo",
    header: () => {
      return (
        <div className="min-w-[125px]">
          <div className="text-center text-xs">Mobile No.</div>
        </div>
      );
    },
    cell: ({ row: { original } }: { row: { original: User } }) => {
      return <div className="text-center">{original.mobileNo}</div>;
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: () => {
      return (
        <div className="min-w-[120px]">
          <div className="text-center text-xs">DOB</div>
        </div>
      );
    },
    cell: ({ row: { original } }: { row: { original: User } }) => {
      return <div className="text-center">{original.dateOfBirth}</div>;
    },
  },
];
