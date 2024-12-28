import * as svc from '@/services'
import Form from './form'

type UpdateShoePageProps = {
  params: Promise<{
    shoe_id: number;
  }>
}

const UpdateShoePage = async ({ params }: UpdateShoePageProps) => {
  const shoeId = (await params).shoe_id
  const shoe = await svc.getShoeById(shoeId)

  return <Form shoe={shoe} />
}

export default UpdateShoePage;