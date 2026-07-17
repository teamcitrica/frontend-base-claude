"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Button,
  Col,
  Container,
  Icon,
  Input,
  Select,
  Text,
  Textarea,
  Header,
} from "citrica-ui-toolkit";
import { addToast } from "@heroui/toast";

import { siteConfig } from "@/config/site";
import S3Video from "@/shared/project-components/s3-video";

// ============================================================
// ImPULSO — Growth & Content Agency (sector gastronómico)
// Landing de conversión. Objetivo único: agendar el estudio gratuito.
// Paleta y tipografía de marca via `.impulso` (styles/webpages-styles).
// Anton = titulares (mayúsculas, ≥24px); Lato = todo lo demás. Las fuentes se
// cargan y definen en styles/01-settings/settings.scss (slots font-family-a/b).
// Solo variables de token en el JSX; los hex viven en el SCSS.
// NOTA: métricas y testimonio son ilustrativos — reemplazar por datos reales
// de cliente antes de publicar (marcados con // ILUSTRATIVO).
// ============================================================

// ILUSTRATIVO — swap for verified client numbers.
const METRICS = [
  { num: "+180%", label: "reservas en 3 meses" },
  { num: "×3", label: "mesas llenas entre semana" },
  { num: "−40%", label: "costo por reserva" },
];

const PAINS = [
  {
    icon: "CircleDollarSign",
    title: "Metes plata y no sabes si vuelve.",
    desc: "Inviertes en fotos, videos y pauta digital, y a fin de mes solo puedes decir “creo que funcionó”.",
  },
  {
    icon: "MessageCircle",
    title: "Cada WhatsApp sin responder es una reserva perdida.",
    desc: "Un mensaje que no contestas a tiempo es un comensal que se va a otro restaurante — sin que te enteres.",
  },
  {
    icon: "Scissors",
    title: "No sabes qué cortar ni qué duplicar.",
    desc: "Sin visibilidad real del retorno, cada decisión de inversión es una apuesta a ciegas.",
  },
] as const;

const STEPS = [
  {
    icon: "Search",
    title: "Diagnóstico de visibilidad",
    desc: "Analizamos cómo te encuentra hoy un comensal nuevo en Google y detectamos dónde se te escapan reservas.",
  },
  {
    icon: "MapPin",
    title: "Posicionamiento local",
    desc: "Optimizamos tu perfil para aparecer primero cuando alguien busca dónde comer en tu zona, justo con hambre.",
  },
  {
    icon: "Megaphone",
    title: "Adquisición de comensales",
    desc: "Campañas en Meta y Google Ads enfocadas en conversión real, más colaboraciones con perfiles gastronómicos.",
  },
  {
    icon: "LineChart",
    title: "Optimización semanal",
    desc: "Medimos cada 7 días. Si algo no rinde, lo ajustamos de inmediato. Transparencia total sobre tu inversión.",
  },
] as const;

const OUTCOMES = [
  {
    icon: "TrendingUp",
    title: "Flujo constante",
    desc: "Un sistema que atrae y fideliza comensales mes a mes — de forma predecible, no por suerte.",
  },
  {
    icon: "Eye",
    title: "Claridad total",
    desc: "Sabes exactamente cuánto te genera cada sol invertido, sin suposiciones ni cajas negras.",
  },
  {
    icon: "BellRing",
    title: "Un equipo encima",
    desc: "Te avisamos y ajustamos las campañas antes de que tengas que preguntar.",
  },
] as const;

const CIUDADES = [
  { value: "lima-centro", label: "Lima (Centro)" },
  { value: "miraflores", label: "Miraflores" },
  { value: "san-isidro", label: "San Isidro" },
  { value: "barranco", label: "Barranco" },
  { value: "surco", label: "Santiago de Surco" },
  { value: "la-molina", label: "La Molina" },
  { value: "provincia", label: "Otra ciudad / provincia" },
];

