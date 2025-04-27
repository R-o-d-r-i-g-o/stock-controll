import { redirect } from "next/navigation";
import { auth } from "@/app/api/_backend/features/auth/auth.handler"; //TODO: improve it later.

const Page = async () => {
  const session = await auth.auth();

  const handleRedirect = () => {
    const destiny = session ? "/panel" : "/login";
    redirect(destiny);
  };

  handleRedirect();
  return <></>;
};

export default Page;
