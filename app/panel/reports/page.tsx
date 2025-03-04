import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import ReportCreateForm from "@/components/shared/form/report-create";

const ReportPage = () => (
  <Container display="small">
    <Title className="text-center mb-6" text="Gerar Relatório" />
    <ReportCreateForm />
  </Container>
);

export default ReportPage;
