"use client";

import React from "react";

import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import ShoeScanForm from "@/components/shared/form/shoe-scan";

const RegisterBuying = () => {
  return (
    <Container display="small">
      <Title className="text-center mb-6" text="Scanner de Etiquetas" />
      <ShoeScanForm />
    </Container>
  );
};

export default RegisterBuying;
