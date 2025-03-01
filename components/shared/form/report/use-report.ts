import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { reportSchema, ReportSchema } from "./schema";

import { useRouter } from "next/navigation";

const useReport = () => {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<ReportSchema>({
    resolver: zodResolver(reportSchema),
  });

  const onSubmit: SubmitHandler<ReportSchema> = (data) => {
    const { startDate, endDate, reportType } = data;

    const searchParams = new URLSearchParams({
      reportType: reportType.toString(),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
    router.push(`/api/reports?${searchParams.toString()}`);
  };

  return {
    register,
    formState,
    handleSubmit,
    onSubmit,
  };
};

export default useReport;
