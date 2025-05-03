import data from "./data.json";

import Terms from "@/components/ui/terms";
import NavBar from "@/components/presentation/common/NavBar";
import Background from "@/components/templates/background";

const termsOfUsage = () => (
  <Background>
    <main>
      <NavBar />
      <div className="mt-24 md:32 lg:mt-8 px-4 md:px-60">
        <Terms topicName="Termos de uso" terms={data} />
      </div>
    </main>
  </Background>
);

export default termsOfUsage;
