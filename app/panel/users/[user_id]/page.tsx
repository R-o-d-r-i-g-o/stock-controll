import { notFound } from "next/navigation";
import * as svc from "@/lib/services";

import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import UserEditForm from "@/components/shared/form/user-edit";
import UserDeleteForm from "@/components/shared/form/user-delete";

type EditUserPageProps = {
  params: Promise<{
    user_id: number;
  }>;
};

const EditUserPage = async ({ params }: EditUserPageProps) => {
  const userId = (await params).user_id;
  const [rolesList, user] = await Promise.all([
    svc.getRolesList(),
    svc.getUserById(userId),
  ]);

  if (!user) notFound();
  if (!rolesList || rolesList.roles.length < 1) notFound();

  return (
    <Container display="small">
      <Title className="text-center mb-6" text={`Editar usuário #${user.id}`} />
      <UserEditForm user={user} roles={rolesList.roles} />
      <UserDeleteForm userId={user.id} />
    </Container>
  );
};

export default EditUserPage;
