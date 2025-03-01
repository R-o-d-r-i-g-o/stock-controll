import Ping from "@/components/ui/ping";
import Drawer from "@/components/ui/drawer";
import Background from "@/components/templates/background";

type TemplateProps = {
  children: React.ReactNode;
};

const Template = ({ children }: TemplateProps) => (
  <Background className="flex-col gap-6 p-4">
    <Drawer />
    {children}
    <div className="hidden sm:block">
      <Ping />
    </div>
  </Background>
);

export default Template;
