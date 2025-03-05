import { NextRequest } from "next/server";

import {
  OperationType,
  formSchema,
  itemCreationSchema,
  itemUpdateSchema,
} from "./item.schema";
import * as svc from "./item.svc";

import { errorHandler } from "../../common/api.error";
import { validateAuthUser } from "@/common";
import auditSvc from "../audit/audit.svc";

type UserParams = {
  params: Promise<{ item_id: string }>;
};

const createItem = async (req: NextRequest) => {
  try {
    await validateAuthUser(req);

    const payload = await itemCreationSchema.validate(await req.json());
    const itemId = await svc.createItem({
      sku: payload.sku,
      size: payload.size,
      price: payload.price,
      shoeId: payload.shoeId,
    });

    return Response.json({ itemId }, { status: 201 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

const getItemById = async (req: NextRequest, { params }: UserParams) => {
  try {
    await validateAuthUser(req);

    const itemId = parseInt((await params).item_id, 10);
    const item = await svc.getItemBy({ id: itemId });

    return Response.json(item, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

const deleteItem = async (req: NextRequest, { params }: UserParams) => {
  try {
    const user = await validateAuthUser(req);
    const itemId = parseInt((await params).item_id, 10);

    await svc.deleteItem(itemId);
    await auditSvc.createAuditRecord({
      userId: user!.id,
      itemId: itemId,
      note: "O usuário deletou o item",
    });
    return Response.json(null, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

const updateItem = async (req: NextRequest, { params }: UserParams) => {
  try {
    const user = await validateAuthUser(req);

    const payload = {
      ...(await req.json()),
      id: parseInt((await params).item_id, 10),
    };
    const result = await itemUpdateSchema.validate(payload);

    await svc.updateItem(result);
    await auditSvc.createAuditRecord({
      userId: user!.id,
      itemId: result.id,
      note: "O usuário atualizou as informações do item",
    });
    return Response.json(null, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

const scanItem = async (req: NextRequest) => {
  try {
    const user = await validateAuthUser(req);

    const result = formSchema.safeParse(await req.json());
    if (result.error)
      return Response.json({ errors: result.error.errors }, { status: 400 });

    if (result.data.oprationType === OperationType.Debit) {
      await svc.debitItems({ userId: user!.id, skus: result.data.skus });
      await auditSvc.createAuditRecord({
        userId: user!.id,
        note: `O usuário debitou os itens: ${result.data.skus.join(", ")}`,
      });
      return Response.json(null, { status: 200 });
    }

    if (result.data.oprationType === OperationType.Register) {
      await svc.createItems({ userId: user!.id, skus: result.data.skus });
      await auditSvc.createAuditRecord({
        userId: user!.id,
        note: `O usuário criou os itens: ${result.data.skus.join(", ")}`,
      });
      return Response.json({ skus: result.data.skus }, { status: 200 });
    }
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

export { createItem, deleteItem, updateItem, getItemById, scanItem };
