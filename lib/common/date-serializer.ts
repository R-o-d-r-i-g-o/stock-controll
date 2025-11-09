/**
 * Serializa uma data para string ISO
 * Usado para garantir que objetos Date do Prisma sejam serializáveis
 */
export function serializeDate(date: Date | null): string | null {
  if (!date) return null;
  return date.toISOString();
}

/**
 * Serializa múltiplas datas em um objeto
 */
export function serializeDates<T extends Record<string, any>>(obj: T, fields: (keyof T)[]): T {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k,
      fields.includes(k as keyof T) && v instanceof Date ? v.toISOString() : v,
    ])
  ) as T;
}

