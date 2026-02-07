import type { Metadata } from "next";

import "./globals.css";
import Ai from "@/component/Ai";
import Provider from "@/Provider";
import StoreProvider from "@/redux/StoreProvider";
import InitUser from "@/InitUser";
import { SearchProvider } from "@/context/SearchContext";




export const metadata: Metadata = {
  title: "Multi-Cart",
  description: "Multi-Vender E-Commerce Website ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen bg-linear-to-b from-black"> 
       <SearchProvider>
       <Provider>
        <StoreProvider>
          <InitUser/>
        {children}
        <Ai/>
        </StoreProvider>
        </Provider>
       </SearchProvider>
       <script 
  src="https://supportai-navy.vercel.app/chatBot.js" 
  data-owner-id="usr_111269628986000404">
</script>
      </body>
    </html>
  );
}
