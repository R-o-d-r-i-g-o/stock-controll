import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import { useToast } from "@/lib/hooks";
import { deleteUser } from "@/lib/services";

type UseTagDeleteFormProps = {
  tagId: number;
};

const useTagDeleteForm = ({ tagId }: UseTagDeleteFormProps) => {
  const { success, failure } = useToast();
  const router = useRouter();

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

        await deleteUser(tagId);
        success("A etiqueta foi deletada com sucesso!");
        router.push("/panel/users");
      } catch (err) {
        console.error(err);
        failure("Houve um erro ao deletar a etiqueta.");
      }
    });
  };

  return { handleDelete };
};

export default useTagDeleteForm;
