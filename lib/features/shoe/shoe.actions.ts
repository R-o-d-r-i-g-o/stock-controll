"use server";

import shoeSvc from "./shoe.svc";
import auditSvc from "../audit/audit.svc";
import { actionHandler } from "../../common/action-handler";
import { validateAuthUserServerAction } from "../../common/api.server-action-auth";
import { createShoeSchema, updateShoeSchema } from "./shoe.schema";

/**
 * Server Action to get shoes grouped by item size with pagination
 */
export async function getShoesGroupedByItemSizePaginatedAction(params: { page: number; size: number }) {
  return actionHandler(async () => {
    await validateAuthUserServerAction();
    return await shoeSvc.getShoesGroupedBySizePaginated(params);
  });
}

/**
 * Server Action to get a specific shoe by ID
 */
export async function getShoeByIdAction(id: number) {
  return actionHandler(async () => {
    await validateAuthUserServerAction();
    return await shoeSvc.getShoeBy({ id });
  });
}

/**
 * Server Action to create a new shoe
 */
export async function createShoeAction(data: unknown) {
  return actionHandler(async () => {
    const user = await validateAuthUserServerAction();
    const payload = createShoeSchema.parse(data);

    const shoeId = await shoeSvc.createShoe({ ...payload, companyId: user.companyId });
    await auditSvc.createAuditRecord({
      userId: user.id,
      companyId: user.companyId,
      note: `O usuário cadastrou um novo calçado (#${shoeId})`,
    });

    return { shoeId };
  });
}

/**
 * Server Action to update a shoe
 */
export async function updateShoeAction(data: unknown) {
  return actionHandler(async () => {
    const user = await validateAuthUserServerAction();
    const payload = updateShoeSchema.parse(data);

    await shoeSvc.updateShoe(payload);
    await auditSvc.createAuditRecord({
      userId: user.id,
      companyId: user.companyId,
      note: `O usuário editou as informações do calçado #${payload.id}`,
    });

    return null;
  });
}

/**
 * Server Action to delete a shoe
 */
export async function deleteShoeAction(id: number) {
  return actionHandler(async () => {
    const user = await validateAuthUserServerAction();

    await shoeSvc.deleteShoe(id);
    await auditSvc.createAuditRecord({
      userId: user.id,
      companyId: user.companyId,
      note: `O usuário deletou o calçado #${id}`,
    });

    return null;
  });
}

/**
 * Server Action to get shoes with items count summary (optimized for charts)
 */
export async function getShoesItemsSummaryAction() {
  return actionHandler(async () => {
    const user = await validateAuthUserServerAction();
    return await shoeSvc.getShoesItemsSummary(user.companyId);
  });
}

