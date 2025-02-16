import { validateAuthUser } from "@/common";
import { NextRequest, NextResponse } from "next/server";

import { parse } from "json2csv";

// import * as svc from "@/backend";

const generateReport = async (req: NextRequest) => {
  try {
    await validateAuthUser(req);
    const searchParams = req.nextUrl.searchParams;

    console.log("veio aqui ", searchParams);

    const reportName = "test-golive";

    const csvContent = parse([
      { id: 1, name: "João", age: 30 },
      { id: 2, name: "Maria", age: 25 },
      { id: 3, name: "José", age: 35 },
    ]);

    // Note: set request headers
    const headers = new Headers();
    headers.set("Content-Type", "text/csv");
    headers.set("Content-Filename", `${reportName}.csv`);
    headers.set(
      "Content-Disposition",
      `attachment; filename=${reportName}.csv`
    );

    return new NextResponse(csvContent, { status: 200, headers });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
};

export { generateReport as GET };
