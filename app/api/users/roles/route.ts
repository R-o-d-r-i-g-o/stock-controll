import * as svc from '@/backend/services'

const getRoleList = async () => {
    try {
        const list = await svc.getRoleList()
        return Response.json(list, { status: 200 });
    } catch (error) {
        return Response.json(error, { status: 500 });
    }
}

export { getRoleList as GET }