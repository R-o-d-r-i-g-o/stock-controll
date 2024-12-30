import Form from "./form";
import * as svc from "@/services";

async function UserCreatePage() {
  const listRolekxs = await svc.getRolesList();

  return <Form roles={listRolekxs.roles} />;
}

export default UserCreatePage;
