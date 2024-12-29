import * as svc from "@/services";
import Dash from "./_dash";
import { notFound } from "next/navigation";

type UpdateUserPageProps = {
  params: Promise<{
    shoe_id: number;
  }>;
};

const ShoeDetailPage = async ({ params }: UpdateUserPageProps) => {
  const shoeId = (await params).shoe_id;
  const shoeData = await svc.getCategoryById(shoeId);

  if (!shoeData) notFound();

  return (
    <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-4xl mx-5 sm:mx-0">
      <Dash data={shoeData} />
    </div>
  );
};

export default ShoeDetailPage;
