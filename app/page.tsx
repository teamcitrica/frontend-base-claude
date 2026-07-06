"use client";

import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import Image from "next/image";
import {
  Button,
  Card,
  Col,
  Container,
  Icon,
  Input,
  Modal,
  Select,
  Text,
  Textarea,
} from "citrica-ui-toolkit";
import { addToast } from "@heroui/toast";

import { laMagentaSerif } from "@/fonts/playfair";
import { siteConfig } from "@/config/site";

// ============================================================
// LA MAGENTA BAKERY — landing e-commerce (repostería francesa)
// Paleta y tipografía de marca via `.la-magenta` (styles/webpages-styles).
// Solo variables de token en estilos; el color vive en el SCSS.
// TODO: reemplazar los bloques placeholder por fotografía real de producto.
// ============================================================

type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  ph: "lila" | "salvia" | "lavanda" | "malva";
  porciones?: string;
  topVentas?: boolean;
};

const PRECIO_FMT = (v: number) => `S/ ${v.toFixed(2)}`;

// ---- Favoritos ----
const favoritos: Producto[] = [
  {
    id: "macarons-6",
    nombre: "Macarons de Temporada",
    descripcion: "Caja de 6, sabores rotativos de la casa.",
    precio: 42,
    categoria: "Clásicos franceses",
    ph: "lavanda",
    porciones: "6 piezas",
    topVentas: true,
  },
  {
    id: "eclair-choc",
    nombre: "Éclair au Chocolat",
    descripcion: "Masa choux rellena de crema y ganache oscuro.",
    precio: 16,
    categoria: "Clásicos franceses",
    ph: "malva",
    porciones: "1 unidad",
  },
  {
    id: "tarte-fraises",
    nombre: "Tarte aux Fraises",
    descripcion: "Base sablée, crema pastelera y fresas frescas.",
    precio: 68,
    categoria: "Clásicos franceses",
    ph: "salvia",
    porciones: "8 porciones",
  },
  {
    id: "pack-enamorados",
    nombre: "Pack pour les Amoureux",
    descripcion: "Selección para dos: dulces de regalo con dedicatoria.",
    precio: 95,
    categoria: "Packs para enamorados",
    ph: "lila",
    porciones: "Para 2",
  },
];

// ---- Portafolio de tortas ----
const categorias = [
  "Todas",
  "Bodas",
  "Cumpleaños",
  "Packs para enamorados",
  "Clásicos franceses",
];

const portafolio: Producto[] = [
  {
    id: "gateau-mariage",
    nombre: "Gâteau de Mariage",
    descripcion:
      "Torta de boda de tres pisos con acabado en crema de mantequilla y flores comestibles.",
    precio: 480,
    categoria: "Bodas",
    ph: "lila",
    porciones: "40 porciones",
  },
  {
    id: "naked-cake",
    nombre: "Naked Cake Champagne",
    descripcion:
      "Bizcocho de vainilla de Madagascar y frutos rojos, estilo semidesnudo.",
    precio: 360,
    categoria: "Bodas",
    ph: "salvia",
    porciones: "30 porciones",
  },
  {
    id: "fraisier",
    nombre: "Fraisier",
    descripcion:
      "Clásico francés de fresas, crema mousseline y bizcocho genovés.",
    precio: 120,
    categoria: "Clásicos franceses",
    ph: "malva",
    porciones: "10 porciones",
  },
  {
    id: "opera",
    nombre: "Ópera",
    descripcion: "Capas de almendra, café y chocolate. Intensa y elegante.",
    precio: 130,
    categoria: "Clásicos franceses",
    ph: "lavanda",
    porciones: "12 porciones",
  },
  {
    id: "cumple-drip",
    nombre: "Drip Cake de Cumpleaños",
    descripcion:
      "Torta festiva personalizable con goteo de chocolate y toppings.",
    precio: 145,
    categoria: "Cumpleaños",
    ph: "salvia",
    porciones: "15 porciones",
  },
  {
    id: "number-cake",
    nombre: "Number Cake",
    descripcion: "Cifra al gusto en masa sablée, crema y frutos frescos.",
    precio: 110,
    categoria: "Cumpleaños",
    ph: "lila",
    porciones: "12 porciones",
  },
  {
    id: "coeur-amoureux",
    nombre: "Cœur Amoureux",
    descripcion: "Torta corazón de frambuesa y chocolate blanco para dos.",
    precio: 98,
    categoria: "Packs para enamorados",
    ph: "malva",
    porciones: "Para 2",
  },
  {
    id: "boite-macarons",
    nombre: "Boîte de Macarons",
    descripcion: "Estuche de regalo de 12 macarons con dedicatoria dorada.",
    precio: 78,
    categoria: "Packs para enamorados",
    ph: "lavanda",
    porciones: "12 piezas",
  },
];

