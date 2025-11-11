import { notFound } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";

import { getUserByIdAction, getRoleListAction } from "@/lib/features/user/user.actions";
import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import UserEditForm from "@/components/shared/form/user-edit";
import UserDeleteForm from "@/components/shared/form/user-delete";

type EditUserPageProps = {
  params: Promise<{
    user_id: string;
  }>;
};

const EditUserPage = async ({ params }: EditUserPageProps) => {
  const userId = parseInt((await params).user_id, 10);

  const [rolesResult, userResult] = await Promise.all([getRoleListAction(), getUserByIdAction(userId)]);

  if (!userResult.success || !userResult.data) notFound();
  if (!rolesResult.success || !rolesResult.data || rolesResult.data.roles.length < 1) notFound();
  
  const user = userResult.data;
  const rolesList = rolesResult.data;

  return (
    <Container display="small">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
            <EditIcon className="text-indigo-600 text-3xl" />
          </div>
          <div>
            <Title className="!mb-0 !text-left" text={`Editar Usuário #${user.id}`} />
            <p className="text-gray-600 text-sm mt-1">Atualize as informações do usuário</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100 mb-6">
        <UserEditForm user={user} roles={rolesList.roles} />
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100">
        <UserDeleteForm userId={user.id} />
      </div>
    </Container>
  );
};

export default EditUserPage;
