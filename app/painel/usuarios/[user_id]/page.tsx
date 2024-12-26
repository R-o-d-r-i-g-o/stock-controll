import { notFound } from 'next/navigation';

import Form from './form'
import * as svc from '@/services'

type UpdateUserPageProps = {
  params: Promise<{
    user_id: number;
  }>
}

const UpdateUserPage = async ({ params }: UpdateUserPageProps) => {
  const userId = (await params).user_id
  const [rolesList, user] = await Promise.all([svc.getRolesList(), svc.getUserById(userId)])

  if (!user) notFound();

  return <Form user={user} roles={rolesList.roles} />
}

export default UpdateUserPage;
