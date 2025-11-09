import { getAuditsPaginatedAction } from "@/lib/features/audit/audit.actions";
import { defaultPageSize } from "@/common/constants";

import Title from "@/components/ui/title";
import Table from "@/components/shared/table/audit";
import Container from "@/components/templates/container";

type AuditListPageProps = {
  searchParams: Promise<{
    page: string;
    size: string;
  }>;
};

const AuditListPage = async ({ searchParams }: AuditListPageProps) => {
  const req = await searchParams;

  const filters = {
    page: parseInt(req.page ?? "1"),
    size: parseInt(req.size ?? defaultPageSize.toString()),
  };
  const result = await getAuditsPaginatedAction(filters);
  
  if (!result.success) {
    throw new Error(result.error);
  }

  return (
    <Container>
      <Title className="text-center mb-6" text="Histórico de atividades" />
      <Table filter={filters} data={result.data as any} />
    </Container>
  );
};

export default AuditListPage;
