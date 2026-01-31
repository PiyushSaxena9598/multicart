"use client";

import React, { useContext, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { SearchContext } from "@/context/SearchContext";
import ai from "../assets/ai.png";
import { useRouter } from "next/navigation";

function Ai() {
  const { showSearch, setShowSearch } = useContext(SearchContext);
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.toLowerCase().trim();

      console.log("🎤 Command:", transcript);

      

      // 🔍 SEARCH
      if (transcript.includes("search")) {
        speak(showSearch ? "Closing search bar" : "Opening search bar");
        setShowSearch(!showSearch);
        router.push("/category");
      }

      // 🏠 HOME
      else if (transcript.includes("home")) {
        speak("Opening home page");
        router.push("/");
      }

      // 🗂 CATEGORIES
      else if (transcript.includes("category")) {
        speak("Opening categories");
        router.push("/category");
      }

      // 🛒 SHOP
      else if (transcript.includes("shop")) {
        speak("Opening shop");
        router.push("/shop");
      }

      // 📦 ORDERS
      else if (transcript.includes("order")) {
        speak("Opening orders");
        router.push("/orders");
      }

      // 🛍 CART
      else if (transcript.includes("cart")) {
        speak("Opening cart");
        router.push("/cart");
      }

      // 🧑‍💻 SUPPORT
      else if (transcript.includes("support") || transcript.includes("help")) {
        speak("Opening support page");
        router.push("/support");
      }

      // 👤 PROFILE
      else if (
        transcript.includes("profile") ||
        transcript.includes("my profile") ||
        transcript.includes("open profile") ||
        transcript.includes("account")
      ) {
        speak("Opening your profile");
        router.push("/profile"); // 🔁 change path if needed
      }

      // ❌ UNKNOWN
      else {
        speak("Sorry, I didn't understand");
      }
    };

    recognition.onerror = (e) => {
      console.error("Speech error", e);
    };

    recognitionRef.current = recognition;
  }, [showSearch, setShowSearch, router]);

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }

  if (!mounted) return null;

  return (
    <div
      className="
        fixed 
        bottom-[80px]
        left-[20px]

        md:bottom-[40px]
        md:left-[40px]

        lg:bottom-[50px]
        lg:left-[50px]

        z-[9999]
      "
      onClick={() => recognitionRef.current?.start()}
    >
      <Image
        src={ai}
        alt="AI Assistant"
        width={100}
        height={100}
        className="w-[70px] md:w-[75px] lg:w-[80px] cursor-pointer"
        priority
      />
    </div>
  );
}

export default Ai;
