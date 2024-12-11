import { NextRequest } from 'next/server';

import { createUserSchema } from '@/schemas'
import * as svc from '@/backend/services'

const createUser = async (req: NextRequest) => {
    try {
        const payload = await createUserSchema.validate(await req.json(), { abortEarly: false });
        const userID = await svc.createUser(payload)

        return Response.json({ user_id: userID }, { status: 201 });
    } catch (error) {
        return Response.json(error, { status: 500 });
    }
};

export { createUser as POST }