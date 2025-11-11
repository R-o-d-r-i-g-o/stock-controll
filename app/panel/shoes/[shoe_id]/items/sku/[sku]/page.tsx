import React from "react";
import QrCodeIcon from "@mui/icons-material/QrCode";
import BarcodeIcon from "@mui/icons-material/ViewInAr";

import Title from "@/components/ui/title";
import Loader from "@/components/ui/loader";
import Container from "@/components/templates/container";

const [QrCodeCreator, BarCodeCreator] = [React.lazy(() => import("@/components/ui/qrcode-creator")), React.lazy(() => import("@/components/ui/barcode-creator"))];

type SkuPageProps = {
  params: Promise<{
    sku: string;
  }>;
};

const SkuPage = async ({ params }: SkuPageProps) => {
  const itemSku = (await params).sku;

  return (
    <Container>
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
            <QrCodeIcon className="text-indigo-600 text-3xl" />
          </div>
          <div>
            <Title className="!mb-0 !text-left" text="Detalhes do SKU" />
            <p className="text-gray-600 text-sm mt-1 font-mono">{itemSku}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <QrCodeIcon className="text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-800">QR Code</h3>
          </div>
          <div className="flex w-full justify-center">
            <React.Suspense fallback={<Loader />}>
              <QrCodeCreator text={itemSku} />
            </React.Suspense>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <BarcodeIcon className="text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-800">Código de Barras</h3>
          </div>
          <div className="flex w-full justify-center">
            <React.Suspense fallback={<Loader />}>
              <BarCodeCreator text={itemSku} />
            </React.Suspense>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SkuPage;
