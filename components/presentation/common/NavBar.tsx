"use client";

import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/#home" },
    { name: "Sobre", href: "/#about" },
    { name: "Oferta", href: "/#offer" },
    { name: "Contato", href: "/#contact" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          maxWidth: "96%",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "24px",
          margin: "16px auto",
          padding: "8px 4%",
          zIndex: 1200,
          border: "1px solid rgba(255, 255, 255, 0.8)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 16px" }}>
          <Link href="/#home" className="flex items-center gap-2 cursor-pointer group transition-transform hover:scale-105">
            <div className="relative">
              <Image src="/icons/logo_shoe.png" alt="logo" width={50} height={50} className="group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ERP | Marca-Passo
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-6">
            {links.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 font-medium hover:text-indigo-600 transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <div className="flex items-center gap-3 ml-4">
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <LoginIcon fontSize="small" />
                <span>Entrar</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <PersonAddIcon fontSize="small" />
                <span>Registrar-se</span>
              </Link>
            </div>
          </div>
          <IconButton onClick={() => setMenuOpen(true)} className="lg:hidden">
            <MenuIcon fontSize="large" sx={{ color: "#333" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        sx={{
          backdropFilter: "blur(6px)",
          "& .MuiDrawer-paper": {
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(10px)",
            width: 280,
            padding: "20px 0",
          },
        }}
      >
        <List sx={{ padding: 2 }}>
          <ListItem sx={{ justifyContent: "flex-end", paddingBottom: 2 }}>
            <IconButton onClick={() => setMenuOpen(false)} sx={{ color: "#333" }}>
              <CloseIcon />
            </IconButton>
          </ListItem>
          {links.map((item) => (
            <Link href={item.href} key={item.name} onClick={() => setMenuOpen(false)}>
              <ListItem
                sx={{
                  justifyContent: "flex-start",
                  padding: "12px 20px",
                  borderRadius: "12px",
                  marginBottom: "8px",
                  "&:hover": {
                    background: "rgba(99, 102, 241, 0.1)",
                  },
                }}
              >
                <ListItemText
                  primary={item.name}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#374151",
                    },
                  }}
                />
              </ListItem>
            </Link>
          ))}
          <div className="px-4 pt-4 space-y-2">
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              <div className="flex items-center gap-2 px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                <LoginIcon fontSize="small" />
                <span>Entrar</span>
              </div>
            </Link>
            <Link href="/register" onClick={() => setMenuOpen(false)}>
              <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all">
                <PersonAddIcon fontSize="small" />
                <span>Registrar-se</span>
              </div>
            </Link>
          </div>
        </List>
      </Drawer>
    </>
  );
}

export default NavBar;
