import Form from "./form";

type UpdateUserPageProps = {
  params: Promise<{
    shoe_id: string;
  }>;
};

const CreateShoePage = async ({ params }: UpdateUserPageProps) => {
  const shoeId = parseInt((await params).shoe_id, 10);

  return <Form shoeId={shoeId} />;
};

export default CreateShoePage;
