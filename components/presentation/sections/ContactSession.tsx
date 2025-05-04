import React from "react";
import LottieHandler from "../ui/lottie-handler";

import mailSent from "@/public/animations/mail-sent.json";

const ContactSession = () => (
  <div id="contact" className="mx-4 md:mx-32 mt-14">
    <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between">
      <div className="md:w-1/2">
        <LottieHandler lottie={mailSent} height={250} maxWidth={250} minWidth={"60%"} />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-2xl md:text-3xl text-white font-bold mb-4 leading-relaxed">Ainda tem alguma dúvida?</h1>
        <p className="text-xs md:text-lg">
          Por favor fale diretamente com nosso suporte. Todo e qualquer outro canal de comunicação não sendo este é considerado golpe.
          <br />
          <br />
          email: contato@marca_passo.com
        </p>
      </div>
    </div>
  </div>
);

export default ContactSession;
