# Migração de APIs GET para Server Actions

## Resumo

Este documento descreve a migração das rotas de listagem (GET) de APIs REST para Server Actions do Next.js 15.

## Motivação

- **Melhor performance**: Server Actions executam diretamente no servidor sem overhead de HTTP
- **Código mais limpo**: Eliminação de camadas intermediárias de requisição HTTP
- **Type-safety**: Melhor integração com TypeScript
- **Simplicidade**: Menos código boilerplate

## Mudanças Implementadas

### 1. Helper de Autenticação para Server Actions

**Arquivo criado**: `app/api/_backend/common/api.server-action-auth.ts`

- Criado `validateAuthUserServerAction()` que usa `next-auth` session ao invés de Authorization header
- Substitui `validateAuthUser()` que dependia de `NextRequest`

### 2. Server Actions Criadas

#### Shoes
**Arquivo**: `app/api/_backend/features/shoe/shoe.actions.ts`
- `getShoesGroupedByItemSizePaginatedAction()` - Lista shoes paginada com items agrupados por tamanho
- `getShoeByIdAction()` - Busca shoe específico por ID

#### Users
**Arquivo**: `app/api/_backend/features/user/user.actions.ts`
- `getUsersPaginatedAction()` - Lista usuários paginada
- `getUserByIdAction()` - Busca usuário específico por ID
- `getRoleListAction()` - Lista roles disponíveis

#### Audits
**Arquivo**: `app/api/_backend/features/audit/audit.actions.ts`
- `getAuditsPaginatedAction()` - Lista auditorias paginada

#### Items
**Arquivo**: `app/api/_backend/features/item/item.actions.ts`
- `getItemByIdAction()` - Busca item específico por ID

#### Tags
**Arquivo**: `app/api/_backend/features/tag/tag.actions.ts`
- `getShoeRelatedTagsAction()` - Lista tags relacionadas a um shoe
- `getTagByIdAction()` - Busca tag específica por ID

### 3. Páginas Atualizadas

Todas as páginas de listagem foram atualizadas para usar Server Actions:

- `app/panel/shoes/page.tsx`
- `app/panel/users/page.tsx`
- `app/panel/audits/page.tsx`
- `app/panel/shoes/[shoe_id]/page.tsx`
- `app/panel/users/[user_id]/page.tsx`
- `app/panel/users/create/page.tsx`
- `app/panel/shoes/[shoe_id]/items/[item_id]/page.tsx`
- `app/panel/shoes/[shoe_id]/tags/page.tsx`
- `app/panel/shoes/[shoe_id]/tags/[tag_id]/page.tsx`

### 4. Rotas API Removidas

As seguintes rotas GET foram removidas:

- `DELETE /api/audits/route.ts` (arquivo completo removido)
- `DELETE /api/users/roles/route.ts` (arquivo completo removido)
- `GET /api/shoes` (removido de `app/api/(routes)/shoes/route.ts`)
- `GET /api/users` (removido de `app/api/(routes)/users/route.ts`)
- `GET /api/shoes/[shoe_id]` (removido de `app/api/(routes)/shoes/[shoe_id]/route.ts`)
- `GET /api/users/[user_id]` (removido de `app/api/(routes)/users/[user_id]/route.ts`)
- `GET /api/items/[item_id]` (removido de `app/api/(routes)/items/[item_id]/route.ts`)
- `GET /api/shoes/[shoe_id]/tags` (removido de `app/api/(routes)/shoes/[shoe_id]/tags/route.ts`)
- `GET /api/shoes/[shoe_id]/tags/[tag_id]` (removido de `app/api/(routes)/shoes/[shoe_id]/tags/[tag_id]/route.ts`)

**Nota**: Rotas POST, PUT e DELETE foram mantidas pois ainda são usadas pelos formulários client-side.

### 5. Serviços HTTP Atualizados

Os seguintes arquivos foram atualizados para remover funções GET:

- `lib/services/audit/_req.ts` - Todas as funções removidas (apenas comentário indicando migração)
- `lib/services/user/_req.ts` - Removidas: `fetchUsersPaginated`, `getUserById`, `getRolesList`
- `lib/services/shoe/_req.ts` - Removidas: `getShoesGroupedByItemSizePaginated`, `getShoeById`
- `lib/services/item/_req.ts` - Removida: `getItemById`
- `lib/services/tag/_req.ts` - Removidas: `getShoeRelatedTags`, `getShoeRelatedTag`

**Nota**: Funções POST, PUT e DELETE foram mantidas pois ainda são usadas pelos formulários.

### 6. Correção no Middleware

**Arquivo**: `middleware.ts`
- Corrigido: Adicionado `return` na linha 18 para retornar `NextResponse.next()`

## Padrão de Uso

### Antes (API Route)
```typescript
// Página
import * as svc from "@/lib/services";

const data = await svc.getShoesGroupedByItemSizePaginated(filters);

// Serviço
const getShoesGroupedByItemSizePaginated = async (req) => {
  const res = await api.get("/api/shoes", { params: req });
  return res.data;
};
```

### Depois (Server Action)
```typescript
// Página
import { getShoesGroupedByItemSizePaginatedAction } from "@/app/api/_backend/features/shoe/shoe.actions";

const result = await getShoesGroupedByItemSizePaginatedAction(filters);
if (!result.success) {
  throw new Error(result.error);
}
const data = result.data;

// Server Action
"use server";

export async function getShoesGroupedByItemSizePaginatedAction(params) {
  try {
    await validateAuthUserServerAction();
    const data = await shoeSvc.getShoesGroupedBySizePaginated(params);
    return { success: true, data };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}
```

## Benefícios Obtidos

1. **Eliminação de overhead HTTP**: Chamadas diretas ao serviço sem passar por HTTP
2. **Melhor cache**: Next.js pode otimizar melhor o cache de Server Actions
3. **Menos código**: Eliminação da camada de serviços HTTP para listagens
4. **Melhor DX**: Erros mais claros e debugging mais fácil
5. **Type-safety**: Melhor inferência de tipos do TypeScript

## Operações Ainda Usando API Routes

As seguintes operações ainda usam API Routes pois são chamadas de componentes client-side:

- **POST**: Criação de recursos (shoes, users, items, tags)
- **PUT**: Atualização de recursos
- **DELETE**: Exclusão de recursos
- **POST /api/items/scan**: Operação de scan de items

Estas operações podem ser migradas para Server Actions no futuro se necessário.

## Testes Recomendados

1. Testar todas as páginas de listagem
2. Verificar autenticação em cada página
3. Testar paginação
4. Verificar performance comparada com versão anterior
5. Testar comportamento de erro

## Próximos Passos (Opcional)

1. Migrar operações POST/PUT/DELETE para Server Actions
2. Adicionar testes automatizados para Server Actions
3. Implementar cache strategies específicas para cada Server Action
4. Adicionar logging e monitoring para Server Actions

