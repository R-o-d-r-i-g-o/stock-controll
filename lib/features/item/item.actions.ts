"use server";

import itemSvc from "./item.svc";
import auditSvc from "../audit/audit.svc";
import { actionHandler } from "../../common/action-handler";
import { validateAuthUserServerAction } from "../../common/api.server-action-auth";
import { OperationType, scanItemSchema, itemCreationSchema, itemUpdateSchema } from "./item.schema";

/**
 * Server Action to get an item by ID
 */
export async function getItemByIdAction(itemId: number) {
  return actionHandler(async () => {
    await validateAuthUserServerAction();
    return await itemSvc.getItemBy({ id: itemId });
  });
}

/**
 * Server Action to create an item
 */
export async function createItemAction(data: unknown) {
  return actionHandler(async () => {
    await validateAuthUserServerAction();

    const payload = itemCreationSchema.parse(data);
    const itemId = await itemSvc.createItem({
      sku: payload.sku,
      size: payload.size,
      price: payload.price,
      shoeId: payload.shoeId,
    });

    return { itemId };
  });
}

/**
 * Server Action to update an item
 */
export async function updateItemAction(data: unknown) {
  return actionHandler(async () => {
    const user = await validateAuthUserServerAction();
    const payload = itemUpdateSchema.parse(data);

    await itemSvc.updateItem(payload);
    await auditSvc.createAuditRecord({
      userId: user.id,
      itemId: payload.id,
      companyId: user.companyId,
      note: "O usuário atualizou as informações do item",
    });

    return null;
  });
}

/**
 * Server Action to delete an item
 */
export async function deleteItemAction(itemId: number) {
  return actionHandler(async () => {
    const user = await validateAuthUserServerAction();

    await itemSvc.deleteItem(itemId);
    await auditSvc.createAuditRecord({
      userId: user.id,
      itemId: itemId,
      companyId: user.companyId,
      note: "O usuário deletou o item",
    });

    return null;
  });
}

/**
 * Server Action to scan items (debit or register)
 */
export async function scanItemAction(data: unknown) {
  return actionHandler(async () => {
    const user = await validateAuthUserServerAction();
    const payload = scanItemSchema.parse(data);

    if (payload.oprationType === OperationType.Debit) {
      await itemSvc.debitItems({ 
        userId: user.id, 
        companyId: user.companyId, 
        skus: payload.skus 
      });
      await auditSvc.createAuditRecord({
        userId: user.id,
        companyId: user.companyId,
        note: `O usuário debitou os itens: ${payload.skus.join(", ")}`,
      });
      return null;
    }

    if (payload.oprationType === OperationType.Register) {
      await itemSvc.createItems({ userId: user.id, skus: payload.skus });
      await auditSvc.createAuditRecord({
        userId: user.id,
        companyId: user.companyId,
        note: `O usuário criou os itens: ${payload.skus.join(", ")}`,
      });
      return { skus: payload.skus };
    }

    throw new Error("Tipo de operação inválido");
  });
}

