import { MenuDrawer } from '@/components/ui'

const Template = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col-reverse items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 gap-6 p-4">
    {children}
    <MenuDrawer />
  </div>
)

export default Template;