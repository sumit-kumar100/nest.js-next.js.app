"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

import UserForm from "./users/form";
import UserSearchForm from "./users/search";
import UsersTable from "./users/table";

export default function UsersPage() {
  const { userForm } = useSelector((state: RootState) => state.user);

  if (userForm.show) {
    return <UserForm {...userForm} />;
  }

  return (
    <Card className="p-4">
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline">
              <h2 className="text-lg">Add or Update User</h2>
            </AccordionTrigger>
            <AccordionContent>
              <UserSearchForm />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-0">
            <AccordionTrigger className="hover:no-underline">
              <h2 className="text-lg">Users</h2>
            </AccordionTrigger>
            <AccordionContent>
              <UsersTable />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
