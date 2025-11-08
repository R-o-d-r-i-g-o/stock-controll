import { notFound } from "next/navigation";
import { getUserByIdAction, getRoleListAction } from "@/app/api/_backend/features/user/user.actions";

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
      <Title className="text-center mb-6" text={`Editar usuário #${user.id}`} />
      <UserEditForm user={user} roles={rolesList.roles} />
      <UserDeleteForm className="mt-6" userId={user.id} />
    </Container>
  );
};

export default EditUserPage;
