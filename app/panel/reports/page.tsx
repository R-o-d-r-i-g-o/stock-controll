import { ZoomAnimateBlock } from "@/components/ui";
import Form from "./_form";

const ReportPage = () => (
  <ZoomAnimateBlock className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-gray-700 text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Gerar Relatório</h2>
    <Form />
  </ZoomAnimateBlock>
);

export default ReportPage;
