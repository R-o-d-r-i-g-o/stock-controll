// import { NextRequest } from 'next/server';

// import { createUserSchema } from '@/schemas'
// import * as svc from '@/backend/services'

// const createShoe = async (req: NextRequest) => {
//   try {
//     const payload = await createUserSchema.validate(await req.json(), { abortEarly: false });
//     const shoeId = await svc.createShoe({
//       name: payload.name,
//       email: payload.email,
//       role_id: payload.role_id,
//       password: payload.password,
//     })

//     return Response.json({ shoeId }, { status: 201 });
//   } catch (error) {
//     return Response.json(error, { status: 500 });
//   }
// };

// export { createShoe as POST }