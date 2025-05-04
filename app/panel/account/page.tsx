import React from "react";

import Title from "@/components/ui/title";
import Container from "@/components/templates/container";

const ShoeDetailPage = async () => {
  return (
    <Container>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <Title className="text-center text-3xl mb-6" text="Detalhes da conta" />
      </div>
    </Container>
  );
};

export default ShoeDetailPage;
