"use client";

import React from "react";
import PrintIcon from "@mui/icons-material/Print";

type PrintButtonProps = {
  className?: string;
};

const PrintButton: React.FC<PrintButtonProps> = ({ className = "" }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style jsx global>
      {`
        @media print {
          @page {
            margin: 1.5cm;
            size: A4;
          }

          /* Ocultar elementos não necessários na impressão */
          nav,
          header,
          footer,
          button,
          .print\\:hidden {
            display: none !important;
          }

          /* Mostrar apenas o conteúdo de impressão */
          body {
            background: white !important;
          }

          #print-content {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 2cm !important;
            page-break-inside: avoid;
            width: 100% !important;
          }

          #print-content > div {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .print\\:shadow-none {
            box-shadow: none !important;
          }

          .print\\:border {
            border: 1px solid #d1d5db !important;
          }

          .print\\:justify-center {
            justify-content: center !important;
          }

          .print\\:mt-2 {
            margin-top: 0.5rem !important;
          }

          /* Garantir que os códigos sejam visíveis e bem formatados na impressão */
          canvas,
          svg {
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
            margin: 0 auto !important;
          }

          /* Estilizar textos na impressão */
          h3 {
            font-size: 1.25rem !important;
            font-weight: 600 !important;
            margin-bottom: 1rem !important;
          }

          p {
            font-size: 0.875rem !important;
          }
        }
      `}
      </style>
      <button
        onClick={handlePrint}
        className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 shadow-md hover:shadow-lg ${className}`}
        aria-label="Imprimir etiqueta"
      >
        <PrintIcon />
        <span>Imprimir</span>
      </button>
    </>
  );
};

export default PrintButton;

