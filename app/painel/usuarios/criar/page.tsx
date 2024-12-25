import Form from './form'
// import * as svc from '@/services'

const UserCreateForm = async () => {
  // const listRolekxs = await svc.getRolesList()

  return (
    <Form roles={[]} />
  );
};

const UserCreatePage = () => <UserCreateForm />

export default UserCreatePage;
