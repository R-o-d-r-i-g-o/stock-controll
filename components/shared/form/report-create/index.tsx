"use client";

import InputError from "@/components/ui/input-error";
import { reportTypes } from "@/common";
import useReportCreateForm from "./use-report";

const ReportCreateForm = () => {
  const { register, formState, handleSubmit, onSubmit } = useReportCreateForm();

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
        <InputError error={formState.errors.startDate} />
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
        <InputError error={formState.errors.endDate} />
      </div>
      <div>
        <span className="block text-left font-medium text-gray-600">
          Tipo de Relatório
        </span>
        <div className="flex justify-start gap-6 mt-2 text-gray-700">
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
        <InputError error={formState.errors.reportType} />
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

export default ReportCreateForm;
