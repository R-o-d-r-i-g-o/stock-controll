import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import { useToast } from "@/lib/hooks";
import { deleteUser } from "@/lib/services";

type UseUserDeleteFormProps = {
  userId: number;
};

const useUserDeleteForm = ({ userId }: UseUserDeleteFormProps) => {
  const router = useRouter();
  const { success, failure } = useToast();

  const handleUserDelete = () => {
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

        await deleteUser(userId);
        success("O usuário foi deletado com sucesso!");
        router.push("/panel/users");
      } catch (err) {
        console.error(err);
        failure("Houve um erro ao deletar o usuário.");
      }
    });
  };

  return { handleUserDelete };
};

export default useUserDeleteForm;
