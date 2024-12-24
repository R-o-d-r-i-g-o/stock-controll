import Table from './_table'
import * as svc from '@/services'

const UserPage = async () => {
  const UsersPaginated = await svc.fetchUsersPaginated()

  return (
    <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-4xl mx-5 sm:mx-0">
      <Table {...UsersPaginated} />
    </div>
  )
}

const Page = () => <UserPage />

export default Page;
