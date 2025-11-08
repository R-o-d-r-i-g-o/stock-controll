"use server";

import itemSvc from "./item.svc";
import auditSvc from "../audit/audit.svc";
import { errorHandler } from "../../common/api.error";
import { validateAuthUserServerAction } from "../../common/api.server-action-auth";
import { OperationType, formSchema, itemCreationSchema, itemUpdateSchema } from "./item.schema";

/**
 * Server Action to get an item by ID
 */
export async function getItemByIdAction(itemId: number) {
  try {
    await validateAuthUserServerAction();

    const item = await itemSvc.getItemBy({ id: itemId });
    return { success: true, data: item };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to create an item
 */
export async function createItemAction(data: unknown) {
  try {
    await validateAuthUserServerAction();

    const payload = await itemCreationSchema.validate(data);
    const itemId = await itemSvc.createItem({
      sku: payload.sku,
      size: payload.size,
      price: payload.price,
      shoeId: payload.shoeId,
    });

    return { success: true, data: { itemId } };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to update an item
 */
export async function updateItemAction(data: unknown) {
  try {
    const user = await validateAuthUserServerAction();

    const result = await itemUpdateSchema.validate(data);

    await itemSvc.updateItem(result);
    await auditSvc.createAuditRecord({
      userId: user.id,
      itemId: result.id,
      companyId: user.companyId,
      note: "O usuário atualizou as informações do item",
    });

    return { success: true, data: null };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to delete an item
 */
export async function deleteItemAction(itemId: number) {
  try {
    const user = await validateAuthUserServerAction();

    await itemSvc.deleteItem(itemId);
    await auditSvc.createAuditRecord({
      userId: user.id,
      itemId: itemId,
      companyId: user.companyId,
      note: "O usuário deletou o item",
    });

    return { success: true, data: null };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to scan items (debit or register)
 */
export async function scanItemAction(data: unknown) {
  try {
    const user = await validateAuthUserServerAction();

    const result = formSchema.safeParse(data);
    if (!result.success) {
      return { success: false, error: result.error.errors[0].message };
    }

    if (result.data.oprationType === OperationType.Debit) {
      await itemSvc.debitItems({ userId: user.id, companyId: user.companyId, skus: result.data.skus });
      await auditSvc.createAuditRecord({
        userId: user.id,
        companyId: user.companyId,
        note: `O usuário debitou os itens: ${result.data.skus.join(", ")}`,
      });
      return { success: true, data: null };
    }

    if (result.data.oprationType === OperationType.Register) {
      await itemSvc.createItems({ userId: user.id, skus: result.data.skus });
      await auditSvc.createAuditRecord({
        userId: user.id,
        companyId: user.companyId,
        note: `O usuário criou os itens: ${result.data.skus.join(", ")}`,
      });
      return { success: true, data: { skus: result.data.skus } };
    }

    return { success: false, error: "Tipo de operação inválido" };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

