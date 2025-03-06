"use client";

import React from "react";

import {
  Box,
  List,
  Button,
  Drawer as MuiDrawer,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
} from "@mui/material";

import { WarningRounded } from "@mui/icons-material";

import { Anchor, MenuItem } from "./types";
import useDrawer from "./use-drawer";

type DrawerProps = {
  menuOptions: MenuItem[];
};

const Drawer: React.FC<DrawerProps> = ({ menuOptions }) => {
  const { state, actionItem, toggleDrawer, menuPositions, handleNavigation } =
    useDrawer();

  const betaLable = (
    <Chip
      size="small"
      label="Beta"
      className="!bg-yellow-300 !px-2"
      icon={<WarningRounded fontSize="small" />}
    />
  );

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: ["top", "bottom"].includes(anchor) ? "auto" : 280 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {menuOptions.map(({ beta, lable, nav, icon: Icon }) => (
          <ListItem key={lable} disablePadding>
            <ListItemButton onClick={() => handleNavigation(nav)}>
              <ListItem>
                <Icon />
              </ListItem>
              <ListItemText primary={lable} />
              {beta && betaLable}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {actionItem.map(({ lable, action, icon: Icon }) => (
          <ListItem key={lable} disablePadding>
            <ListItemButton onClick={action}>
              <ListItem>
                <Icon />
              </ListItem>
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
          <MuiDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </MuiDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Drawer;
