import { prisma } from "../../prisma/prisma.client";
import * as t from "./subscription.types";

type SubscriptionRepository = {
  createSubscription(i: t.CreateSubscriptionInput): t.CreateSubscriptionOutput;
  getSubscriptionsByCompany(i: t.GetSubscriptionsByCompanyInput): t.GetSubscriptionsByCompanyOutput;
};

const subscriptionRepository = {} as SubscriptionRepository;

subscriptionRepository.createSubscription = async (input) => {
  const { id } = await prisma.subscription.create({ data: input });
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
  });
};

export default subscriptionRepository;

