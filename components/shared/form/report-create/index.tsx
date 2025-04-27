"use client";

import InputText from "@/components/ui/input-text";
import InputLable from "@/components/ui/input-lable";
import InputError from "@/components/ui/input-error";
import useReportCreateForm from "./use-report";

const ReportCreateForm = () => {
  const { register, formState, handleSubmit, onSubmit, reportOptions } = useReportCreateForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <InputLable htmlFor="startDate" lable="Data inicial" />
        <InputText id="startDate" type="date" {...register("startDate")} />
        <InputError error={formState.errors.startDate} />
      </div>
      <div>
        <InputLable htmlFor="endDate" lable="Data Final" />
        <InputText id="endDate" type="date" {...register("endDate")} />
        <InputError error={formState.errors.endDate} />
      </div>
      <div>
        <InputLable lable="Tipo de Relatório" />
        <div className="flex justify-start gap-6 mt-2 text-gray-700">
          {reportOptions.map((opt) => (
            <label key={opt.value} className="flex items-center space-x-2">
              <input type="radio" value={opt.value} {...register("reportType")} className="text-indigo-600 focus:ring-indigo-500" />
              <span>{opt.lable}</span>
            </label>
          ))}
        </div>
        <InputError error={formState.errors.reportType} />
      </div>
      <button type="submit" disabled={formState.isSubmitting} className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300">
        Gerar Relatório
      </button>
    </form>
  );
};

export default ReportCreateForm;
