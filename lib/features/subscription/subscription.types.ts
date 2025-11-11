type CreateSubscriptionInput = {
  companyId: number;
  price: number;
  stripeSessionId?: string | null;
  stripePaymentId?: string | null;
  status?: string;
};

type CreateSubscriptionOutput = Promise<number>;

type GetSubscriptionsByCompanyInput = {
  companyId: number;
};

type SubscriptionEntity = {
  id: number;
  code: string;
  price: number;
  companyId: number;
  createdAt: Date;
};

type GetSubscriptionsByCompanyOutput = Promise<SubscriptionEntity[]>;

export type {
  CreateSubscriptionInput,
  CreateSubscriptionOutput,
  GetSubscriptionsByCompanyInput,
  GetSubscriptionsByCompanyOutput,
  SubscriptionEntity,
};

