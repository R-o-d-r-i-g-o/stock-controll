import { AuditEntity, ItemEntity, UserEntity } from "../../prisma/prisma.entity";

type CreateAuditSvcInput = {
  note: string;
  userId: number;
  itemId?: number;
  companyId: number;
};

type GetAuditsPaginatedSvcInput = {
  page: number;
  size: number;
};

type CreateAuditRecordRepoInput = {
  note: string;
  userId: number;
  itemId?: number;
  companyId: number;
};

type GetAuditsPaginatedRepoInput = {
  skip: number;
  take: number;
};

type GetAuditsPaginatedRepoOutput = Promise<
  (AuditEntity & {
    Item: ItemEntity | null;
    User: UserEntity | null;
  })[]
>;

type GetAuditsPaginatedSvcOutput = Promise<{
  meta: {
    page: number;
    size: number;
    total: number;
  };
  audits: {
    id: number;
    note: string;
    user: string;
    shoeId: number;
    createdAt: Date;
  }[];
}>;

type CreateAuditRecordSvcOutput = Promise<number>;

type CreateAuditRecordRepoOutput = Promise<number>;

type GetAuditsCountRepoOutput = Promise<number>;

export type { CreateAuditSvcInput, GetAuditsCountRepoOutput, CreateAuditRecordSvcOutput, CreateAuditRecordRepoInput, GetAuditsPaginatedSvcInput, GetAuditsPaginatedSvcOutput, GetAuditsPaginatedRepoInput, GetAuditsPaginatedRepoOutput, CreateAuditRecordRepoOutput };
