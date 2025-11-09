import { getShoeByIdAction } from "@/lib/features/shoe/shoe.actions";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ListTags from "@mui/icons-material/Sell";
import IconButton from "@mui/material/IconButton";

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
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <Title className="text-center text-3xl mb-6" text={`Detalhes do calçado #${shoe.id}`} />
        <ShoeEditForm
          data={shoe}
          customSubmitButton={
            <React.Fragment>
              <Divider sx={{ margin: "20px 0" }} />
              <div className="flex gap-2 items-center justify-center">
                <Link href={`/panel/shoes/${shoe.id}/items/create`}>
                  <IconButton className=" !bg-green-500 !rounded-2xl !text-white" title="Adicionar novo item">
                    <AddIcon />
                  </IconButton>
                </Link>
                <IconButton type="submit" className=" !bg-blue-500 !rounded-2xl !text-white" title="Editar calçado">
                  <EditIcon />
                </IconButton>
                <ShoeDeleteFrom shoeId={shoe.id} />
                <Link href={`/panel/shoes/${shoe.id}/tags`}>
                  <IconButton className="!bg-yellow-500 !rounded-2xl !text-white" title="Listar etiquetas do produto">
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
