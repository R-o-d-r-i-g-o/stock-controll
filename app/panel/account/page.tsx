"use server";

import React from "react";

import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import AccountEdit from "@/components/shared/form/account-edit";
import PaymmentTable from "@/components/shared/table/payment";
import Link from "next/link";

const RedirectToPayment = ({ expirationDays = 0 }) => {
  const warningMessage = `Pagar Mensalidade ${expirationDays > 0 ? `(Vence em ${expirationDays} dia(s))` : ""}`;
  return (
    <Link href="panel/account/payment">
      <button className="w-full py-3 px-4 mt-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300">{warningMessage}</button>
    </Link>
  );
};

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
        <RedirectToPayment />
      </div>
      <PaymmentTable data={[]} />
    </Container>
  );
};

export default ShoeDetailPage;
