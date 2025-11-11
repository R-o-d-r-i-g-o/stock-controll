"use server";

import React from "react";
import moment from "moment";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";

import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import AccountEdit from "@/components/shared/form/account-edit";
import PaymmentTable from "@/components/shared/table/payment";
import Link from "next/link";
import { getCompanyByUserIdAction } from "@/lib/features/company/company.actions";
import { getSubscriptionsByCompanyAction } from "@/lib/features/subscription/subscription.actions";
import { validateAuthUserServerAction } from "@/lib/common/api.server-action-auth";
import userSvc from "@/lib/features/user/user.svc";

const RedirectToPayment = ({ expirationDays = 0 }) => {
  if (expirationDays > 30) return null; // Only show if expiring soon or expired
  
  const warningMessage = expirationDays <= 0 
    ? `Pagar Mensalidade (Vencida)` 
    : `Pagar Mensalidade (Vence em ${expirationDays} dia(s))`;
  
  return (
    <Link href="/panel/account/payment">
      <button className="w-full py-3 px-4 mt-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
        <PaymentIcon className="inline mr-2" />
        {warningMessage}
      </button>
    </Link>
  );
};

const AccountPage = async () => {
  // Get user data
  const user = await validateAuthUserServerAction();
  const userData = await userSvc.getUserBy({ id: user.id });
  
  const companyResult = await getCompanyByUserIdAction();
  const subscriptionsResult = await getSubscriptionsByCompanyAction();

  if (!companyResult.success || !companyResult.data) {
    return (
      <Container>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <Title className="text-center text-3xl mb-6" text="Detalhes da conta" />
          <p className="text-red-500">Erro ao carregar dados da empresa: {companyResult.error || "Empresa não encontrada"}</p>
        </div>
      </Container>
    );
  }

  const company = companyResult.data;
  const subscriptions = subscriptionsResult.success ? subscriptionsResult.data : [];

  // Calculate days until expiration
  let expirationDays = 0;
  if (company.subscriptionExpiresAt) {
    const expirationDate = moment(company.subscriptionExpiresAt);
    const now = moment();
    expirationDays = expirationDate.diff(now, "days");
  }

  const accountData = {
    id: company.id,
    code: company.code,
    name: company.name,
    subscriptionExpiresAt: company.subscriptionExpiresAt ? new Date(company.subscriptionExpiresAt) : null,
  };

  // Format subscriptions for the table
  const paymentData = subscriptions.map((sub) => ({
    id: sub.id,
    code: sub.code,
    price: sub.price,
    date: sub.date,
  }));

  const subscriptionStatus = expirationDays <= 0 
    ? { 
        color: "red", 
        icon: <WarningIcon className="text-red-600" />, 
        text: "Vencida", 
        bg: "bg-red-50", 
        border: "border-red-200",
        iconBg: "bg-red-100",
        textColor: "text-red-700",
        dateColor: "text-red-700"
      }
    : expirationDays <= 7
    ? { 
        color: "orange", 
        icon: <WarningIcon className="text-orange-600" />, 
        text: "Expirando em breve", 
        bg: "bg-orange-50", 
        border: "border-orange-200",
        iconBg: "bg-orange-100",
        textColor: "text-orange-700",
        dateColor: "text-orange-700"
      }
    : { 
        color: "green", 
        icon: <CheckCircleIcon className="text-green-600" />, 
        text: "Ativa", 
        bg: "bg-green-50", 
        border: "border-green-200",
        iconBg: "bg-green-100",
        textColor: "text-green-700",
        dateColor: "text-green-700"
      };

  return (
    <Container>
      <Title className="text-center text-4xl mb-8 font-bold text-gray-800" text="Minha Conta" />
      
      {/* User and Company Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* User Info Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
              <PersonIcon className="text-3xl" />
            </div>
            <h3 className="text-2xl font-bold">Informações do Usuário</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <PersonIcon className="mr-3 text-indigo-200" />
              <div>
                <p className="text-sm text-indigo-200">Nome</p>
                <p className="font-semibold text-lg">{userData.name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <EmailIcon className="mr-3 text-indigo-200" />
              <div>
                <p className="text-sm text-indigo-200">E-mail</p>
                <p className="font-semibold text-lg">{userData.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <BadgeIcon className="mr-3 text-indigo-200" />
              <div>
                <p className="text-sm text-indigo-200">Cargo</p>
                <p className="font-semibold text-lg">{userData.roleName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Company Info Card */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
              <BusinessIcon className="text-3xl" />
            </div>
            <h3 className="text-2xl font-bold">Informações da Empresa</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <BusinessIcon className="mr-3 text-blue-200" />
              <div>
                <p className="text-sm text-blue-200">Nome da Empresa</p>
                <p className="font-semibold text-lg">{company.name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <BadgeIcon className="mr-3 text-blue-200" />
              <div>
                <p className="text-sm text-blue-200">Código</p>
                <p className="font-semibold text-lg font-mono">{company.code}</p>
              </div>
            </div>
            <div className="flex items-center">
              <CalendarTodayIcon className="mr-3 text-blue-200" />
              <div>
                <p className="text-sm text-blue-200">Membro desde</p>
                <p className="font-semibold text-lg">{moment(company.createdAt).format("DD/MM/YYYY")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Status Card */}
      <div className={`mb-6 rounded-xl shadow-lg p-6 border-2 ${subscriptionStatus.bg} ${subscriptionStatus.border}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`${subscriptionStatus.iconBg} rounded-full p-3 mr-4`}>
              {subscriptionStatus.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Status da Mensalidade</h3>
              <p className={`${subscriptionStatus.textColor} font-semibold mt-1`}>
                {subscriptionStatus.text}
              </p>
            </div>
          </div>
          {company.subscriptionExpiresAt && (
            <div className="text-right">
              <p className="text-sm text-gray-600">Válida até</p>
              <p className={`text-lg font-bold ${subscriptionStatus.dateColor}`}>
                {moment(company.subscriptionExpiresAt).format("DD/MM/YYYY")}
              </p>
              {expirationDays > 0 && (
                <p className="text-sm text-gray-500 mt-1">{expirationDays} dias restantes</p>
              )}
            </div>
          )}
        </div>
        <RedirectToPayment expirationDays={expirationDays} />
      </div>

      {/* Company Settings Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="bg-indigo-100 rounded-full p-3 mr-4">
            <BusinessIcon className="text-indigo-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Configurações da Empresa</h2>
        </div>
        <AccountEdit data={accountData} />
      </div>

      {/* Payment History Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <div className="bg-green-100 rounded-full p-3 mr-4">
            <PaymentIcon className="text-green-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Histórico de Pagamentos</h2>
        </div>
        <PaymmentTable data={paymentData} />
      </div>
    </Container>
  );
};

export default AccountPage;
