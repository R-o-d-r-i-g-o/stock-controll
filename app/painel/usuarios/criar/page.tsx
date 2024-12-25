import Form from './form'
import * as svc from '@/services'

const UserCreateForm = async () => {
  const listRoles = await svc.getRolesList()

  return (
    <Form roles={listRoles.roles} />
  );
};


const UserCreatePage = () => <UserCreateForm />

export default UserCreatePage;
