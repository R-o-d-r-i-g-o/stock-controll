"use client";

import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/#home" },
    { name: "Sobre", href: "/#sobre" },
    { name: "Oferta", href: "/#oferta" },
    { name: "Entrar", href: "/login" },
    { name: "Registrar-se", href: "/register" },
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ background: "#fff", maxWidth: "96%", boxShadow: 3, borderRadius: "22px", margin: "12px auto", padding: "4px 8%", zIndex: 1200 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 16px" }}>
          <Link href="/" className="flex items-center gap-1 cursor-pointer hover:animate-wiggle hover:animate-twice hover:animate-ease-out">
            <Image src="/icons/logo_shoe.png" alt="logo" width={60} height={60} />
            <span className="text-base font-bold text-gray-400">ERP | Marca-Passo</span>
          </Link>
          <IconButton onClick={() => setMenuOpen(true)} className="lg:hidden">
            <MenuIcon fontSize="large" sx={{ color: "#333" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)} sx={{ backdropFilter: "blur(6px)" }}>
        <List sx={{ width: 240, padding: 2 }}>
          <ListItem sx={{ justifyContent: "center" }}>
            <IconButton onClick={() => setMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </ListItem>
          {links.map((item) => (
            <Link href={item.href} key={item.name} onClick={() => setMenuOpen(false)} className="text-gray font-semibold hover:text-primary">
              {/* @ts-ignore */}
              <ListItem sx={{ justifyContent: "center" }} button>
                <ListItemText primary={item.name} sx={{ textAlign: "center", fontSize: "16px" }} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default NavBar;
