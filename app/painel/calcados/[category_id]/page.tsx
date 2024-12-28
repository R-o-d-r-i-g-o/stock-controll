import * as svc from '@/services'
import Dash from './_dash'
import { notFound } from 'next/navigation';

type UpdateUserPageProps = {
  params: Promise<{
    category_id: number;
  }>
}

const HistoryListPage = async ({ params }: UpdateUserPageProps) => {
  const categoryId = (await params).category_id
  const categoryData = await svc.getCategoryById(categoryId)

  if (!categoryData) notFound()

  return (
    <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-4xl mx-5 sm:mx-0" >
      <Dash data={categoryData} />
    </div>
  )
}

export default HistoryListPage;