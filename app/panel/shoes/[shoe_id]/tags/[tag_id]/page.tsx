import { notFound } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";

import { getTagByIdAction } from "@/lib/features/tag/tag.actions";
import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import TagEditForm from "@/components/shared/form/tag-edit";
import TagDeleteForm from "@/components/shared/form/tag-delete";

type TagEditPageProps = {
  params: Promise<{
    tag_id: string;
    shoe_id: string;
  }>;
};

const TagEditPage = async ({ params }: TagEditPageProps) => {
  const req = await params;
  const filter = {
    id: parseInt(req.tag_id, 10),
    shoeId: parseInt(req.shoe_id, 10),
  };

  const result = await getTagByIdAction(filter);
  if (!result.success || !result.data) notFound();
  
  const tag = result.data;

  return (
    <Container display="small">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
            <EditIcon className="text-indigo-600 text-3xl" />
          </div>
          <div>
            <Title className="!mb-0 !text-left" text={`Editar Etiqueta #${tag.id}`} />
            <p className="text-gray-600 text-sm mt-1">Atualize as informações da etiqueta</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100 mb-6">
        <TagEditForm tag={tag as any} />
      </div>
      <TagDeleteForm shoeId={tag.shoeId} tagId={tag.id} />
    </Container>
  );
};

export default TagEditPage;
