import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { NavigationPage } from "@/common";

const Page = async () => {
  const { Login, Home } = NavigationPage;
  const session = await getServerSession();

  const handleRedirect = () => {
    const destiny = session ? Home : Login;
    redirect(destiny);
  };

  handleRedirect();
  return <></>;
};

export default Page;
