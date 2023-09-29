import { ClientHydrate } from "@/config/client-hydrate";
import { getAllUsers } from "@/services/users";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import Users from "./users";

export default async function IndexPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["getAllUsers"], getAllUsers);
  const dehydratedState = dehydrate(queryClient);

  return (
    <ClientHydrate state={dehydratedState}>
      <Users />
    </ClientHydrate>
  );
}
