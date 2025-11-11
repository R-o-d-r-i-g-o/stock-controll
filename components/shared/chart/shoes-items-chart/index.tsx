"use client";

import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import WarningIcon from "@mui/icons-material/Warning";
import InventoryIcon from "@mui/icons-material/Inventory";

type ShoesItemsChartProps = {
  data: Array<{
    id: number;
    name: string;
    itemsCount: number;
  }>;
};

const LOW_STOCK_THRESHOLD = 10;

const ShoesItemsChart: React.FC<ShoesItemsChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Ordenar por quantidade (menor primeiro para destacar os com poucas unidades)
    const sorted = [...data].sort((a, b) => a.itemsCount - b.itemsCount);
    const limited = sorted.slice(0, 30); // Top 30 para melhor visualização

    return limited.map((item) => ({
      name: item.name.length > 18 ? `${item.name.substring(0, 18)}...` : item.name,
      fullName: item.name,
      itemsCount: item.itemsCount,
      isLowStock: item.itemsCount <= LOW_STOCK_THRESHOLD,
      isWarning: item.itemsCount > LOW_STOCK_THRESHOLD && item.itemsCount <= LOW_STOCK_THRESHOLD * 2,
      id: item.id,
    }));
  }, [data]);

  const lowStockCount = useMemo(() => {
    return data.filter((item) => item.itemsCount <= LOW_STOCK_THRESHOLD).length;
  }, [data]);

  const totalItems = useMemo(() => {
    return data.reduce((sum, item) => sum + item.itemsCount, 0);
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 border-2 border-gray-100">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                Visão Geral do Estoque
              </h3>
              <p className="text-gray-600 text-sm">Distribuição de itens por sapato</p>
            </div>
          </div>
        </div>
        <div className="h-96 flex flex-col items-center justify-center text-center">
          <InventoryIcon className="text-6xl text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg font-medium mb-2">Nenhum dado disponível</p>
          <p className="text-gray-400 text-sm">Não há sapatos cadastrados no sistema para exibir.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
              Visão Geral do Estoque
            </h3>
            <p className="text-gray-600 text-sm">Distribuição de itens por sapato</p>
          </div>
          <div className="flex gap-4">
            <div className="text-right bg-indigo-50 px-4 py-2 rounded-lg border-2 border-indigo-200">
              <div className="text-2xl font-bold text-indigo-600">{totalItems.toLocaleString()}</div>
              <div className="text-xs text-gray-600 font-medium">Total de itens</div>
            </div>
            <div className="text-right bg-purple-50 px-4 py-2 rounded-lg border-2 border-purple-200">
              <div className="text-2xl font-bold text-purple-600">{data.length}</div>
              <div className="text-xs text-gray-600 font-medium">Sapatos</div>
            </div>
          </div>
        </div>

        {lowStockCount > 0 && (
          <div className="flex items-center gap-2 text-orange-700 bg-gradient-to-r from-orange-50 to-red-50 px-4 py-3 rounded-lg border-2 border-orange-200 mb-4">
            <WarningIcon className="text-xl" />
            <span className="font-medium">
              {lowStockCount} {lowStockCount === 1 ? "sapato" : "sapatos"} com estoque baixo (≤ {LOW_STOCK_THRESHOLD} unidades)
            </span>
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={Math.max(400, chartData.length * 35)}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
        >
          <defs>
            <linearGradient id="gradientNormal" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="gradientWarning" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
              <stop offset="100%" stopColor="#f97316" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="gradientLow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
              <stop offset="100%" stopColor="#dc2626" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
          <XAxis
            type="number"
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value.toString()}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={115}
            stroke="#6b7280"
            tick={{ fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "2px solid #e5e7eb",
              borderRadius: "12px",
              padding: "12px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
            formatter={(value: number, name: string, props: any) => [
              `${value} unidades`,
              props.payload.fullName,
            ]}
            labelStyle={{ fontWeight: "bold", marginBottom: "8px", color: "#1f2937" }}
          />
          <Bar dataKey="itemsCount" radius={[0, 8, 8, 0]} barSize={30}>
            {chartData.map((entry, index) => {
              let fillColor = "";
              if (entry.isLowStock) {
                fillColor = "url(#gradientLow)";
              } else if (entry.isWarning) {
                fillColor = "url(#gradientWarning)";
              } else {
                fillColor = "url(#gradientNormal)";
              }
              return <Cell key={`cell-${index}`} fill={fillColor} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 pt-6 border-t-2 border-gray-200">
        <div className="flex flex-wrap gap-4 md:gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md"></div>
            <span className="text-gray-700 font-medium">Estoque normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-md"></div>
            <span className="text-gray-700 font-medium">Atenção (≤ {LOW_STOCK_THRESHOLD * 2})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-md"></div>
            <span className="text-gray-700 font-medium">Estoque baixo (≤ {LOW_STOCK_THRESHOLD})</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 ml-auto">
            <InventoryIcon className="text-lg" />
            <span>Mostrando {chartData.length} de {data.length} sapatos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ShoesItemsChart);

