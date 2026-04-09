"use client";

import { useState } from "react";
import IntroAnimation from "@/component/IntroAnimation";

export default function IntroWrapper({ children }) {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {/* Intro overlay */}
      {!introDone && (
        <IntroAnimation onFinish={() => setIntroDone(true)} />
      )}

      {/* Always render app */}
      {children}
    </>
  );
}