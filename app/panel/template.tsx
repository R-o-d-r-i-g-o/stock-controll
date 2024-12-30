import { MenuDrawer, InfoButton } from "@/components/ui";

const Template = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 gap-6 p-4">
    <MenuDrawer />
    {children}
    <div className="hidden sm:block">
      <InfoButton />
    </div>
  </div>
);

export default Template;
