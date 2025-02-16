import { z } from "zod";

const getDateDifferenceInDays = (
  startDate: string,
  endDate: string
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = end.getTime() - start.getTime();
  return timeDiff / (1000 * 3600 * 24); // Note: convet ms into days
};

const getReportSchema = z
  .object({
    startDate: z.string().nonempty("A data inicial é obrigatória"),
    endDate: z.string().nonempty("A data final é obrigatória"),
    reportType: z.enum(["summary", "detailed"], {
      errorMap: () => {
        return { message: "Selecione um tipo de relatório" };
      },
    }),
  })
  .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
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
