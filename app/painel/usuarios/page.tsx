import Table from './_table'
import * as svc from '@/services'

const UserPage = async () => {
  const UsersPaginated = await svc.fetchUsersPaginated()

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl">
      <Table {...UsersPaginated} />
    </div>
  )
}

export default UserPage;

