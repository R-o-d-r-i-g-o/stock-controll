import React from "react";

import { SwipeUpSharp, SwipeDownSharp, SwipeLeftSharp, SwipeRightSharp, Undo, ExitToApp } from "@mui/icons-material";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Anchor, MenuPosition } from "./types";

const useDrawer = () => {
  const router = useRouter();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleNavigation = (path: string) => router.push(path);

  const toggleDrawer = (anchor: Anchor, open: boolean) => () => setState({ ...state, [anchor]: open });

  const actionItem = [
    {
      lable: "Voltar",
      icon: Undo,
      action: router.back,
    },
    {
      lable: "Sair",
      icon: ExitToApp,
      action: () => signOut().then(),
    },
  ];

  const menuPositions: Array<MenuPosition> = [
    {
      anchor: "bottom",
      icon: SwipeUpSharp,
    },
    {
      anchor: "right",
      icon: SwipeLeftSharp,
    },
    {
      anchor: "left",
      icon: SwipeRightSharp,
    },
    {
      anchor: "top",
      icon: SwipeDownSharp,
    },
  ];

  return {
    state,
    actionItem,
    toggleDrawer,
    menuPositions,
    handleNavigation,
  };
};

export default useDrawer;
