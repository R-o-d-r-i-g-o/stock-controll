import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth/next";

export default async function Page() {
  const session = await getServerSession()

  const handleRedirect = () => {
    if (session) {
      redirect('/test')
      return
    }

    redirect('/entrar')
  }

  handleRedirect()
  return <></>
}