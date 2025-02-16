import { validateAuthUser } from "@/common";
import { NextRequest, NextResponse } from "next/server";

import * as XLSX from "xlsx";

// import * as svc from "@/backend";

const generateReport = async (req: NextRequest) => {
  try {
    await validateAuthUser(req);
    const searchParams = req.nextUrl.searchParams;

    console.log("veio aqui ", searchParams);

    const reportName = "test-golive";

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([
      { id: 1, name: "João", age: 30 },
      { id: 2, name: "Maria", age: 25 },
      { id: 3, name: "José", age: 35 },
    ]);

    XLSX.utils.book_append_sheet(wb, ws, "Relatório");

    // Converte o arquivo para o formato binário Excel
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    // Note: set request headers
    const headers = new Headers({
      "Content-Filename": `${reportName}.xlsx`,
      "Content-Type": "application/vnd.ms-excel",
      "Content-Disposition": `attachment; filename=${reportName}.xlsx`,
    });

    return new NextResponse(buf, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
};

export { generateReport as GET };
