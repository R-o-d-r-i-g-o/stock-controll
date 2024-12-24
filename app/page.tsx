// import { redirect } from 'next/navigation'
// import { getServerSession } from "next-auth/next";
// import { NavigationPage } from '@/common';

import PwaComponent from '@/components/pwa'

const Page = async () => {
  // const { Login, Home } = NavigationPage
  // const session = await getServerSession()

  // const handleRedirect = () => {
  //   if (session) {
  //     redirect(Home)
  //     return
  //   }

  //   redirect(Login)
  // }

  // handleRedirect()
  return <PwaComponent />
}

export default Page;