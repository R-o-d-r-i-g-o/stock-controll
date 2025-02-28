"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import UndoIcon from "@mui/icons-material/Undo";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { menuItems, menuPositions, Anchor } from "@/common";
import { Chip } from "@mui/material";

import Warning from "@mui/icons-material/WarningRounded";

const MenuDrawer = () => {
  const router = useRouter();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const actionItem = [
    {
      lable: "Voltar",
      icon: UndoIcon,
      action: router.back,
    },
    {
      lable: "Sair",
      icon: ExitToAppIcon,
      action: () => signOut().then(),
    },
  ];

  const toggleDrawer = (anchor: Anchor, open: boolean) => () =>
    setState({ ...state, [anchor]: open });

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: ["top", "bottom"].includes(anchor) ? "auto" : 280 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {menuItems.map(({ beta, lable, nav, icon: Icon }) => (
          <ListItem key={lable} disablePadding>
            <ListItemButton onClick={() => router.push(nav)}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={lable} />
              {beta && (
                <Chip
                  size="small"
                  label="Beta"
                  className="!bg-yellow-300 !px-2"
                  icon={<Warning fontSize="small" />}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {actionItem.map(({ lable, action, icon: Icon }) => (
          <ListItem key={lable} disablePadding>
            <ListItemButton onClick={action}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={lable} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="bg-white p-2 rounded-lg shadow-lg">
      {menuPositions.map(({ anchor, icon: Icon }) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <Icon />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default MenuDrawer;
