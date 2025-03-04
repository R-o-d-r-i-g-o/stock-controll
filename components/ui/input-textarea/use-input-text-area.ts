type useInputTextareaProps = {
  fieldId: string;
};

const useInputTextarea = ({ fieldId }: useInputTextareaProps) => {
  const handleIndentJson = () => {
    const inputArea = document.getElementById(fieldId)! as HTMLTextAreaElement;

    try {
      const jsonInput = JSON.parse(inputArea.value);
      inputArea.value = JSON.stringify(jsonInput, null, 2);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    handleIndentJson,
  };
};

export default useInputTextarea;
