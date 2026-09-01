import "@/styles/globals.scss";
import { Providers } from "../shared/providers";
import { buildMetadata, viewport as seoViewport } from "@/lib/seo";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
// import { Toaster } from 'react-hot-toast';
// import SupabaseProvider from '@/shared/context/supabase-context' // DESCOMENTAR PARA USAR SUPABASE
// import { AuthContextProvider } from '@/shared/context/auth-context' // DESCOMENTAR PARA USAR AUTH CON SUPABASE
// import { AvailabilityProvider } from "./api/contexts/AvailabilityContext"; // DESCOMENTAR PARA USAR AVAILABILITY CONTEXT

// import Navbar from "@ui/organism/navbar";

/** ID de analítica de Google. Acepta GA4 ("G-…") o Google Tag Manager
 *  ("GTM-…"); el prefijo decide qué componente se carga. Se configura en
 *  `.env.local` (`NEXT_PUBLIC_GA_ID`); si está vacío, no se carga nada. */
const analyticsId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata = buildMetadata();
export const viewport = seoViewport;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="es">
      <head />
      <body>
        {/* Analítica de Google: GTM si el ID empieza por "GTM-", si no GA4.
            Se carga alto en el <body> para no perder eventos iniciales. */}
        {analyticsId?.startsWith("GTM-") ? (
          <GoogleTagManager gtmId={analyticsId} />
        ) : analyticsId ? (
          <GoogleAnalytics gaId={analyticsId} />
        ) : null}
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
