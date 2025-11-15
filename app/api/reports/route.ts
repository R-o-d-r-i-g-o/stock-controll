import { NextRequest, NextResponse } from "next/server";
import { validateAuthUserServerAction } from "@/lib/common/api.server-action-auth";
import { getExpeditionShoesAction } from "@/lib/features/shoe/shoe.actions";
import { getShoesGroupedByItemSizePaginatedAction } from "@/lib/features/shoe/shoe.actions";
import { ReportType } from "@/components/shared/form/report-create/enums";

export async function GET(req: NextRequest) {
  try {
    await validateAuthUserServerAction();

    const searchParams = req.nextUrl.searchParams;
    const reportType = searchParams.get("reportType");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!reportType || !startDate || !endDate) {
      return NextResponse.json({ error: "Parâmetros obrigatórios faltando" }, { status: 400 });
    }

    let data: any = {};
    let filename = "";
    let content = "";

    if (reportType === ReportType.Sales) {
      // Relatório de Vendas
      const result = await getExpeditionShoesAction(startDate, endDate);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }

      const salesData = result.data || [];
      filename = `relatorio-vendas-${new Date(startDate).toISOString().split("T")[0]}-${new Date(endDate).toISOString().split("T")[0]}.csv`;

      // Gerar CSV
      const headers = ["Nome do Calçado", "Quantidade Vendida"];
      const rows = salesData.map((item) => [item.shoeName, Number(item.amount).toString()]);
      content = [headers, ...rows].map((row) => row.join(",")).join("\n");
    } else if (reportType === ReportType.Stock) {
      // Relatório de Estoque
      const result = await getShoesGroupedByItemSizePaginatedAction({
        page: 1,
        size: 1000, // Buscar todos os itens
      });

      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }

      const stockData = result.data?.shoes || [];
      filename = `relatorio-estoque-${new Date().toISOString().split("T")[0]}.csv`;

      // Gerar CSV
      const headers = ["ID", "Nome", "Cor", "Solado", "Tamanho", "Quantidade", "Preço Médio"];
      const rows: string[][] = [];

      stockData.forEach((shoe) => {
        shoe.groupedItems.forEach((group) => {
          const quantity = group.items.length;
          const avgPrice =
            group.items.length > 0
              ? group.items.reduce((sum, item) => sum + Number(item.price), 0) / group.items.length
              : 0;

          rows.push([
            shoe.id.toString(),
            shoe.name,
            shoe.color,
            shoe.sole,
            group.size.toString(),
            quantity.toString(),
            avgPrice.toFixed(2),
          ]);
        });
      });

      content = [headers, ...rows].map((row) => row.join(",")).join("\n");
    } else {
      return NextResponse.json({ error: "Tipo de relatório inválido" }, { status: 400 });
    }

    // Retornar CSV como download
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json({ error: "Erro ao gerar relatório" }, { status: 500 });
  }
}

