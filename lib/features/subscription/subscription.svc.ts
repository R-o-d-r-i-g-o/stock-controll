import subscriptionRepo from "./subscription.repo";
import * as t from "./subscription.types";

type SubscriptionService = {
  createSubscription(i: t.CreateSubscriptionInput): t.CreateSubscriptionOutput;
  getSubscriptionsByCompany(i: t.GetSubscriptionsByCompanyInput): Promise<
    Array<{
      id: number;
      code: string;
      price: number;
      date: number;
    }>
  >;
};

const subscriptionService = {} as SubscriptionService;

subscriptionService.createSubscription = async (input) => {
  return subscriptionRepo.createSubscription(input);
};

subscriptionService.getSubscriptionsByCompany = async (input) => {
  const subscriptions = await subscriptionRepo.getSubscriptionsByCompany(input);
  return subscriptions.map((sub) => ({
    id: sub.id,
    code: sub.code,
    price: Number(sub.price),
    date: sub.createdAt.getTime(),
  }));
};

export default subscriptionService;

