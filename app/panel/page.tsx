"use server";

import React from "react";
import moment from "moment";
import Container from "@/components/templates/container";
import ShoesItemsChart from "@/components/shared/chart/shoes-items-chart";
import UsersActiveChart from "@/components/shared/chart/users-active-chart";
import AuditsChart from "@/components/shared/chart/audits-chart";
import { getShoesItemsSummaryAction } from "@/lib/features/shoe/shoe.actions";
import { getUsersActiveByDateAction } from "@/lib/features/user/user.actions";
import { getAuditsByDateAction } from "@/lib/features/audit/audit.actions";
import Loader from "@/components/ui/loader";

const HomePage = async () => {
  // Período padrão: últimos 30 dias
  const endDate = moment().format("YYYY-MM-DD");
  const startDate = moment().subtract(30, "days").format("YYYY-MM-DD");

  // Buscar dados dos gráficos em paralelo
  const [shoesDataResult, usersDataResult, auditsDataResult] = await Promise.all([
    getShoesItemsSummaryAction(),
    getUsersActiveByDateAction(startDate, endDate),
    getAuditsByDateAction(startDate, endDate),
  ]);

  const shoesData = shoesDataResult.success ? shoesDataResult.data : [];
  const usersData = usersDataResult.success ? usersDataResult.data : [];
  const auditsData = auditsDataResult.success ? auditsDataResult.data : [];

  return (
    <Container>
      <div className="space-y-8">
        <React.Suspense fallback={<Loader />}>
          <ShoesItemsChart data={shoesData} />
        </React.Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <React.Suspense fallback={<Loader />}>
            <UsersActiveChart initialData={usersData} />
          </React.Suspense>

          <React.Suspense fallback={<Loader />}>
            <AuditsChart initialData={auditsData} />
          </React.Suspense>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
