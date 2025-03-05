import { ReportType } from "@/common";
import { z } from "zod";

const getDateDifferenceInDays = (startDate: Date, endDate: Date): number => {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return timeDiff / (1000 * 3600 * 24); // Note: convet ms into days
};

const setEndOfDay = (date: Date): Date => {
  date.setHours(23, 59, 59, 999);
  return date;
};

const getReportSchema = z
  .object({
    startDate: z
      .string()
      .nonempty("A data inicial é obrigatória")
      .transform((val) => new Date(val)),

    endDate: z
      .string()
      .nonempty("A data final é obrigatória")
      .transform((val) => {
        const endDate = new Date(val);
        return setEndOfDay(endDate);
      }),

    reportType: z.nativeEnum(ReportType, {
      errorMap: () => {
        return { message: "Selecione um tipo de relatório" };
      },
    }),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "A data final não pode ser anterior à data inicial",
    path: ["endDate"],
  })
  .refine(
    (data) => getDateDifferenceInDays(data.startDate, data.endDate) <= 30,
    {
      message: "O intervalo entre as datas não pode ser superior a 30 dias",
      path: ["endDate"],
    }
  );

export { getReportSchema };
