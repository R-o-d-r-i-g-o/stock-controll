import { notFound } from "next/navigation";
import * as svc from "@/lib/services";

import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import UserCreateForm from "@/components/shared/form/user-create";

const UserCreatePage = async () => {
  const rolesList = await svc.getRolesList();

  if (!rolesList || rolesList.roles.length < 1) notFound();

  return (
    <Container display="small">
      <Title className="text-center mb-6" text="Novo Usuário" />
      <UserCreateForm roles={rolesList.roles} />;
    </Container>
  );
};

export default UserCreatePage;
