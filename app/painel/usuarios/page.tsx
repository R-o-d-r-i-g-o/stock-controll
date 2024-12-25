import Table from './_table'
import * as svc from '@/services'

type UserListPageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

const UserListPage = async ({ searchParams }: UserListPageProps) => {
  const filters = (await searchParams).filters
  const UsersPaginated = await svc.fetchUsersPaginated()

  console.log('veio aqui ', filters)

  return (
    <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-4xl mx-5 sm:mx-0">
      {JSON.stringify(filters)}
      <Table {...UsersPaginated} />
    </div>
  )
}

export default UserListPage;
