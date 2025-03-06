import * as svc from "@/lib/services";
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
  const auditsPaginated = await svc.getAuditsPaginated(filters);

  return (
    <Container>
      <Title className="text-center mb-6" text="Histórico de atividades" />
      <Table filter={filters} data={auditsPaginated} />
    </Container>
  );
};

export default AuditListPage;
