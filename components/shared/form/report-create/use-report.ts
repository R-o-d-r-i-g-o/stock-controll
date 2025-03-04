import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { reportCreateSchema, ReportCreateSchema } from "./schema";

const useReportCreateForm = () => {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<ReportCreateSchema>({
    resolver: zodResolver(reportCreateSchema),
  });

  const onSubmit: SubmitHandler<ReportCreateSchema> = (data) => {
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

export default useReportCreateForm;
