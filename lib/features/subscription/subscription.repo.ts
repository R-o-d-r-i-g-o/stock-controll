import { prisma } from "../../prisma/prisma.client";
import * as t from "./subscription.types";

type SubscriptionRepository = {
  createSubscription(i: t.CreateSubscriptionInput): t.CreateSubscriptionOutput;
  getSubscriptionsByCompany(i: t.GetSubscriptionsByCompanyInput): t.GetSubscriptionsByCompanyOutput;
};

const subscriptionRepository = {} as SubscriptionRepository;

subscriptionRepository.createSubscription = async (input) => {
  const { id } = await prisma.subscription.create({ 
    data: {
      companyId: input.companyId,
      price: input.price,
      stripeSessionId: input.stripeSessionId || null,
      stripePaymentId: input.stripePaymentId || null,
      status: input.status || "pending",
    }
  });
  return id;
};

subscriptionRepository.getSubscriptionsByCompany = async (input) => {
  return await prisma.subscription.findMany({
    where: {
      companyId: input.companyId,
    },
    orderBy: {
      createdAt: "desc",
    },
  }) as any;
};

export default subscriptionRepository;

