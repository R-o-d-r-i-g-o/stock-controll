"use client";

import React, { useEffect, useState } from "react";
import Lottie, { Options } from "react-lottie";

type Props = {
  height: number | string;
  maxWidth: number | string;
  minWidth?: number | string;
  lottie: object; // @ts-ignore
};

const LottieHandler = (p: Props) => {
  const [isClient] = useState(true);
  const [elWidth, setElWidth] = useState(p.maxWidth);

  const formattedHeight = elWidth === p.minWidth ? undefined : p.height;

  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: p.lottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (p.minWidth && window.innerWidth < 880) setElWidth(p.minWidth);
  }, []);

  return isClient && <Lottie options={defaultOptions} height={formattedHeight} width={elWidth} />;
};

export default LottieHandler;
