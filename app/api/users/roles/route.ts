import * as svc from "@/backend";

const getRoleList = async () => {
  try {
    const roles = await svc.getRoleList();
    return Response.json(roles, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

export { getRoleList as GET };
