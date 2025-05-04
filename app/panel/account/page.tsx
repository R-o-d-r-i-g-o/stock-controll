"use server";

import React from "react";

import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import AccountEdit from "@/components/shared/form/account-edit";

const ShoeDetailPage = async () => {
  const data = {
    id: 1,
    code: "string",
    name: "string",
    payment: true,
  };

  return (
    <Container>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <Title className="text-center text-3xl mb-6" text="Detalhes da conta" />
        <AccountEdit data={data} />
      </div>
    </Container>
  );
};

export default ShoeDetailPage;
