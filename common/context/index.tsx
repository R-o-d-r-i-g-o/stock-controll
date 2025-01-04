"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
  children: ReactNode;
  session?: Session;
}

const Providers = ({ children, session }: Props) => (
  <SessionProvider session={session} refetchInterval={60 * 60 * 2}>
    {children}
  </SessionProvider>
);

export default Providers;
