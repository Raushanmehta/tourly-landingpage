import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/common/SmoothScroll";
import { ModalProvider } from "@/components/common/ModalContext";
import ContactModal from "@/components/common/ContactModal";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tourly",
  description: "Travel & Tour Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${roboto.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <ModalProvider>
          <SmoothScroll>
            <Topbar />
            <Navbar />
            {children}
            <Footer />
            <ContactModal />
          </SmoothScroll>
        </ModalProvider>
      </body>
    </html>
  );
}
