type CreateSubscriptionInput = {
  companyId: number;
  price: number;
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

