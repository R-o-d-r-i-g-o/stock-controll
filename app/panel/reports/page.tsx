import Container from "@/components/templates/container";
import ReportForm from "@/components/shared/report-form";

const ReportPage = () => (
  <Container display="small">
    <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">
      Gerar Relatório
    </h2>
    <ReportForm />
  </Container>
);

export default ReportPage;
