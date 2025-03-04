import { notFound } from "next/navigation";
import * as svc from "@/lib/services";

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
    tagId: parseInt(req.tag_id, 10),
    shoeId: parseInt(req.shoe_id, 10),
  };

  const tag = await svc.getShoeRelatedTag(filter);
  if (!tag) notFound();

  return (
    <Container display="small">
      <Title
        className="text-center text-3xl mb-6"
        text={`Editar etiqueta #${tag.id}`}
      />
      <TagEditForm tag={tag} />;
      <TagDeleteForm tagId={tag.id} />
    </Container>
  );
};

export default TagEditPage;
