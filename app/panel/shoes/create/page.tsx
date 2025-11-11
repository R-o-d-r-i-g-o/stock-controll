import AddCircleIcon from "@mui/icons-material/AddCircle";

import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import ShoeCreateForm from "@/components/shared/form/shoe-create";

const ShoeCreatePage = () => {
  return (
    <Container display="small">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
            <AddCircleIcon className="text-indigo-600 text-3xl" />
          </div>
          <div>
            <Title className="!mb-0 !text-left" text="Novo Calçado" />
            <p className="text-gray-600 text-sm mt-1">Cadastre um novo modelo de calçado no sistema</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100">
        <ShoeCreateForm />
      </div>
    </Container>
  );
};

export default ShoeCreatePage;
