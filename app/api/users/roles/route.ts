import * as svc from "@/backend";

// import { validateAuthUser } from "@/common";

const getRoleList = async () => {
  try {
    // await validateAuthUser(req);

    const roles = await svc.getRoleList();
    return Response.json(roles, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
};

export { getRoleList as GET };
