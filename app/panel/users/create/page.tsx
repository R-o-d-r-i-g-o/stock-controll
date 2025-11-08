import { notFound } from "next/navigation";
import { getRoleListAction } from "@/app/api/_backend/features/user/user.actions";

import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import UserCreateForm from "@/components/shared/form/user-create";

const UserCreatePage = async () => {
  const result = await getRoleListAction();

  if (!result.success || !result.data || result.data.roles.length < 1) notFound();
  
  const rolesList = result.data;

  return (
    <Container display="small">
      <Title className="text-center mb-6" text="Novo Usuário" />
      <UserCreateForm roles={rolesList.roles} />
    </Container>
  );
};

export default UserCreatePage;
