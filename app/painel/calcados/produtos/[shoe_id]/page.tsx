import * as svc from '@/services'

type UpdateShoePageProps = {
  params: Promise<{
    shoe_id: number;
  }>
}

const UpdateShoePage = async ({ params }: UpdateShoePageProps) => {
  const shoeId = (await params).shoe_id
  const shoe = await svc.getShoeById(shoeId)

  return (
    <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-4xl mx-5 sm:mx-0" >
      {JSON.stringify(shoe)}
    </div>
  )
}

export default UpdateShoePage;