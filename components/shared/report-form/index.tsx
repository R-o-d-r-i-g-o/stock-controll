"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { getReportSchema } from "@/lib/schemas";
import { reportTypes } from "@/common";

type ReportFormData = z.infer<typeof getReportSchema>;

const ReportPage = () => {
  const { register, handleSubmit, formState } = useForm<ReportFormData>({
    resolver: zodResolver(getReportSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<ReportFormData> = (data) => {
    const { startDate, endDate, reportType } = data;

    const searchParams = new URLSearchParams({
      reportType: reportType.toString(),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });

    router.push(`/api/reports?${searchParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="startDate"
          className="block text-left font-medium text-gray-600"
        >
          Data Inicial
        </label>
        <input
          type="date"
          id="startDate"
          {...register("startDate")}
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
        />
        {formState.errors.startDate && (
          <p className="text-red-500 text-sm mt-1">
            {formState.errors.startDate.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="endDate"
          className="block text-left font-medium text-gray-600"
        >
          Data Final
        </label>
        <input
          type="date"
          id="endDate"
          {...register("endDate")}
          className="w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300"
        />
        {formState.errors.endDate && (
          <p className="text-red-500 text-sm mt-1">
            {formState.errors.endDate.message}
          </p>
        )}
      </div>

      <div>
        <span className="block text-left font-medium text-gray-600">
          Tipo de Relatório
        </span>
        <div className="flex justify-start gap-6 mt-2">
          {reportTypes.map((rt) => (
            <label key={rt.value} className="flex items-center space-x-2">
              <input
                type="radio"
                value={rt.value}
                {...register("reportType")}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>{rt.lable}</span>
            </label>
          ))}
        </div>
        {formState.errors.reportType && (
          <p className="text-red-500 text-sm mt-1">
            {formState.errors.reportType.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={formState.isSubmitting}
        className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
      >
        Gerar Relatório
      </button>
    </form>
  );
};

export default ReportPage;
