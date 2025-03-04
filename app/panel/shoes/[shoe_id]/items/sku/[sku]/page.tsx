import React from "react";

import Title from "@/components/ui/title";
import Loader from "@/components/ui/loader";
import Container from "@/components/templates/container";

const [QrCodeCreator, BarCodeCreator] = [
  React.lazy(() => import("@/components/ui/qrcode-creator")),
  React.lazy(() => import("@/components/ui/barcode-creator")),
];

type SkuPageProps = {
  params: Promise<{
    sku: string;
  }>;
};

const SkuPage = async ({ params }: SkuPageProps) => {
  const itemSku = (await params).sku;

  return (
    <Container>
      <Title className="text-center mb-6" text="Detalhes do SKU" />
      <Title className="text-center sm:text-lg mb-6" text={itemSku} />
      <div className="mb-8 overflow-x-auto">
        <h3 className="text-lg font-medium mb-2 text-gray-700">QR Code:</h3>
        <div className="flex w-full justify-center">
          <React.Suspense fallback={<Loader />}>
            <QrCodeCreator text={itemSku} />
          </React.Suspense>
        </div>
      </div>
      <div className="mb-8 overflow-x-auto">
        <h3 className="text-lg font-medium mb-2 text-gray-700">
          Código de Barras:
        </h3>
        <div className="flex w-full justify-center">
          <React.Suspense fallback={<Loader />}>
            <BarCodeCreator text={itemSku} />
          </React.Suspense>
        </div>
      </div>
    </Container>
  );
};

export default SkuPage;