// Fotografía real (Unsplash). next/image sirve una URL optimizada; si la imagen
// falla, cae al bloque de marca naranja/carbón sin romper la maqueta.
const IMG = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const ImImage = ({
  imgId,
  alt,
  ratio,
  overlay = false,
  round = false,
  priority = false,
  w = 1200,
  sizes = "(max-width: 1190px) 100vw, 50vw",
}: {
  imgId: string;
  alt: string;
  ratio: "r45" | "r43" | "r11";
  overlay?: boolean;
  round?: boolean;
  priority?: boolean;
  w?: number;
  sizes?: string;
}) => {
  const [ok, setOk] = useState(true);

  return (
    <div
      className={`impulso__img impulso__img--${ratio} ${overlay ? "impulso__img--overlay" : ""} ${round ? "impulso__img-round" : ""}`}
    >
      {ok ? (
        <Image
          fill
          alt={alt}
          priority={priority}
          sizes={sizes}
          src={IMG(imgId, w)}
          style={{ objectFit: "cover" }}
          onError={() => setOk(false)}
        />
      ) : (
        <div aria-hidden className="impulso__img-fallback">
          <span>ImPulso</span>
        </div>
      )}
    </div>
  );
};

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);

  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

type Wordmark = { light?: boolean; size?: number };
const Wordmark = ({ light = false, size = 22 }: Wordmark) => (
  <span
    className={`impulso__wordmark ${light ? "impulso__wordmark--light" : ""}`}
    style={{ fontSize: size }}
  >
    Im<span className="im-p">Pulso</span>
  </span>
);

