import React from "react";

const useInputPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    showPassword,
    handleToggleVisibility,
  };
};

export default useInputPassword;
