import AssessmentIcon from "@mui/icons-material/Assessment";

import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import ReportCreateForm from "@/components/shared/form/report-create";

const ReportPage = () => (
  <Container display="small">
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100 mb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
          <AssessmentIcon className="text-indigo-600 text-3xl" />
        </div>
        <div>
          <Title className="!mb-0 !text-left" text="Gerar Relatório" />
          <p className="text-gray-600 text-sm mt-1">Crie relatórios personalizados do seu estoque</p>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100">
      <ReportCreateForm />
    </div>
  </Container>
);

export default ReportPage;
