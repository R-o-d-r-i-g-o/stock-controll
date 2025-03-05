import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import { useToast } from "@/lib/hooks/use-toast";
import { deleteItemById } from "@/lib/services";

type useItemDeleteFormProps = {
  itemId: number;
  shoeId: number;
};

const useItemDeleteForm = ({ itemId, shoeId }: useItemDeleteFormProps) => {
  const router = useRouter();
  const { success, failure } = useToast();

  const handleDelete = () => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Essa ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      try {
        if (!result.isConfirmed) return;

        await deleteItemById(itemId);
        success("O item foi deletado com sucesso!");
        router.push(`/panel/shoes/${shoeId}`);
      } catch (err) {
        console.error(err);
        failure("Houve um erro ao deletar o item.");
      }
    });
  };

  return { handleDelete };
};

export default useItemDeleteForm;
