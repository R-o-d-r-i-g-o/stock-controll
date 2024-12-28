import BarCode from "./_barCode";
import QrCode from "./_qrCode";

type SkuPageProps = {
  params: Promise<{
    sku: string;
  }>;
}

const SkuPage = async ({ params }: SkuPageProps) => {
  const itemSku = (await params).sku;

  return (
    <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-4xl mx-5 sm:mx-0">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Detalhes do SKU
      </h2>
      <p className="text-center text-lg mb-10">
        Código SKU: <strong>{itemSku}</strong>
      </p>

      <div className="mb-8 overflow-x-auto">
        <h3 className="text-lg font-medium mb-2 text-gray-700">QR Code:</h3>
        <div className="flex justify-center">
          <QrCode text={itemSku} />
        </div>
      </div>

      <div className="mb-8 overflow-x-auto">
        <h3 className="text-lg font-medium mb-2 text-gray-700">Código de Barras:</h3>
        <div className="flex justify-center">
          <BarCode text={itemSku} />
        </div>
      </div>
    </div>
  );
}

export default SkuPage;