const PageImpulso = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    nombre: "",
    restaurante: "",
    email: "",
    whatsapp: "",
    ciudad: "",
    mensaje: "",
  });

  // Reveal + entrada del hero. El estado oculto SOLO se activa aquí (data-anim),
  // así SSR / no-JS / headless nunca quedan en blanco.
  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    root.setAttribute("data-anim", "on");
    const ready = requestAnimationFrame(() => root.classList.add("is-ready"));

    const els = root.querySelectorAll(".impulso__reveal");
    let obs: IntersectionObserver | null = null;

    if ("IntersectionObserver" in window && els.length) {
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              obs?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
      );
      els.forEach((el) => obs?.observe(el));
    } else {
      els.forEach((el) => el.classList.add("is-visible"));
    }

    // Safety net: reveal is an enhancement, never a visibility gate. Anything
    // the observer hasn't triggered (no scroll, hidden tab, headless render)
    // becomes visible anyway, so no section can ever ship blank.
    const safety = window.setTimeout(() => {
      root
        .querySelectorAll(".impulso__reveal:not(.is-visible)")
        .forEach((el) => el.classList.add("is-visible"));
    }, 1200);

    return () => {
      cancelAnimationFrame(ready);
      window.clearTimeout(safety);
      obs?.disconnect();
    };
  }, []);

  const submit = () => {
    const { nombre, restaurante, email, whatsapp } = form;

    if (
      !nombre.trim() ||
      !restaurante.trim() ||
      !email.trim() ||
      !whatsapp.trim()
    ) {
      addToast({
        title: "Faltan datos",
        description:
          "Completa nombre, restaurante, email y WhatsApp para continuar.",
        color: "warning",
      });

      return;
    }
    if (!emailOk(email)) {
      addToast({
        title: "Revisa tu correo",
        description: "El formato del email no parece válido.",
        color: "danger",
      });

      return;
    }
    addToast({
      title: "¡Listo!",
      description: `Gracias ${nombre.split(" ")[0]}. Te contactamos esta semana para agendar tu estudio gratuito.`,
      color: "success",
    });
    setForm({
      nombre: "",
      restaurante: "",
      email: "",
      whatsapp: "",
      ciudad: "",
      mensaje: "",
    });
  };

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div ref={rootRef} className="impulso">
      {/* Header del toolkit (variant `basic`): logo izquierda, nav + CTA a la
          derecha, sólido con sombra al scroll. Los colores de marca los hereda
          del scope `.impulso` (--color-primary = naranja, etc.). */}
      <Header
        showButton
        buttonText="Agenda tu estudio"
        logo={<Wordmark size={26} />}
        navItems={siteConfig.impulsoNavLinks}
        variant="basic"
        onButtonClick={() => scrollToSection("agenda")}
      />

      {/* ===================== HERO ===================== */}
      <section className="impulso__hero" id="hero">
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 7 }}>
            <div
              className="flex flex-col items-start"
              style={{ maxWidth: 620 }}
            >
              <div
                className="impulso__eyebrow-row impulso__hero-in mb-6"
                style={{ ["--i" as any]: 0 }}
              >
                <span className="impulso__rule" />
                <span className="impulso__eyebrow">
                  Agencia de marketing gastronómico
                </span>
              </div>

              <Text
                as="h1"
                className="impulso__hero-in"
                color="var(--color-text-black)"
                style={{ ["--i" as any]: 1 }}
                variant="display"
              >
                Llena <span className="impulso__accent">mesas</span> con{" "}
                <span className="impulso__mark">datos</span>, no con suerte.
              </Text>

              <div className="impulso__hero-in" style={{ ["--i" as any]: 2 }}>
                <Text
                  as="p"
                  className="mt-6"
                  color="var(--color-on-surface-var)"
                  variant="body"
                >
                  <span
                    style={{
                      display: "block",
                      maxWidth: 520,
                      fontSize: 18,
                      lineHeight: 1.6,
                    }}
                  >
                    Marketing y contenido para restaurantes de ticket medio y
                    alto que quieren crecer de forma constante — y por fin saber
                    qué campaña les trae comensales.
                  </span>
                </Text>
              </div>

              <div
                className="impulso__hero-in mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
                style={{ ["--i" as any]: 3 }}
              >
                <Button
                  label="Agenda tu estudio gratuito"
                  variant="primary"
                  onPress={() => scrollToSection("agenda")}
                />
                <Button
                  label="Cómo funciona"
                  variant="secondary"
                  onPress={() => scrollToSection("metodo")}
                />
              </div>
            </div>
          </Col>

          <Col cols={{ sm: 4, md: 6, lg: 5 }}>
            <div
              className="impulso__hero-in mt-10 lg:mt-0"
              style={{ ["--i" as any]: 2 }}
            >
              <div className="impulso__hero-photo">
                <div className="impulso__img impulso__img--r45 impulso__img--overlay">
                  <S3Video
                    autoPlay
                    fill
                    loop
                    muted
                    controls={false}
                    videoKey="parkano/Stories 2024_Garbanzos_Freidoras de Aire Oster.mp4"
                  />
                </div>
                <div className="impulso__hero-badge">
                  <span className="im-num">+180%</span>
                  <Text
                    as="p"
                    className="mt-1"
                    color="var(--color-surface)"
                    variant="label"
                  >
                    reservas en 3 meses{/* ILUSTRATIVO */}
                  </Text>
                </div>
              </div>
            </div>
          </Col>
        </Container>
      </section>

      {/* ===================== PRUEBA SOCIAL (strip) ===================== */}
      <section
        className="impulso__section impulso__section--carbon"
        style={{ paddingTop: 48, paddingBottom: 48 }}
      >
        <Container>
          {METRICS.map((m) => (
            <Col key={m.label} cols={{ sm: 4, md: 2, lg: 4 }}>
              <div className="impulso__reveal text-center md:text-left py-3">
                <span className="impulso__metric-num">{m.num}</span>
                <Text
                  as="p"
                  className="mt-2"
                  color="var(--color-outline)"
                  variant="body"
                >
                  {m.label}
                </Text>
              </div>
            </Col>
          ))}
        </Container>
      </section>

      {/* ===================== EL PROBLEMA ===================== */}
      <section
        className="impulso__section impulso__section--warm"
        id="problema"
      >
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 5 }}>
            <div className="impulso__reveal lg:pr-6">
              <ImImage
                alt="Mesa de restaurante servida con un plato de autor, copas de vino y ambiente cálido"
                imgId="1414235077428-338989a2e8c0"
                ratio="r43"
                sizes="(max-width: 1190px) 100vw, 42vw"
              />
            </div>
          </Col>
          <Col cols={{ sm: 4, md: 6, lg: 7 }}>
            <div className="impulso__reveal lg:pl-4">
              <span className="impulso__eyebrow">El problema</span>
              <Text
                as="h2"
                className="mt-3"
                color="var(--color-text-black)"
                variant="headline"
              >
                ¿Tu marketing es una caja negra?
              </Text>
              <div className="mt-6">
                {PAINS.map((p) => (
                  <div key={p.title} className="impulso__pain">
                    <span className="impulso__pain-ico">
                      <Icon
                        color="var(--color-flat-btn-text)"
                        name={p.icon}
                        size={22}
                      />
                    </span>
                    <div>
                      <Text
                        as="p"
                        color="var(--color-text-black)"
                        variant="body"
                        weight="bold"
                      >
                        {p.title}
                      </Text>
                      <Text
                        as="p"
                        className="mt-1"
                        color="var(--color-on-surface-var)"
                        variant="body"
                      >
                        {p.desc}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Container>
      </section>

      {/* ===================== LA SOLUCIÓN ===================== */}
      <section className="impulso__section impulso__section--white">
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            <div className="impulso__reveal" style={{ maxWidth: 860 }}>
              <span className="impulso__eyebrow">La solución</span>
              <Text
                as="h2"
                className="mt-3"
                color="var(--color-text-black)"
                variant="headline"
              >
                El marketing no es presencia. Es{" "}
                <span className="impulso__accent">flujo de comensales</span>.
              </Text>
              <Text
                as="p"
                className="mt-6"
                color="var(--color-on-surface)"
                variant="body"
              >
                <span
                  style={{
                    display: "block",
                    maxWidth: 720,
                    fontSize: 18,
                    lineHeight: 1.65,
                  }}
                >
                  Cada campaña responde una sola pregunta:{" "}
                  <b>¿cuánta gente nueva trajo a tu local?</b> Si no lo puedes
                  responder, no es marketing — es gasto. Por eso no empezamos
                  metiendo plata en anuncios: empezamos auditando cómo te
                  encuentra hoy un comensal nuevo, y dónde estás perdiendo
                  reservas sin darte cuenta.
                </span>
              </Text>
            </div>
          </Col>
        </Container>
      </section>

      {/* ===================== MÉTODO (Sistema Mesa Activa) ===================== */}
      <section
        className="impulso__section impulso__section--carbon"
        id="metodo"
      >
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            <div className="impulso__reveal" style={{ maxWidth: 720 }}>
              <span className="impulso__eyebrow">Cómo funciona</span>
              <Text as="h2" className="mt-3" variant="headline">
                El Sistema <span className="impulso__accent">Mesa Activa</span>
              </Text>
              <Text
                as="p"
                className="mt-5"
                color="var(--color-outline)"
                variant="body"
              >
                <span
                  style={{
                    display: "block",
                    maxWidth: 560,
                    fontSize: 18,
                    lineHeight: 1.6,
                  }}
                >
                  Cuatro pasos, en orden. Cada uno construye sobre el anterior —
                  de diagnóstico a mesas llenas.
                </span>
              </Text>
            </div>
          </Col>

          {STEPS.map((s, i) => (
            <Col key={s.title} cols={{ sm: 4, md: 3, lg: 3 }}>
              <div className="impulso__reveal mt-8" style={{ height: "100%" }}>
                <div className="impulso__step">
                  <div className="flex items-center justify-between">
                    <span className="impulso__step-n">{i + 1}</span>
                    <Icon
                      color="var(--color-tertiary)"
                      name={s.icon}
                      size={24}
                    />
                  </div>
                  <Text as="h3" className="mt-1" variant="title">
                    {s.title}
                  </Text>
                  <Text as="p" color="var(--color-outline)" variant="body">
                    {s.desc}
                  </Text>
                </div>
              </div>
            </Col>
          ))}
        </Container>
      </section>

      {/* ===================== RESULTADOS ===================== */}
      <section
        className="impulso__section impulso__section--white"
        id="resultados"
      >
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            <div className="impulso__reveal" style={{ maxWidth: 720 }}>
              <span className="impulso__eyebrow">Qué vas a conseguir</span>
              <Text
                as="h2"
                className="mt-3"
                color="var(--color-text-black)"
                variant="headline"
              >
                En 90 días, un restaurante con{" "}
                <span className="impulso__mark">flujo constante</span>
              </Text>
            </div>
          </Col>

          {OUTCOMES.map((o) => (
            <Col key={o.title} cols={{ sm: 4, md: 2, lg: 4 }}>
              <div className="impulso__reveal mt-8" style={{ height: "100%" }}>
                <div className="impulso__card">
                  <span className="impulso__card-ico">
                    <Icon color="#FFFFFF" name={o.icon} size={24} />
                  </span>
                  <Text
                    as="h3"
                    className="mt-2"
                    color="var(--color-text-black)"
                    variant="title"
                  >
                    {o.title}
                  </Text>
                  <Text
                    as="p"
                    color="var(--color-on-surface-var)"
                    variant="body"
                  >
                    {o.desc}
                  </Text>
                </div>
              </div>
            </Col>
          ))}
        </Container>
      </section>

      {/* ===================== POR QUÉ CONFIAR ===================== */}
      <section className="impulso__section impulso__section--warm">
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 7 }}>
            <div className="impulso__reveal lg:pr-8">
              <span className="impulso__eyebrow">Por qué confiar</span>
              <Text
                as="h2"
                className="mt-3"
                color="var(--color-text-black)"
                variant="headline"
              >
                Entendemos tu negocio porque lo vivimos
              </Text>
              <Text
                as="p"
                className="mt-6"
                color="var(--color-on-surface)"
                variant="body"
              >
                <span
                  style={{ display: "block", fontSize: 17, lineHeight: 1.65 }}
                >
                  Somos dueños de restaurante. Probamos cada estrategia en
                  nuestro propio negocio antes de aplicarla contigo. Y venimos
                  de agencias de primer nivel: sabemos distinguir lo que genera
                  ventas reales de lo que es simple humo.
                </span>
              </Text>

              <div
                className="mt-8 pl-5"
                style={{ borderLeft: "3px solid var(--color-primary)" }}
              >
                <Text
                  as="p"
                  className="impulso__quote"
                  color="var(--color-text-black)"
                  variant="subtitle"
                >
                  “No te vendemos teoría, te vendemos lo que ya nos funcionó a
                  nosotros. Sabemos lo que es tener mesas vacías un martes por
                  la noche.”
                </Text>
                <Text
                  as="p"
                  className="mt-3"
                  color="var(--color-on-surface-var)"
                  variant="label"
                >
                  Equipo ImPulso · dueños de restaurante{/* ILUSTRATIVO */}
                </Text>
              </div>
            </div>
          </Col>
          <Col cols={{ sm: 4, md: 6, lg: 5 }}>
            <div className="impulso__reveal mt-8 lg:mt-0">
              <ImImage
                alt="Vista cenital de varias personas compartiendo hamburguesas y papas en la mesa de un restaurante"
                imgId="1466978913421-dad2ebd01d17"
                ratio="r45"
                sizes="(max-width: 1190px) 100vw, 42vw"
              />
            </div>
          </Col>
        </Container>
      </section>

      {/* ===================== GARANTÍA ===================== */}
      <section
        className="impulso__section impulso__section--white"
        id="garantia"
      >
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            <div className="impulso__reveal">
              <div className="impulso__guarantee">
                <span className="impulso__guarantee-seal">
                  <Icon color="#FFFFFF" name="ShieldCheck" size={34} />
                </span>
                <div>
                  <div className="mb-3">
                    <span className="impulso__badge">Garantía de 90 días</span>
                  </div>
                  <Text as="h2" color="var(--color-text-black)" variant="title">
                    Nuestro compromiso contigo
                  </Text>
                  <Text
                    as="p"
                    className="mt-3"
                    color="var(--color-on-surface)"
                    variant="body"
                  >
                    <span
                      style={{
                        display: "block",
                        maxWidth: 720,
                        fontSize: 17,
                        lineHeight: 1.6,
                      }}
                    >
                      Si en los primeros 90 días no hay una mejora clara en tu
                      visibilidad y rendimiento publicitario, seguimos
                      trabajando contigo un mes adicional sin costo — hasta que
                      los resultados sean visibles. Sin letras pequeñas.
                    </span>
                  </Text>
                </div>
              </div>
            </div>
          </Col>
        </Container>
      </section>

      {/* ===================== CTA FINAL + FORM ===================== */}
      <section
        className="impulso__section impulso__section--carbon"
        id="agenda"
      >
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 5 }}>
            <div className="impulso__reveal lg:pr-8">
              <span className="impulso__eyebrow">¿Hablamos esta semana?</span>
              <Text as="h2" className="mt-3" variant="headline">
                Recupera el control de tu{" "}
                <span className="impulso__accent">marketing</span>
              </Text>
              <Text
                as="p"
                className="mt-6"
                color="var(--color-outline)"
                variant="body"
              >
                <span
                  style={{ display: "block", fontSize: 17, lineHeight: 1.65 }}
                >
                  Rellena el formulario y agendamos tu estudio gratuito. Sin
                  compromiso — solo una conversación honesta sobre tu situación
                  y qué hacer para mejorarla.
                </span>
              </Text>

              <div className="mt-8 flex flex-col gap-3">
                {[
                  "Diagnóstico real de tu visibilidad",
                  "Dónde estás perdiendo reservas hoy",
                  "Un plan claro, sin humo",
                ].map((li) => (
                  <div key={li} className="flex items-center gap-3">
                    <Icon
                      color="var(--color-tertiary)"
                      name="Check"
                      size={20}
                    />
                    <Text as="span" color="var(--color-surface)" variant="body">
                      {li}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          <Col cols={{ sm: 4, md: 6, lg: 7 }}>
            <div className="impulso__reveal mt-8 lg:mt-0">
              <div className="impulso__form impulso-portal">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    required
                    label="Nombre"
                    placeholder="Ej. María Fernández"
                    startIcon="User"
                    value={form.nombre}
                    variant="primary"
                    onValueChange={set("nombre")}
                  />
                  <Input
                    required
                    label="Nombre del restaurante"
                    placeholder="Ej. La Trattoria"
                    startIcon="Store"
                    value={form.restaurante}
                    variant="primary"
                    onValueChange={set("restaurante")}
                  />
                  <Input
                    required
                    label="Email"
                    placeholder="tucorreo@ejemplo.com"
                    startIcon="Mail"
                    type="email"
                    value={form.email}
                    variant="primary"
                    onValueChange={set("email")}
                  />
                  <Input
                    required
                    label="WhatsApp"
                    placeholder="+51 999 999 999"
                    startIcon="Phone"
                    type="tel"
                    value={form.whatsapp}
                    variant="primary"
                    onValueChange={set("whatsapp")}
                  />
                </div>

                <div className="mt-5">
                  <Select
                    label="Ciudad / distrito"
                    options={CIUDADES}
                    placeholder="¿Dónde está tu restaurante?"
                    selectedKeys={form.ciudad ? [form.ciudad] : []}
                    startIcon="MapPin"
                    variant="primary"
                    onSelectionChange={(keys) =>
                      setForm((f) => ({
                        ...f,
                        ciudad: Array.from(keys)[0] as string,
                      }))
                    }
                  />
                </div>

                <div className="mt-5">
                  <Textarea
                    label="Cuéntanos tu situación (opcional)"
                    maxLength={240}
                    minRows={3}
                    placeholder="Ej. Tengo un restaurante de menú medio y las noches de semana están vacías."
                    value={form.mensaje}
                    variant="primary"
                    onValueChange={set("mensaje")}
                  />
                </div>

                <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
                  <Text
                    as="p"
                    color="var(--color-primary-input-placeholder)"
                    variant="label"
                  >
                    Respuesta en menos de 24h · sin compromiso
                  </Text>
                  <Button
                    endIcon="ArrowRight"
                    label="Agendar mi estudio gratuito"
                    variant="primary"
                    onPress={submit}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Container>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="impulso__footer">
        <Container>
          <Col cols={{ sm: 4, md: 3, lg: 6 }}>
            <div>
              <Wordmark light size={30} />
              <Text
                as="p"
                className="mt-4"
                color="var(--color-secondary-fixed-dim)"
                variant="body"
              >
                <span style={{ display: "block", maxWidth: 340 }}>
                  Growth &amp; Content Agency para el sector gastronómico. Del
                  plato a la pantalla, de la pantalla a la mesa llena.
                </span>
              </Text>
            </div>
          </Col>
          <Col cols={{ sm: 4, md: 3, lg: 6 }}>
            <div className="flex flex-col sm:flex-row gap-8 sm:justify-end mt-8 lg:mt-1">
              <nav className="flex flex-col gap-3">
                {siteConfig.impulsoNavLinks.map((l) => (
                  <button
                    key={l.href}
                    className="text-left"
                    onClick={() => scrollToSection(l.href.slice(1))}
                  >
                    <Text as="span" color="var(--color-outline)" variant="body">
                      {l.title}
                    </Text>
                  </button>
                ))}
              </nav>
              <div className="flex items-start gap-3">
                <span className="impulso__footer-avatar">
                  <Wordmark light size={13} />
                </span>
                <button onClick={() => scrollToSection("agenda")}>
                  <Text
                    as="span"
                    color="var(--color-tertiary)"
                    variant="body"
                    weight="bold"
                  >
                    Agenda tu estudio →
                  </Text>
                </button>
              </div>
            </div>
          </Col>
          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            <div
              className="mt-12 pt-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}
            >
              <Text
                as="p"
                color="var(--color-secondary-fixed-dim)"
                variant="label"
              >
                © {new Date().getFullYear()} ImPulso. Hecho con hambre de
                resultados en Lima.
              </Text>
            </div>
          </Col>
        </Container>
      </footer>
    </div>
  );
};

export default PageImpulso;
