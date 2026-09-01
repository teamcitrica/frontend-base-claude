"use client";

import { Header } from "citrica-ui-toolkit";

import Hero from "./home/components/hero";
import PruebaSocial from "./home/components/prueba-social";
import Problema from "./home/components/problema";
import Sistema from "./home/components/sistema";
import Solucion from "./home/components/solucion";
import Metodo from "./home/components/metodo";
import Resultados from "./home/components/resultados";
import Confianza from "./home/components/confianza";
import Garantia from "./home/components/garantia";
import Agenda from "./home/components/agenda";
import SiteFooter from "./home/components/site-footer";
import { scrollToSection } from "./home/components/scroll-to";

import { siteConfig } from "@/config/site";

// ============================================================
// Landing de conversión ImPulso — SPEC-0001
//
// Diez secciones ancladas. Un solo evento de conversión: todo CTA
// primario baja a #agenda.
//
// El hero es el único bloque carbón: un segundo le restaría fuerza.
// La única sección numerada es #metodo, porque ahí el orden informa.
// Métricas y testimonio van marcados ILUSTRATIVO — sustituirlos por
// datos reales es requisito para publicar.
// ============================================================

const HomePage = () => (
  <div className="impulso home">
    <Header
      showButton
      buttonText="Agenda tu estudio"
      logo={
        // El `Header` del toolkit, sin prop `logo`, pinta un placeholder que
        // dice "Matour" en blanco sobre el header blanco — se ve roto.
        // SVG local: `next/image` no optimiza SVG y pediría dangerouslyAllowSVG.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt="ImPulso"
          className="h-9 w-auto"
          height={68}
          src="/img/logo-impulso.svg"
          width={175}
        />
      }
      navItems={siteConfig.impulsoNavLinks}
      variant="basic"
      onButtonClick={() => scrollToSection("agenda")}
    />

    <main>
      <Hero />
      <PruebaSocial />
      <Problema />
      <Sistema />
      <Solucion />
      <Metodo />
      <Resultados />
      <Confianza />
      <Garantia />
      <Agenda />
    </main>

    <SiteFooter />
  </div>
);

export default HomePage;
