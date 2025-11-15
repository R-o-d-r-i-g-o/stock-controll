"use client";

import React, { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import HistoryIcon from "@mui/icons-material/History";
import { getAuditsByDateAction } from "@/lib/features/audit/audit.actions";
import moment from "moment";

type AuditsChartProps = {
  initialData: Array<{
    date: string;
    count: number;
  }>;
};

const AuditsChart: React.FC<AuditsChartProps> = ({ initialData }) => {
  const [dateRange, setDateRange] = useState({
    startDate: moment().subtract(30, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
  });
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleDateChange = async (startDate: string, endDate: string) => {
    setLoading(true);
    setDateRange({ startDate, endDate });
    try {
      const result = await getAuditsByDateAction(startDate, endDate);
      if (result.success && result.data) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Preencher dias faltantes com 0
    const start = moment(dateRange.startDate);
    const end = moment(dateRange.endDate);
    const days: { [key: string]: number } = {};

    // Inicializar todos os dias com 0
    let current = start.clone();
    while (current.isSameOrBefore(end)) {
      days[current.format("YYYY-MM-DD")] = 0;
      current.add(1, "day");
    }

    // Preencher com dados reais
    data.forEach((item) => {
      days[item.date] = item.count;
    });

    return Object.entries(days).map(([date, count]) => ({
      date: moment(date).format("DD/MM"),
      fullDate: date,
      count,
    }));
  }, [data, dateRange]);

  const totalAudits = useMemo(() => {
    return data.reduce((sum, item) => sum + item.count, 0);
  }, [data]);

  const hasData = useMemo(() => {
    return data && data.length > 0 && data.some((item) => item.count > 0);
  }, [data]);

  const quickFilters = [
    { label: "7 dias", days: 7 },
    { label: "30 dias", days: 30 },
    { label: "90 dias", days: 90 },
    { label: "1 ano", days: 365 },
  ];

  if (!hasData && !loading) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 border-2 border-gray-100">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                Interações dos usuários
              </h3>
              <p className="text-gray-600 text-sm">Atividades registradas no sistema</p>
            </div>
          </div>
        </div>
        <div className="h-96 flex flex-col items-center justify-center text-center">
          <HistoryIcon className="text-6xl text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg font-medium mb-2">Nenhum dado disponível</p>
          <p className="text-gray-400 text-sm">Não há interações registradas no período selecionado para exibir.</p>
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
              Interações dos usuários
            </h3>
            <p className="text-gray-600 text-sm">Atividades registradas no sistema</p>
          </div>
          <div className="text-right bg-purple-50 px-4 py-2 rounded-lg border-2 border-purple-200">
            <div className="text-2xl font-bold text-purple-600">{totalAudits}</div>
            <div className="text-xs text-gray-600 font-medium">Total no período</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <button
              key={filter.label}
              onClick={() => {
                const start = moment().subtract(filter.days, "days").format("YYYY-MM-DD");
                const end = moment().format("YYYY-MM-DD");
                handleDateChange(start, end);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                moment().subtract(filter.days, "days").format("YYYY-MM-DD") === dateRange.startDate
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="text-gray-500">Carregando...</div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorAudits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              tick={{ fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                padding: "12px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
              formatter={(value: number) => [`${value} interações`, ""]}
              labelStyle={{ fontWeight: "bold", marginBottom: "8px", color: "#1f2937" }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: "#8b5cf6", r: 4 }}
              activeDot={{ r: 6, stroke: "#8b5cf6", strokeWidth: 2 }}
              fill="url(#colorAudits)"
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      <div className="mt-6 pt-6 border-t-2 border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <HistoryIcon className="text-lg" />
          <span>Período: {moment(dateRange.startDate).format("DD/MM/YYYY")} até {moment(dateRange.endDate).format("DD/MM/YYYY")}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AuditsChart);

