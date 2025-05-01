import { FC } from "react";
import Script from "next/script";

type AdSenseProps = {
  pId: string;
};

const AdSense: FC<AdSenseProps> = ({ pId }) => <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`} crossOrigin="anonymous" />;

export default AdSense;
