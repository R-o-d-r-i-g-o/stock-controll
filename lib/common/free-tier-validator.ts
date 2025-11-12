import companySvc from "../features/company/company.svc";
import moment from "moment";

/**
 * Checks if a company is on free tier (free tier not expired)
 * Free tier is active when freeTierExpiresAt exists and is in the future
 */
export async function isCompanyOnFreeTier(companyId: number): Promise<boolean> {
  const company = await companySvc.getCompanyBy({ id: companyId });
  
  if (!company || !company.freeTierExpiresAt) {
    return false;
  }

  const expirationDate = moment(company.freeTierExpiresAt);
  const now = moment();
  
  return expirationDate.isAfter(now);
}

/**
 * Validates if company can perform creation operations
 * Throws error if company is on free tier and free tier has expired
 * Allows creation if company has active subscription
 */
export async function validateFreeTierForCreation(companyId: number): Promise<void> {
  const company = await companySvc.getCompanyBy({ id: companyId });
  
  if (!company) {
    throw new Error("Empresa não encontrada");
  }

  // If company has an active subscription, allow creation
  if (company.subscriptionExpiresAt) {
    const subscriptionExpiration = moment(company.subscriptionExpiresAt);
    const now = moment();
    if (subscriptionExpiration.isAfter(now)) {
      return; // Has active subscription, allow creation
    }
  }

  // Check free tier expiration
  if (company.freeTierExpiresAt) {
    const expirationDate = moment(company.freeTierExpiresAt);
    const now = moment();
    
    if (expirationDate.isBefore(now) || expirationDate.isSame(now)) {
      const daysExpired = now.diff(expirationDate, "days");
      throw new Error(
        `Sua versão gratuita expirou há ${daysExpired} dia(s). Para continuar usando todas as funcionalidades, faça upgrade para o plano pago.`
      );
    }
  } else {
    // No free tier expiration set, assume expired
    throw new Error(
      "Sua versão gratuita expirou. Para continuar usando todas as funcionalidades, faça upgrade para o plano pago."
    );
  }
}
