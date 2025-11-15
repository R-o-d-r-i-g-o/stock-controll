"use client";

import React from "react";

import { Button, Drawer as MuiDrawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

import { Anchor, MenuItem } from "./types";
import useDrawer from "./use-drawer";

type DrawerProps = {
  menuOptions: MenuItem[];
};

const Drawer: React.FC<DrawerProps> = ({ menuOptions }) => {
  const {
    state,
    actionItem,
    toggleDrawer,
    menuPositions,
    handleItemClick,
    handleActionClick,
  } = useDrawer();

  const ContentDivider = ({ title }: { title: string }) => (
    <div className="my-6 relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t-2 border-gray-200"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-gradient-to-br from-white to-gray-50 px-4 text-sm text-gray-500 font-medium">{title}</span>
      </div>
    </div>
  );

  const drawerContent = (anchor: Anchor) => {
    const isVertical = ["top", "bottom"].includes(anchor);    
    
    return (
      <div
       className={`bg-gradient-to-br from-white to-gray-50 ${isVertical ? "w-full" : "h-full"}`}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <div className={`${isVertical ? "w-full max-w-4xl mx-auto" : "w-80"} p-4`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Menu
            </h2>
            <button
              onClick={toggleDrawer(anchor, false)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Fechar menu"
            >
              <MenuIcon />
            </button>
          </div>

          {/* Divider */}
          <ContentDivider title="Navegação" />

          {/* Menu Items */}
          <div className={`${isVertical ? "flex flex-wrap gap-2" : "space-y-2"} mb-6`}>
            {menuOptions.map(({ beta, lable, nav, icon: Icon }) => (
              <button
                onClick={() => handleItemClick(nav)}
                key={lable}
                style={isVertical ? { minWidth: "220px", flex: "1 1 auto", maxWidth: "280px" } : { width: "100%" }}
                className="menu-item flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 bg-white border-2 border-gray-200 hover:border-indigo-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:shadow-lg group transform hover:-translate-y-1"
              >
                <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300 shadow-sm group-hover:shadow-md">
                  <Icon className="text-indigo-600 text-2xl group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-semibold text-gray-800 group-hover:text-indigo-700 text-base transition-colors duration-300">
                  {lable}
                </span>
                {beta && (
                  <span className="px-2 text-xs font-bold bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 rounded-full flex items-center gap-1 w-fit border border-yellow-300">
                    <WarningRoundedIcon className="text-xs" />
                    Beta
                  </span>
                )}
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-2 h-2 rounded-full bg-indigo-600" />
              </button>
            ))}
          </div>

          {/* Divider */}
          <ContentDivider title="Ações" />

          {/* Action Items */}
          <div className={`${isVertical ? "flex gap-3 justify-center" : "space-y-3"}`}>
            {actionItem.map(({ lable, action, icon: Icon }) => {
              const isLogout = lable === "Sair";
              return (
                <button
                  onClick={() => handleActionClick(action)}
                  key={lable}
                  className={`menu-item flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 border-2 ${
                    isLogout
                      ? "hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:shadow-md group"
                      : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md group"
                  }`}
                  style={isVertical ? { minWidth: "150px", flex: "1 1 auto" } : { width: "100%" }}
                >
                  <div className={`p-2 rounded-xl transition-all duration-300 shadow-sm group-hover:shadow-md ${isLogout ? "bg-red-100 group-hover:bg-red-200" : "bg-gray-100 group-hover:bg-gray-200"}`}>
                    <Icon className={`text-2xl transition-transform duration-300 group-hover:scale-110 ${isLogout ? "text-red-600" : "text-gray-600"}`} />
                  </div>
                  <span className={`font-semibold text-base transition-colors duration-300 ${isLogout ? "text-red-700 group-hover:text-red-800" : "text-gray-700 group-hover:text-gray-800"}`}>
                    {lable}
                  </span>
                  <div className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-2 h-2 rounded-full ${isLogout ? "bg-red-600" : "bg-gray-600"}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-2 rounded-lg shadow-lg">
      {menuPositions.map(({ anchor, icon: Icon }) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <Icon />
          </Button>
          <MuiDrawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {drawerContent(anchor)}
          </MuiDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default React.memo(Drawer);
