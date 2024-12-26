
import * as svc from '@/services'

type UpdateUserPageProps = {
  params: Promise<{
    user_id: number;
  }>
}

const UpdateUserPage = async ({ params }: UpdateUserPageProps) => {
  const userId = (await params).user_id
  const [rolesList, user] = await Promise.all([svc.getRolesList(), svc.getUserById(userId)])

  return <>
    {JSON.stringify(rolesList)}
    {JSON.stringify(user)}
  </>
}

export default UpdateUserPage;
