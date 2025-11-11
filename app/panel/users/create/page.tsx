import { notFound } from "next/navigation";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { getRoleListAction } from "@/lib/features/user/user.actions";
import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import UserCreateForm from "@/components/shared/form/user-create";

const UserCreatePage = async () => {
  const result = await getRoleListAction();

  if (!result.success || !result.data || result.data.roles.length < 1) notFound();
  
  const rolesList = result.data;

  return (
    <Container display="small">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
            <PersonAddIcon className="text-indigo-600 text-3xl" />
          </div>
          <div>
            <Title className="!mb-0 !text-left" text="Novo Usuário" />
            <p className="text-gray-600 text-sm mt-1">Cadastre um novo usuário no sistema</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100">
        <UserCreateForm roles={rolesList.roles} />
      </div>
    </Container>
  );
};

export default UserCreatePage;
