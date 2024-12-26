import Table from './_table'
import { defautlPageSize } from "@/common"

import * as svc from '@/services'

type UserListPageProps = {
  searchParams: Promise<{
    page: string
  }>
}

const HistoryListPage = async ({ searchParams }: UserListPageProps) => {
  const req = await searchParams

  const filters = {
    size: defautlPageSize,
    page: parseInt(req.page ?? "1"),
  }
  const usersPaginated = await svc.getAuditsPaginated(filters)

  return (
    <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-4xl mx-5 sm:mx-0">
      <Table
        filter={filters}
        data={usersPaginated}
      />
    </div>
  )
}

export default HistoryListPage;