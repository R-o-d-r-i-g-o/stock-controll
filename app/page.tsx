import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth/next";
import { NavigationPage } from '@/common';

export default async function Page() {
  const { Login, Dash } = NavigationPage
  const session = await getServerSession()

  const handleRedirect = () => {
    if (session) {
      redirect(Dash)
      return
    }

    redirect(Login)
  }

  handleRedirect()
  return <></>
}