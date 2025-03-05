import React from "react";

const useInputTextarea = () => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const handleIndentJson = () => {
    if (!textareaRef.current) return;
    const inputArea = textareaRef.current;

    try {
      const jsonInput = JSON.parse(inputArea.value);
      inputArea.value = JSON.stringify(jsonInput, null, 2);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    textareaRef,
    handleIndentJson,
  };
};

export default useInputTextarea;
