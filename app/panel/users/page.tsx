import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";

import Title from "@/components/ui/title";
import Table from "@/components/shared/table/user";
import * as svc from "@/lib/services";
import Container from "@/components/templates/container";
import { defaultPageSize } from "@/common/constants";

type UserListPageProps = {
  searchParams: Promise<{
    page: string;
    size: string;
  }>;
};

const CrateUserButton = () => (
  <Link
    title="Adicionar Usuário"
    href="/panel/users/create"
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
    <Container>
      <CrateUserButton />
      <Title className="text-center mb-6" text="Usuários do sistema" />
      <Table filter={filters} data={usersPaginated} />
    </Container>
  );
};

export default UserListPage;
