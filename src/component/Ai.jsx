"use client";

import React, { useContext, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { SearchContext } from "@/context/SearchContext";
import ai from "../assets/ai.png";
import { useRouter } from "next/navigation";

function Ai() {
  const { showSearch, setShowSearch } = useContext(SearchContext);
  const navigate = useRouter();

  const [mounted, setMounted] = useState(false);
  const recognitionRef = useRef(null);

  // ✅ Run ONLY on client after hydration
  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();

        recognition.onresult = (e) => {
          const transcript = e.results[0][0].transcript.trim().toLowerCase();

          // 🔍 SEARCH
          if (transcript.includes("open") && transcript.includes("search") && !showSearch) {
            speak("Opening Search Bar");
            setShowSearch(true);
            navigate.push("/");
          }

          // ❌ CLOSE SEARCH
          else if (transcript.includes("close") && transcript.includes("search") && showSearch) {
            speak("Closing Search Bar");
            setShowSearch(false);
            navigate.push("/");
          }

          // 🏠 HOME
          else if (transcript.includes("open") && transcript.includes("home")) {
            speak("Opening Home Page");
            navigate.push("/");
          }

          // 🗂 CATEGORIES
          else if (transcript.includes("open") && transcript.includes("categories")) {
            speak("Opening Categories");
            navigate.push("/category");
          }

          // 🛒 SHOP
          else if (transcript.includes("open") && transcript.includes("shop")) {
            speak("Opening Shop");
            navigate.push("/shop");
          }

          // 📦 ORDERS
          else if (transcript.includes("open") && transcript.includes("order")) {
            speak("Opening Orders");
            navigate.push("/orders");
          }

          // 🛍 CART
          else if (transcript.includes("open") && transcript.includes("cart")) {
            speak("Opening Cart");
            navigate.push("/cart");
          }
          else if (transcript.includes("open") && transcript.includes("support")) {
            speak("Opening Support Page");
            navigate.push("/support");
          }
        };

        recognitionRef.current = recognition;
      }
    }
  }, [showSearch]);

  function speak(message) {
    const utterence = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterence);
  }

  // ❗ Prevent server/client mismatch
  if (!mounted) return null;

  return (
    <div
      className="fixed lg:bottom-[50px] md:bottom-[40px] bottom-[180px] left-[50px] z-[9999]"
      onClick={() => recognitionRef.current?.start()}
    >
      <Image
        src={ai}
        alt="AI"
        width={100}
        height={100}
        className="w-[80px] cursor-pointer"
      />
    </div>
  );
}

export default Ai;
