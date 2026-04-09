"use client";

import { useState } from "react";
import IntroAnimation from "@/component/IntroAnimation";
import { Props } from "recharts/types/shape/Dot";

export default function IntroWrapper({ children }: Props) {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && (
        <IntroAnimation onFinish={() => setIntroDone(true)} />
      )}

      {introDone && children}
    </>
  );
}