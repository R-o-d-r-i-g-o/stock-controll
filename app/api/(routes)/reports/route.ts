import { ReportType, validateAuthUser } from "@/common";
import { getReportSchema } from "@/lib/schemas";

import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { errorHandler } from "@/app/api/_backend/common/api.error";

import * as svc from "@/app/api/_backend";
import moment from "moment";
import { z } from "zod";

type ReportFilterData = z.infer<typeof getReportSchema>;

const generateReport = async (req: NextRequest) => {
  try {
    await validateAuthUser(req);
    const searchParams = req.nextUrl.searchParams;

    const filter = getReportSchema.parse({
      reportType: searchParams.get("reportType"),
      startDate: searchParams.get("startDate"),
      endDate: searchParams.get("endDate"),
    });

    let reportData: Record<string, unknown>[] = [];

    if (filter.reportType === ReportType.Stock) {
      const data = await svc.getShoesGroupedBySizePaginated({
        page: 1,
        size: 10000000,
        startDate: filter.startDate,
        endDate: filter.endDate,
      });
      reportData = svc.formateStockReportColumnData(data.shoes);
    } else {
      const data = await svc.getExpeditionShoes({
        startDate: filter.startDate,
        endDate: filter.endDate,
      });
      reportData = svc.formateExpeditionShoesReportColumnData(data);
    }

    const { buffer, headers } = formatExcelFile(
      formatFilename(filter),
      reportData
    );

    return new NextResponse(buffer, { status: 200, headers });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

const formatFilename = (filter: ReportFilterData) => {
  const formatDate = (date: Date) => moment(date).format("DD_MM_YYYY");

  const reportTypeMap: Record<ReportType, string> = {
    [ReportType.Sales]: "Relatório-de-venda",
    [ReportType.Stock]: "Relatório-de-estoque",
  };

  const el = {
    name: reportTypeMap[filter.reportType] || "Relatório-desconhecido",
    start: formatDate(filter.startDate),
    end: formatDate(filter.endDate),
  };

  return encodeURIComponent(`${el.name}-de-${el.start}-até-${el.end}`);
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
