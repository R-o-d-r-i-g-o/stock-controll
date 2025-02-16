import { validateAuthUser } from "@/common";
import { NextRequest, NextResponse } from "next/server";

import * as XLSX from "xlsx";

// import * as svc from "@/backend";

const generateReport = async (req: NextRequest) => {
  try {
    await validateAuthUser(req);
    const searchParams = req.nextUrl.searchParams;

    console.log("veio aqui ", searchParams);

    const { buffer, headers } = formatExcelFile("testReport", [
      { id: 1, name: "João", age: 30 },
      { id: 2, name: "Maria", age: 25 },
      { id: 3, name: "José", age: 35 },
    ]);

    console.log("veio aqui 123 ", headers, buffer);

    return new NextResponse(buffer, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
};

const formatExcelFile = (filename: string, data: Record<string, unknown>[]) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(wb, ws, "Relatório");

  // Note: convert generated .xlsx file into buffer
  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

  // Note: set request headers
  const headers = new Headers({
    "Content-Filename": `${filename}.xlsx`,
    "Content-Type": "application/vnd.ms-excel",
    "Content-Disposition": `attachment; filename=${filename}.xlsx`,
  });

  return { buffer, headers };
};

export { generateReport as GET };
