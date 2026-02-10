import "@/styles/globals.scss";
import { Metadata } from "next";
import { Providers } from "../shared/providers";
import { siteConfig } from "@/config/site";
// import { Toaster } from 'react-hot-toast';
// import SupabaseProvider from '@/shared/context/supabase-context' // DESCOMENTAR PARA USAR SUPABASE
// import { AuthContextProvider } from '@/shared/context/auth-context' // DESCOMENTAR PARA USAR AUTH CON SUPABASE
// import { AvailabilityProvider } from "./api/contexts/AvailabilityContext"; // DESCOMENTAR PARA USAR AVAILABILITY CONTEXT

// import Navbar from "@ui/organism/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s -${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="es">
      <head />
      <body>
        {/* <Toaster/>  SE CAMBIÓ POR HEROUI TOAST*/}
        {/* <SupabaseProvider> DESCOMENTAR PARA USAR SUPABASE */}
        {/* <AuthContextProvider> */}
        {/* <AvailabilityProvider> */}
        <Providers
          themeProps={{ attribute: "data-theme", defaultTheme: "light" }}
        >
          {/* <Navbar /> */}
          {children}
        </Providers>
        {/* </AvailabilityProvider> */}
        {/* </AuthContextProvider> */}
        {/* </SupabaseProvider> */}
      </body>
    </html>
  );
}
