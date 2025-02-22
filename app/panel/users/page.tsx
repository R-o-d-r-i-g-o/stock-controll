import Table from "./_table";
import * as svc from "@/lib/services";
import { defaultPageSize, NavigationPage } from "@/common";

import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

import { ZoomAnimateBlock } from "@/components/ui";

type UserListPageProps = {
  searchParams: Promise<{
    page: string;
    size: string;
  }>;
};

const CrateUserButton = () => (
  <Link
    title="Adicionar Usuário"
    href={NavigationPage.UsersCreate}
    className="flex items-center space-x-2 bg-blue-500 text-white ml-auto w-min py-2 px-4 mb-4 sm:mb-0 rounded hover:bg-blue-600 transition-colors"
  >
    <AddIcon />
  </Link>
);

const UserListPage = async ({ searchParams }: UserListPageProps) => {
  const req = await searchParams;

  const filters = {
    page: parseInt(req.page ?? "1"),
    size: parseInt(req.size ?? defaultPageSize.toString()),
  };
  const usersPaginated = await svc.fetchUsersPaginated(filters);

  return (
    <ZoomAnimateBlock className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-4xl mx-5 sm:mx-0">
      <CrateUserButton />
      <Table filter={filters} data={usersPaginated} />
    </ZoomAnimateBlock>
  );
};

export default UserListPage;