const testimonios = [
  {
    cita: "La torta de nuestra boda fue el momento más comentado de la noche. Elegante y deliciosa, tal como la soñamos.",
    nombre: "Valeria & Andrés",
    ocasion: "Torta de boda",
  },
  {
    cita: "Pedí un pack para el aniversario de mis papás y llegó impecable, con una dedicatoria preciosa. Volveré siempre.",
    nombre: "Camila Rueda",
    ocasion: "Aniversario",
  },
  {
    cita: "Los macarons son otra cosa. Se nota el oficio y el cariño en cada detalle. Mi pastelería favorita de la ciudad.",
    nombre: "Diego Fuentes",
    ocasion: "Cumpleaños",
  },
];

const cifras = [
  { num: "12", label: "Años de oficio" },
  { num: "8.400", label: "Tortas entregadas" },
  { num: "2.100", label: "Clientes felices" },
];

const zonasEntrega = [
  { value: "miraflores", label: "Miraflores" },
  { value: "san-isidro", label: "San Isidro" },
  { value: "barranco", label: "Barranco" },
  { value: "surco", label: "Santiago de Surco" },
  { value: "la-molina", label: "La Molina" },
  { value: "recojo", label: "Recojo en tienda" },
];

// ---- Estado del carrito (checkout) ----
type CartItem = { id: string; nombre: string; precio: number; qty: number };
type CartAction =
  | { type: "add"; producto: Producto }
  | { type: "inc"; id: string }
  | { type: "dec"; id: string }
  | { type: "remove"; id: string }
  | { type: "clear" };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "add": {
      const found = state.find((i) => i.id === action.producto.id);

      if (found) {
        return state.map((i) =>
          i.id === action.producto.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }

      return [
        ...state,
        {
          id: action.producto.id,
          nombre: action.producto.nombre,
          precio: action.producto.precio,
          qty: 1,
        },
      ];
    }
    case "inc":
      return state.map((i) =>
        i.id === action.id ? { ...i, qty: i.qty + 1 } : i,
      );
    case "dec":
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
    case "remove":
      return state.filter((i) => i.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
};

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);

  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }
};

// Fotografía real de producto (Unsplash). El id se resuelve a una URL
// optimizada; next/image la sirve. Si la imagen falla, cae al bloque pastel
// de marca con monograma, manteniendo la maqueta intacta.
const IMG = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// Mapa producto -> foto real (reemplazable por assets propios en /public/img).
const IMAGENES: Record<string, string> = {
  // Favoritos
  "macarons-6": "1558326567-98ae2405596b",
  "eclair-choc": "1621303837174-89787a7d4729",
  "tarte-fraises": "1464349095431-e9a21285b5f3",
  "pack-enamorados": "1488477304112-4944851de03d",
  // Portafolio
  "gateau-mariage": "1519915028121-7d3463d20b13",
  "naked-cake": "1535141192574-5d4897c12636",
  fraisier: "1565958011703-44f9829ba187",
  opera: "1578985545062-69928b1d9587",
  "cumple-drip": "1562440499-64c9a111f713",
  "number-cake": "1533134242443-d4fd215305ad",
  "coeur-amoureux": "1587314168485-3236d6710814",
  "boite-macarons": "1571115177098-24ec42ed204d",
};

const IMG_SIZES = "(max-width: 610px) 100vw, (max-width: 1190px) 50vw, 25vw";

const LmImage = ({
  imgId,
  alt,
  ph,
  ratio,
  w = 800,
  sizes = IMG_SIZES,
}: {
  imgId?: string;
  alt: string;
  ph: Producto["ph"];
  ratio: string;
  w?: number;
  sizes?: string;
}) => {
  const [ok, setOk] = useState(Boolean(imgId));

  return (
    <div className={`la-magenta__ph la-magenta__ph--${ph} ${ratio}`}>
      {ok && imgId ? (
        <Image
          fill
          alt={alt}
          sizes={sizes}
          src={IMG(imgId, w)}
          style={{ objectFit: "cover" }}
          onError={() => setOk(false)}
        />
      ) : (
        <Text
          as="span"
          className="la-magenta__ph-mono"
          color="rgba(62, 51, 46, 0.35)"
        >
          M
        </Text>
      )}
    </div>
  );
};

