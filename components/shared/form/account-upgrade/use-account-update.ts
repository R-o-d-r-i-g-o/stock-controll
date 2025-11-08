import Swal from "sweetalert2";

type UseAccountUpdateForm = {
  shoeId: number;
};

// @ts-ignore
const useAccountUpdateForm = ({ shoeId }: UseAccountUpdateForm) => {
  console.log('shoeId', shoeId);

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
    });
  };

  return { handleDelete };
};

export default useAccountUpdateForm;
