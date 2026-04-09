"use client";

import { useState } from "react";
import IntroAnimation from "@/component/IntroAnimation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && (
        <IntroAnimation onFinish={() => setShowIntro(false)} />
      )}

      {!showIntro && children}
    </>
  );
}