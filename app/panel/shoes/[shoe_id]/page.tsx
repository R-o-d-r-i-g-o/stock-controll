import { getShoeByIdAction } from "@/lib/features/shoe/shoe.actions";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ListTags from "@mui/icons-material/Sell";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import ItemTable from "@/components/shared/table/item";
import ShoeEditForm from "@/components/shared/form/shoe-edit";
import ShoeDeleteFrom from "@/components/shared/form/shoe-delete";

type ShoeDetailPageProps = {
  params: Promise<{
    shoe_id: string;
  }>;
};

const ShoeDetailPage = async ({ params }: ShoeDetailPageProps) => {
  const shoeId = parseInt((await params).shoe_id, 10);
  const result = await getShoeByIdAction(shoeId);

  if (!result.success || !result.data) notFound();
  
  const shoe = result.data;

  return (
    <Container>
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
            <InfoIcon className="text-indigo-600 text-3xl" />
          </div>
          <div>
            <Title className="!mb-0 !text-left" text={`Detalhes do Calçado #${shoe.id}`} />
            <p className="text-gray-600 text-sm mt-1">Visualize e edite as informações do calçado</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100 mb-6">
        <ShoeEditForm
          data={shoe}
          customSubmitButton={
            <React.Fragment>
              <Divider sx={{ margin: "20px 0" }} />
              <div className="flex flex-wrap gap-3 items-center justify-center">
                <Link href={`/panel/shoes/${shoe.id}/items/create`}>
                  <IconButton className="!bg-gradient-to-r !from-green-600 !to-emerald-600 !rounded-xl !text-white hover:!from-green-700 hover:!to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg" title="Adicionar novo item">
                    <AddIcon />
                  </IconButton>
                </Link>
                <IconButton type="submit" className="!bg-gradient-to-r !from-indigo-600 !to-purple-600 !rounded-xl !text-white hover:!from-indigo-700 hover:!to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg" title="Editar calçado">
                  <EditIcon />
                </IconButton>
                <ShoeDeleteFrom shoeId={shoe.id} />
                <Link href={`/panel/shoes/${shoe.id}/tags`}>
                  <IconButton className="!bg-gradient-to-r !from-amber-500 !to-orange-500 !rounded-xl !text-white hover:!from-amber-600 hover:!to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg" title="Listar etiquetas do produto">
                    <ListTags />
                  </IconButton>
                </Link>
              </div>
            </React.Fragment>
          }
        />
      </div>
      <ItemTable meta={{ shoeId: shoe.id }} data={shoe.items} />
    </Container>
  );
};

export default ShoeDetailPage;
