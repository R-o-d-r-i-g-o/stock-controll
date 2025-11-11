import HistoryIcon from "@mui/icons-material/History";

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
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
            <HistoryIcon className="text-indigo-600 text-3xl" />
          </div>
          <div>
            <Title className="!mb-0 !text-left" text="Histórico de Atividades" />
            <p className="text-gray-600 text-sm mt-1">Registro de todas as ações realizadas no sistema</p>
          </div>
        </div>
      </div>
      <Table filter={filters} data={result.data as any} />
    </Container>
  );
};

export default AuditListPage;
