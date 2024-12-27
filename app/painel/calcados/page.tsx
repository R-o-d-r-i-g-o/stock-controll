import Table from './_table'
import { defaultPageSize } from "@/common"

import * as svc from '@/services'

type UserListPageProps = {
  searchParams: Promise<{
    page: string;
    size: string;
  }>
}

const HistoryListPage = async ({ searchParams }: UserListPageProps) => {
  const req = await searchParams

  const filters = {
    page: parseInt(req.page ?? "1"),
    size: parseInt(req.size ?? defaultPageSize.toString()),
  }
  const usersPaginated = await svc.getShoesGroupedByCategoryPaginated(filters)

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