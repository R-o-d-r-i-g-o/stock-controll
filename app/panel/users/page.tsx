import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";

import Title from "@/components/ui/title";
import Table from "@/components/shared/table/user";
import { getUsersPaginatedAction } from "@/lib/features/user/user.actions";
import Container from "@/components/templates/container";
import { defaultPageSize } from "@/common/constants";

type UserListPageProps = {
  searchParams: Promise<{
    page: string;
    size: string;
  }>;
};

const CreateUserButton = () => (
  <Link
    title="Adicionar Usuário"
    href="/panel/users/create"
    className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
  >
    <AddIcon />
    <span className="font-medium">Novo Usuário</span>
  </Link>
);

const UserListPage = async ({ searchParams }: UserListPageProps) => {
  const req = await searchParams;

  const filters = {
    page: parseInt(req.page ?? "1"),
    size: parseInt(req.size ?? defaultPageSize.toString()),
  };
  const result = await getUsersPaginatedAction(filters);
  
  if (!result.success) {
    throw new Error(result.error);
  }

  return (
    <Container>
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
              <PeopleIcon className="text-indigo-600 text-3xl" />
            </div>
            <div>
              <Title className="!mb-0 !text-left" text="Usuários do Sistema" />
              <p className="text-gray-600 text-sm mt-1">Gerencie os usuários da plataforma</p>
            </div>
          </div>
          <CreateUserButton />
        </div>
      </div>
      <Table filter={filters} data={result.data as any} />
    </Container>
  );
};

export default UserListPage;
