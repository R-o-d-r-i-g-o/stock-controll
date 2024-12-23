import getConfig from "next/config";
import { version } from '@/package.json'

import { pingDatabase } from '@/backend/services'

const setupPing = async () => {
    const { publicRuntimeConfig } = getConfig();
    const modifiedDate = new Date(publicRuntimeConfig.modifiedDate);

    const res = {
        version,
        message: "pong",
        database: await pingDatabase(),
        last_build: modifiedDate
    }

    return Response.json(res, { status: 200 });
}

export { setupPing as GET }