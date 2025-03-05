import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

const Page = async () => {
  const session = await getServerSession();

  const handleRedirect = () => {
    const destiny = session ? "/panel" : "/login";
    redirect(destiny);
  };

  handleRedirect();
  return <></>;
};

export default Page;
