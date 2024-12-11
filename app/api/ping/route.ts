import { NextRequest } from 'next/server';
import { version } from '@/package.json'

const setupPing = async (req: NextRequest) => {
    const res = {
        version,
        message: "pong"
    }

    return Response.json(res, { status: 201 });
}

export { setupPing as GET }