const PageLaMagenta = () => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [filtro, setFiltro] = useState("Todas");
  const [detalle, setDetalle] = useState<Producto | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Formulario
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fecha: "",
    zona: "",
    dedicatoria: "",
  });

  const total = useMemo(
    () => cart.reduce((acc, i) => acc + i.precio * i.qty, 0),
    [cart],
  );
  const cantidadTotal = useMemo(
    () => cart.reduce((acc, i) => acc + i.qty, 0),
    [cart],
  );

  const productosFiltrados = useMemo(
    () =>
      filtro === "Todas"
        ? portafolio
        : portafolio.filter((p) => p.categoria === filtro),
    [filtro],
  );

  // Header sólido al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fade sutil al entrar en viewport
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(".la-magenta__reveal");

    if (!els || els.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    els.forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, [filtro]);

  const agregar = (producto: Producto, cerrarModal = false) => {
    dispatch({ type: "add", producto });
    addToast({
      title: "Agregado al pedido",
      description: `${producto.nombre} · ${PRECIO_FMT(producto.precio)}`,
      color: "success",
    });
    if (cerrarModal) setDetalle(null);
  };

  const confirmarPedido = () => {
    if (cart.length === 0) {
      addToast({
        title: "Tu pedido está vacío",
        description: "Agrega al menos un producto antes de confirmar.",
        color: "warning",
      });

      return;
    }
    if (!form.nombre.trim() || !form.email.trim() || !form.telefono.trim()) {
      addToast({
        title: "Faltan datos",
        description: "Completa nombre, email y teléfono para continuar.",
        color: "danger",
      });

      return;
    }
    addToast({
      title: "¡Pedido confirmado!",
      description: `Gracias ${form.nombre.split(" ")[0]}, te contactaremos para coordinar la entrega.`,
      color: "success",
    });
    dispatch({ type: "clear" });
    setForm({
      nombre: "",
      email: "",
      telefono: "",
      fecha: "",
      zona: "",
      dedicatoria: "",
    });
  };

  return (
    <div ref={rootRef} className={`${laMagentaSerif.variable} la-magenta`}>
      {/* ===================== HEADER ===================== */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.3s ease",
          backgroundColor: scrolled ? "rgba(242,233,224,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--lm-gold)"
            : "1px solid transparent",
        }}
      >
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            <div className="flex items-center justify-between py-4">
              <button
                aria-label="La Magenta Bakery - inicio"
                className="flex items-center gap-3"
                onClick={() => scrollToSection("hero")}
              >
                <Text
                  as="span"
                  className="la-magenta__footer-diamond"
                  color="var(--lm-gold)"
                >
                  ✦
                </Text>
                <Text
                  as="span"
                  className="la-magenta__serif"
                  color="var(--lm-gold-deep)"
                  style={{ fontSize: 24 }}
                >
                  La Magenta
                </Text>
                <Text
                  as="span"
                  className="la-magenta__footer-diamond"
                  color="var(--lm-gold)"
                >
                  ✦
                </Text>
              </button>

              <nav className="hidden md:flex items-center gap-8">
                {siteConfig.laMagentaNavLinks.map((link) => (
                  <button
                    key={link.href}
                    className="la-magenta__kicker"
                    onClick={() => scrollToSection(link.href.replace("#", ""))}
                  >
                    <Text
                      as="span"
                      className="la-magenta__kicker"
                      color="var(--lm-tinta-soft)"
                      style={{ letterSpacing: "0.18em" }}
                      variant="label"
                    >
                      {link.title}
                    </Text>
                  </button>
                ))}
              </nav>

              <Button
                label="Ver pedido"
                size="sm"
                startIcon="ShoppingBag"
                variant="primary"
                onPress={() => scrollToSection("pedido")}
              />
            </div>
          </Col>
        </Container>
      </header>

      {/* ===================== HERO ===================== */}
      <section className="la-magenta__hero" id="hero">
        <div aria-hidden className="la-magenta__geo">
          <div className="la-magenta__geo-line" />
          <div className="la-magenta__geo-tri la-magenta__geo-tri--bl" />
          <div className="la-magenta__geo-tri la-magenta__geo-tri--br" />
        </div>
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            <div
              className="la-magenta__hero-inner"
              style={{ maxWidth: 820, margin: "0 auto" }}
            >
              <Icon
                className="mx-auto"
                color="var(--lm-malva)"
                name="Heart"
                size={34}
              />
              <Text
                as="h1"
                className="la-magenta__serif"
                color="var(--lm-malva-deep)"
                variant="display"
                weight="bold"
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(40px, 8vw, 88px)",
                    lineHeight: 1.05,
                  }}
                >
                  Repostería francesa,
                  <br />
                  hecha con alma
                </span>
              </Text>
              <div className="mt-6 mb-2 flex flex-col items-center gap-3">
                <Text
                  as="span"
                  className="la-magenta__kicker"
                  color="var(--lm-gold-text)"
                  variant="label"
                >
                  Boutique de pâtisserie · hecho a mano
                </Text>
                <span className="la-magenta__hairline la-magenta__hairline--center" />
              </div>
              <Text
                as="p"
                className="mx-auto mt-4"
                color="var(--lm-tinta-soft)"
                variant="body"
              >
                <span
                  style={{ display: "block", maxWidth: 560, margin: "0 auto" }}
                >
                  Tortas, macarons y éclairs elaborados como en París, con la
                  calidez de siempre. Cada pieza, impecable.
                </span>
              </Text>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  label="Ver catálogo"
                  variant="primary"
                  onPress={() => scrollToSection("portafolio")}
                />
                <button
                  className="la-magenta__arrow"
                  onClick={() => scrollToSection("historia")}
                >
                  <Text
                    as="span"
                    style={{
                      font: "inherit",
                      letterSpacing: "inherit",
                      textTransform: "inherit",
                      color: "inherit",
                    }}
                  >
                    Nuestra historia
                  </Text>
                </button>
              </div>
            </div>
          </Col>
        </Container>
      </section>

      {/* ===================== FAVORITOS ===================== */}
      <section
        className="la-magenta__section la-magenta__section--crema"
        id="favoritos"
      >
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            <div className="text-center mb-12 la-magenta__reveal">
              <Text
                as="span"
                className="la-magenta__kicker"
                color="var(--lm-gold-text)"
                variant="label"
              >
                Los favoritos
              </Text>
              <Text
                as="h2"
                className="la-magenta__serif mt-3"
                color="var(--lm-tinta)"
                variant="headline"
                weight="bold"
              >
                Los más pedidos de la casa
              </Text>
              <span className="la-magenta__hairline la-magenta__hairline--center mt-4" />
            </div>
          </Col>

          {favoritos.map((p) => (
            <Col key={p.id} cols={{ sm: 4, md: 3, lg: 3 }}>
              <div
                className="la-magenta__reveal mb-6"
                style={{ height: "100%" }}
              >
                <Card
                  className="la-magenta__product"
                  radius="none"
                  shadow="none"
                  variant="light"
                >
                  <div style={{ position: "relative" }}>
                    {p.topVentas && (
                      <Text
                        as="span"
                        className="la-magenta__badge"
                        color="var(--lm-tinta)"
                        variant="label"
                      >
                        Más pedido
                      </Text>
                    )}
                    <LmImage
                      alt={p.nombre}
                      imgId={IMAGENES[p.id]}
                      ph={p.ph}
                      ratio="la-magenta__ratio-45"
                    />
                  </div>
                  <div className="la-magenta__product-body">
                    <Text
                      as="h3"
                      className="la-magenta__serif"
                      color="var(--lm-tinta)"
                      variant="subtitle"
                      weight="bold"
                    >
                      {p.nombre}
                    </Text>
                    <Text as="p" color="var(--lm-tinta-soft)" variant="body">
                      {p.descripcion}
                    </Text>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <span className="la-magenta__price">
                        <Text
                          as="span"
                          color="var(--lm-malva-deep)"
                          variant="subtitle"
                          weight="bold"
                        >
                          {PRECIO_FMT(p.precio)}
                        </Text>
                      </span>
                      <Button
                        endIcon="Plus"
                        label="Agregar"
                        size="sm"
                        variant="flat"
                        onPress={() => agregar(p)}
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
          ))}
        </Container>
      </section>

      {/* ===================== HISTORIA ===================== */}
      <section
        className="la-magenta__section la-magenta__section--lila"
        id="historia"
      >
        <Container>
          <Col cols={{ sm: 4, md: 3, lg: 6 }}>
            <div className="la-magenta__reveal pr-0 lg:pr-8">
              <Text
                as="span"
                className="la-magenta__monogram"
                color="var(--lm-gold)"
              >
                M
              </Text>
              <Text
                as="span"
                className="la-magenta__kicker block mt-4"
                color="var(--lm-gold-text)"
                variant="label"
              >
                Nuestra historia
              </Text>
              <Text
                as="h2"
                className="la-magenta__serif mt-3"
                color="var(--lm-tinta)"
                variant="headline"
                weight="bold"
              >
                Un pedazo de París, hecho aquí
              </Text>
              <div className="mt-6 flex flex-col gap-4">
                <Text as="p" color="var(--lm-tinta-soft)" variant="body">
                  La Magenta nació de un viaje y una obsesión: la pastelería
                  francesa de verdad, esa que respeta los tiempos, la
                  mantequilla y el detalle. Volvimos con recetas y la promesa de
                  no tomar atajos.
                </Text>
                <Text as="p" color="var(--lm-tinta-soft)" variant="body">
                  Hoy horneamos cada mañana en pequeños lotes. Nada de vitrinas
                  llenas de sobras: preparamos lo justo para que llegue fresco a
                  tu mesa.
                </Text>
                <Text as="p" color="var(--lm-tinta-soft)" variant="body">
                  Somos un equipo pequeño y cercano. Nos gusta conocer la
                  ocasión detrás de cada torta, porque endulzar tus momentos es,
                  al final, todo el oficio.
                </Text>
              </div>

              <div className="mt-10 flex flex-wrap gap-10">
                {cifras.map((c) => (
                  <div key={c.label}>
                    <Text
                      as="span"
                      className="la-magenta__stat-num"
                      color="var(--lm-gold-deep)"
                    >
                      {c.num}
                    </Text>
                    <Text
                      as="p"
                      className="la-magenta__kicker mt-2"
                      color="var(--lm-tinta-soft)"
                      variant="label"
                    >
                      {c.label}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </Col>
          <Col cols={{ sm: 4, md: 3, lg: 6 }}>
            <div className="la-magenta__reveal">
              <LmImage
                alt="Nuestro obrador de repostería francesa"
                imgId="1486427944299-d1955d23e34d"
                ph="malva"
                ratio="la-magenta__ratio-43"
                sizes="(max-width: 1190px) 100vw, 50vw"
                w={1000}
              />
            </div>
          </Col>
        </Container>
      </section>

      {/* ===================== TESTIMONIOS ===================== */}
      <section
        className="la-magenta__section la-magenta__section--crema"
        id="testimonios"
      >
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            <div className="text-center mb-12 la-magenta__reveal">
              <Text
                as="span"
                className="la-magenta__kicker"
                color="var(--lm-gold-text)"
                variant="label"
              >
                Lo que dicen de nosotros
              </Text>
              <Text
                as="h2"
                className="la-magenta__serif mt-3"
                color="var(--lm-tinta)"
                variant="headline"
                weight="bold"
              >
                Momentos endulzados
              </Text>
              <span className="la-magenta__hairline la-magenta__hairline--center mt-4" />
            </div>
          </Col>

          {testimonios.map((t, i) => (
            <Col key={i} cols={{ sm: 4, md: 2, lg: 4 }}>
              <div
                className="la-magenta__reveal mb-6"
                style={{ height: "100%" }}
              >
                <Card
                  className="la-magenta__summary"
                  radius="none"
                  shadow="none"
                  variant="light"
                >
                  <Icon color="var(--lm-malva)" name="Heart" size={20} />
                  <Text
                    as="p"
                    className="la-magenta__quote mt-4"
                    color="var(--lm-tinta)"
                    variant="subtitle"
                  >
                    “{t.cita}”
                  </Text>
                  <div className="mt-6">
                    <Text
                      as="p"
                      color="var(--lm-tinta)"
                      variant="body"
                      weight="bold"
                    >
                      {t.nombre}
                    </Text>
                    <Text
                      as="p"
                      className="la-magenta__kicker mt-1"
                      color="var(--lm-gold-text)"
                      variant="label"
                    >
                      {t.ocasion}
                    </Text>
                  </div>
                </Card>
              </div>
            </Col>
          ))}
        </Container>
      </section>

      {/* ===================== PORTAFOLIO ===================== */}
      <section
        className="la-magenta__section la-magenta__section--lila"
        id="portafolio"
      >
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            <div className="text-center mb-8 la-magenta__reveal">
              <Text
                as="span"
                className="la-magenta__kicker"
                color="var(--lm-gold-text)"
                variant="label"
              >
                Portafolio
              </Text>
              <Text
                as="h2"
                className="la-magenta__serif mt-3"
                color="var(--lm-tinta)"
                variant="headline"
                weight="bold"
              >
                Nuestras tortas
              </Text>
              <span className="la-magenta__hairline la-magenta__hairline--center mt-4" />
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-10 la-magenta__reveal">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  className={`la-magenta__filter ${filtro === cat ? "is-active" : ""}`}
                  onClick={() => setFiltro(cat)}
                >
                  <Text
                    as="span"
                    style={{
                      font: "inherit",
                      letterSpacing: "inherit",
                      textTransform: "inherit",
                      color: "inherit",
                    }}
                  >
                    {cat}
                  </Text>
                </button>
              ))}
            </div>
          </Col>

          {productosFiltrados.map((p) => (
            <Col key={p.id} cols={{ sm: 2, md: 2, lg: 3 }}>
              <div className="la-magenta__reveal mb-6">
                <div
                  aria-label={`Ver ${p.nombre}`}
                  className="la-magenta__gallery-item"
                  role="button"
                  tabIndex={0}
                  onClick={() => setDetalle(p)}
                  onKeyDown={(e) => e.key === "Enter" && setDetalle(p)}
                >
                  <LmImage
                    alt={p.nombre}
                    imgId={IMAGENES[p.id]}
                    ph={p.ph}
                    ratio="la-magenta__ratio-45"
                  />
                  <div className="la-magenta__gallery-overlay">
                    <div>
                      <Text
                        as="p"
                        className="la-magenta__serif"
                        color="var(--lm-tinta)"
                        variant="subtitle"
                        weight="bold"
                      >
                        {p.nombre}
                      </Text>
                      <Text
                        as="p"
                        className="la-magenta__kicker mt-2"
                        color="var(--lm-gold-text)"
                        variant="label"
                      >
                        Ver detalle
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Container>
      </section>

      {/* ===================== PEDIDO / CHECKOUT ===================== */}
      <section
        className="la-magenta__section la-magenta__section--crema"
        id="pedido"
      >
        <div
          aria-hidden
          className="la-magenta__corner la-magenta__corner--tl"
        />
        <div
          aria-hidden
          className="la-magenta__corner la-magenta__corner--tr"
        />
        <div
          aria-hidden
          className="la-magenta__corner la-magenta__corner--bl"
        />
        <div
          aria-hidden
          className="la-magenta__corner la-magenta__corner--br"
        />
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            <div className="text-center mb-12 la-magenta__reveal">
              <Text
                as="span"
                className="la-magenta__kicker"
                color="var(--lm-gold-text)"
                variant="label"
              >
                Tu pedido
              </Text>
              <Text
                as="h2"
                className="la-magenta__serif mt-3"
                color="var(--lm-tinta)"
                variant="headline"
                weight="bold"
              >
                Confirma tu encargo
              </Text>
              <span className="la-magenta__hairline la-magenta__hairline--center mt-4" />
            </div>
          </Col>

          {/* Resumen */}
          <Col cols={{ sm: 4, md: 3, lg: 5 }}>
            <div className="la-magenta__reveal mb-8">
              <div className="la-magenta__summary">
                <Text
                  as="h3"
                  className="la-magenta__serif mb-4"
                  color="var(--lm-tinta)"
                  variant="title"
                  weight="bold"
                >
                  Resumen
                </Text>

                {cart.length === 0 ? (
                  <div className="la-magenta__empty">
                    <Icon
                      className="mx-auto"
                      color="var(--lm-malva)"
                      name="Heart"
                      size={30}
                    />
                    <Text
                      as="p"
                      className="mt-3"
                      color="var(--lm-tinta)"
                      variant="body"
                      weight="bold"
                    >
                      Tu pedido está vacío
                    </Text>
                    <Text
                      as="p"
                      className="mt-1"
                      color="var(--lm-tinta-soft)"
                      variant="body"
                    >
                      Elige algo del portafolio y lo endulzamos juntos.
                    </Text>
                    <div className="mt-5 flex justify-center">
                      <Button
                        endIcon="ArrowRight"
                        label="Ir al portafolio"
                        variant="flat"
                        onPress={() => scrollToSection("portafolio")}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    {cart.map((i) => (
                      <div key={i.id} className="la-magenta__summary-row">
                        <div style={{ flex: 1 }}>
                          <Text
                            as="p"
                            color="var(--lm-tinta)"
                            variant="body"
                            weight="bold"
                          >
                            {i.nombre}
                          </Text>
                          <Text
                            as="p"
                            color="var(--lm-tinta-soft)"
                            variant="label"
                          >
                            {PRECIO_FMT(i.precio)} c/u
                          </Text>
                        </div>
                        <div className="la-magenta__qty">
                          <button
                            aria-label={`Quitar una unidad de ${i.nombre}`}
                            onClick={() => dispatch({ type: "dec", id: i.id })}
                          >
                            <Text
                              as="span"
                              style={{ font: "inherit", color: "inherit" }}
                            >
                              −
                            </Text>
                          </button>
                          <Text
                            as="span"
                            color="var(--lm-tinta)"
                            variant="body"
                            weight="bold"
                          >
                            {i.qty}
                          </Text>
                          <button
                            aria-label={`Agregar una unidad de ${i.nombre}`}
                            onClick={() => dispatch({ type: "inc", id: i.id })}
                          >
                            <Text
                              as="span"
                              style={{ font: "inherit", color: "inherit" }}
                            >
                              +
                            </Text>
                          </button>
                        </div>
                        <Text
                          as="span"
                          className="ml-3"
                          color="var(--lm-tinta)"
                          variant="body"
                          weight="bold"
                        >
                          {PRECIO_FMT(i.precio * i.qty)}
                        </Text>
                      </div>
                    ))}

                    <div className="flex items-center justify-between pt-5">
                      <Text
                        as="span"
                        className="la-magenta__serif"
                        color="var(--lm-tinta)"
                        variant="subtitle"
                        weight="bold"
                      >
                        Total ({cantidadTotal})
                      </Text>
                      <Text
                        as="span"
                        className="la-magenta__serif"
                        color="var(--lm-malva-deep)"
                        variant="headline"
                        weight="bold"
                      >
                        {PRECIO_FMT(total)}
                      </Text>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Col>

          {/* Formulario */}
          <Col cols={{ sm: 4, md: 3, lg: 7 }}>
            <div className="la-magenta__reveal">
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    required
                    label="Nombre completo"
                    placeholder="Ej. María Fernández"
                    startIcon="User"
                    value={form.nombre}
                    variant="primary"
                    onValueChange={(v) => setForm((f) => ({ ...f, nombre: v }))}
                  />
                  <Input
                    required
                    label="Email"
                    placeholder="tucorreo@ejemplo.com"
                    startIcon="Mail"
                    type="email"
                    value={form.email}
                    variant="primary"
                    onValueChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  />
                  <Input
                    required
                    label="Teléfono"
                    placeholder="+51 999 999 999"
                    startIcon="Phone"
                    type="tel"
                    value={form.telefono}
                    variant="primary"
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, telefono: v }))
                    }
                  />
                  <Input
                    label="Fecha de entrega"
                    startIcon="Calendar"
                    type="date"
                    value={form.fecha}
                    variant="primary"
                    onValueChange={(v) => setForm((f) => ({ ...f, fecha: v }))}
                  />
                </div>

                <Select
                  label="Zona de entrega"
                  options={zonasEntrega}
                  placeholder="Selecciona tu distrito"
                  selectedKeys={form.zona ? [form.zona] : []}
                  startIcon="MapPin"
                  variant="primary"
                  onSelectionChange={(keys) =>
                    setForm((f) => ({
                      ...f,
                      zona: Array.from(keys)[0] as string,
                    }))
                  }
                />

                <Textarea
                  label="Dedicatoria (opcional)"
                  maxLength={140}
                  minRows={3}
                  placeholder="Ej. Feliz aniversario, mi amor ♥"
                  value={form.dedicatoria}
                  variant="primary"
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, dedicatoria: v }))
                  }
                />

                <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                  <div>
                    <Text
                      as="p"
                      className="la-magenta__kicker"
                      color="var(--lm-tinta-soft)"
                      variant="label"
                    >
                      Total a pagar
                    </Text>
                    <Text
                      as="p"
                      className="la-magenta__serif"
                      color="var(--lm-malva-deep)"
                      variant="headline"
                      weight="bold"
                    >
                      {PRECIO_FMT(total)}
                    </Text>
                  </div>
                  <Button
                    endIcon="Heart"
                    label="Confirmar pedido"
                    variant="primary"
                    onPress={confirmarPedido}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Container>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="la-magenta__footer">
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            <div className="text-center">
              <div className="la-magenta__footer-brand">
                <Text
                  as="span"
                  className="la-magenta__footer-diamond"
                  color="var(--lm-gold)"
                >
                  ✦
                </Text>
                <Text
                  as="span"
                  className="la-magenta__serif"
                  color="var(--lm-gold)"
                  style={{ fontSize: 30 }}
                >
                  La Magenta
                </Text>
                <Text
                  as="span"
                  className="la-magenta__footer-diamond"
                  color="var(--lm-gold)"
                >
                  ✦
                </Text>
              </div>
              <Text
                as="p"
                className="la-magenta__kicker mt-3"
                color="#B7A99B"
                variant="label"
              >
                Pâtisserie française · desde 2013
              </Text>

              <nav className="flex flex-wrap justify-center gap-6 mt-8">
                {siteConfig.laMagentaNavLinks.map((link) => (
                  <button
                    key={link.href}
                    className="la-magenta__kicker"
                    onClick={() => scrollToSection(link.href.replace("#", ""))}
                  >
                    <Text
                      as="span"
                      className="la-magenta__kicker"
                      color="#CDBFB3"
                      style={{ letterSpacing: "0.18em" }}
                      variant="label"
                    >
                      {link.title}
                    </Text>
                  </button>
                ))}
              </nav>

              <div
                className="mt-10 pt-6"
                style={{ borderTop: "1px solid rgba(192,161,129,0.3)" }}
              >
                <Text as="p" color="#9C8F82" variant="label">
                  © {new Date().getFullYear()} La Magenta Bakery. Hecho con
                  cariño en Lima.
                </Text>
              </div>
            </div>
          </Col>
        </Container>
      </footer>

      {/* ===================== MODAL DETALLE ===================== */}
      <Modal
        backdrop="blur"
        className={`${laMagentaSerif.variable} la-magenta la-magenta-modal`}
        isOpen={detalle !== null}
        placement="center"
        size="3xl"
        onClose={() => setDetalle(null)}
      >
        {detalle && (
          <Container noPadding>
            <Col cols={{ sm: 4, md: 3, lg: 6 }}>
              <LmImage
                alt={detalle.nombre}
                imgId={IMAGENES[detalle.id]}
                ph={detalle.ph}
                ratio="la-magenta__ratio-11"
                sizes="(max-width: 1190px) 100vw, 50vw"
                w={1000}
              />
            </Col>
            <Col cols={{ sm: 4, md: 3, lg: 6 }}>
              <div className="p-2 md:p-4 flex flex-col gap-3">
                <Text
                  as="span"
                  className="la-magenta__kicker"
                  color="var(--lm-gold-text)"
                  variant="label"
                >
                  {detalle.categoria}
                </Text>
                <Text
                  as="h3"
                  className="la-magenta__serif"
                  color="var(--lm-tinta)"
                  variant="headline"
                  weight="bold"
                >
                  {detalle.nombre}
                </Text>
                <span className="la-magenta__hairline" />
                <Text as="p" color="var(--lm-tinta-soft)" variant="body">
                  {detalle.descripcion}
                </Text>
                {detalle.porciones && (
                  <Text
                    as="p"
                    className="la-magenta__kicker mt-1"
                    color="var(--lm-gold-text)"
                    variant="label"
                  >
                    Rinde · {detalle.porciones}
                  </Text>
                )}
                <div className="flex items-center justify-between mt-4">
                  <Text
                    as="span"
                    className="la-magenta__serif"
                    color="var(--lm-malva-deep)"
                    variant="headline"
                    weight="bold"
                  >
                    {PRECIO_FMT(detalle.precio)}
                  </Text>
                  <Button
                    endIcon="Plus"
                    label="Agregar al pedido"
                    variant="primary"
                    onPress={() => agregar(detalle, true)}
                  />
                </div>
              </div>
            </Col>
          </Container>
        )}
      </Modal>
    </div>
  );
};

export default PageLaMagenta;
