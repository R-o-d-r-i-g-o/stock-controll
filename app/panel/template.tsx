import Ping from "@/components/ui/ping";
import Drawer from "@/components/ui/drawer";

type TemplateProps = {
  children: React.ReactNode;
};

const Template = ({ children }: TemplateProps) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 gap-6 p-4">
    <Drawer />
    {children}
    <div className="hidden sm:block">
      <Ping />
    </div>
  </div>
);

export default Template;
