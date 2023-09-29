"use client";

import { useRouter } from "next/navigation";
import BlurImage from "@/components/blur-image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardImage,
} from "@/components/ui/card";
import { RootDispatch } from "@/redux/store";
import { clearUserFormProps } from "@/redux/users";
import { useDispatch } from "react-redux";

export default function IndexPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const dispatch: RootDispatch = useDispatch();

  const router = useRouter();

  return (
    <Card className="grid grid-cols-1 gap-4 p-4">
      <CardHeader>
        <CardImage className="flex justify-center">
          <BlurImage
            alt="scooter-image"
            src={"/images/support.png"}
            style={{ width: 250 }}
          />
        </CardImage>
      </CardHeader>
      <CardContent>
        <CardDescription className="flex items-center justify-center">
          <span className="text-lg font-bold text-primary">
            User {searchParams?.action} successfully !
          </span>
          <Button
            onClick={() => {
              dispatch(clearUserFormProps());
              router.push("/");
            }}
            className="my-8 w-44"
          >
            Back to Dashboard
          </Button>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
