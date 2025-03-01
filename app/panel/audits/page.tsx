import Table from "./_table";
import { defaultPageSize } from "@/common";

import * as svc from "@/lib/services";
import Container from "@/components/templates/container";

type UserListPageProps = {
  searchParams: Promise<{
    page: string;
    size: string;
  }>;
};

const HistoryListPage = async ({ searchParams }: UserListPageProps) => {
  const req = await searchParams;

  const filters = {
    page: parseInt(req.page ?? "1"),
    size: parseInt(req.size ?? defaultPageSize.toString()),
  };
  const usersPaginated = await svc.getAuditsPaginated(filters);

  return (
    <Container className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-4xl mx-5 sm:mx-0">
      <Table filter={filters} data={usersPaginated} />
    </Container>
  );
};

export default HistoryListPage;
