# Configuração do Stripe

## Variáveis de Ambiente Necessárias

Adicione as seguintes variáveis de ambiente no seu arquivo `.env`:

```env
# Stripe Secret Key (obtenha em https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_...

# Stripe Publishable Key (obtenha em https://dashboard.stripe.com/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Stripe Webhook Secret (obtenha após configurar o webhook)
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Configuração do Webhook

1. Acesse o [Dashboard do Stripe](https://dashboard.stripe.com/webhooks)
2. Clique em "Add endpoint"
3. Configure a URL do webhook: `https://seu-dominio.com/api/stripe/webhook`
4. Selecione os eventos a serem ouvidos:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copie o "Signing secret" e adicione como `STRIPE_WEBHOOK_SECRET`

## Testando Pagamentos

Use os cartões de teste do Stripe:

- **Sucesso**: `4242 4242 4242 4242`
- **Falha**: `4000 0000 0000 0002`
- Use qualquer data futura para expiração
- Use qualquer CVC de 3 dígitos

## Preço da Mensalidade

O valor padrão está configurado como **R$ 99,90** (9990 centavos).

Para alterar, edite a constante `MONTHLY_PRICE_CENTS` em:
`app/api/stripe/create-checkout/route.ts`

## Fluxo de Pagamento

1. Usuário clica em "Pagar Mensalidade" na página de conta
2. É redirecionado para a página de pagamento
3. Clica em "Pagar com Stripe"
4. É redirecionado para o checkout do Stripe
5. Após pagamento bem-sucedido, retorna para página de sucesso
6. O webhook processa o pagamento e atualiza a assinatura

