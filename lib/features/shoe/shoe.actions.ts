"use server";

import shoeSvc from "./shoe.svc";
import auditSvc from "../audit/audit.svc";
import { errorHandler } from "../../common/api.error";
import { validateAuthUserServerAction } from "../../common/api.server-action-auth";
import { createShoeSchema, updateShoeSchema } from "./shoe.schema";

/**
 * Server Action to get shoes grouped by item size with pagination
 */
export async function getShoesGroupedByItemSizePaginatedAction(params: { page: number; size: number }) {
  try {
    await validateAuthUserServerAction();

    const payload = {
      page: params.page,
      size: params.size,
    };

    const groupedItems = await shoeSvc.getShoesGroupedBySizePaginated(payload);
    return { success: true, data: groupedItems };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to get a specific shoe by ID
 */
export async function getShoeByIdAction(id: number) {
  try {
    await validateAuthUserServerAction();

    const shoe = await shoeSvc.getShoeBy({ id });
    return { success: true, data: shoe };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to create a new shoe
 */
export async function createShoeAction(data: unknown) {
  try {
    const user = await validateAuthUserServerAction();

    const result = createShoeSchema.safeParse(data);
    if (!result.success) {
      return { success: false, error: result.error.errors[0].message };
    }

    const shoeId = await shoeSvc.createShoe({ ...result.data, companyId: user.companyId });
    await auditSvc.createAuditRecord({
      userId: user.id,
      companyId: user.companyId,
      note: `O usuário cadastrou um novo calçado (#${shoeId})`,
    });

    return { success: true, data: { shoeId } };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to update a shoe
 */
export async function updateShoeAction(data: unknown) {
  try {
    const user = await validateAuthUserServerAction();

    const result = updateShoeSchema.safeParse(data);
    if (!result.success) {
      return { success: false, error: result.error.errors[0].message };
    }

    await shoeSvc.updateShoe(result.data);
    await auditSvc.createAuditRecord({
      userId: user.id,
      companyId: user.companyId,
      note: `O usuário editou as informações do calçado #${result.data.id}`,
    });

    return { success: true, data: null };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to delete a shoe
 */
export async function deleteShoeAction(id: number) {
  try {
    const user = await validateAuthUserServerAction();

    await shoeSvc.deleteShoe(id);
    await auditSvc.createAuditRecord({
      userId: user.id,
      companyId: user.companyId,
      note: `O usuário deletou o calçado #${id}`,
    });

    return { success: true, data: null };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

