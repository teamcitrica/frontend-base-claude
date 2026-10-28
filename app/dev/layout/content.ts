// Contenido de /dev/layout: qué es cada primitiva, cuándo usarla y cómo.
// Escrito para un desarrollador junior y para la IA. Cambiar el texto aquí
// no toca el layout de la página.

export interface PrimitiveDoc {
  /** Ancla de la sección. */
  id: string;
  name: string;
  /** Qué es, en una frase. */
  oneLiner: string;
  /** Una imagen física para recordarla. */
  analogy: string;
  whenYes: string[];
  /** Cuándo no, y qué usar en su lugar. */
  whenNo: string[];
  /** Props, con sus valores posibles. */
  props: { name: string; values: string }[];
  snippet: string;
}

export const intro = {
  title: "Primitivas de layout",
  lead: "Siete piezas para componer cualquier página de la web sin escribir layout a mano. Cada una hace una sola cosa y solo acepta valores del sistema.",
  rule: "La regla: el layout se compone con Container/Col y estas primitivas. Nada de <div> con flex o grid, nada de Tailwind para espaciar. Un <div> propio solo existe para un gesto de marca, con su clase de página.",
  source:
    "Decisión: ADR-0007. Componentes: shared/components/layout/. El espaciado son pasos de la escala: gap={6} = var(--space-6) = 24px, igual que gap-6 en Tailwind.",
};

/** Tabla de decisión: la primera parada cuando no sabes qué usar. */
export const decisions: { need: string; use: string; href: string }[] = [
  {
    need: "Una banda de página con su aire y su fondo",
    use: "Section",
    href: "#section",
  },
  {
    need: "Columnas estándar de la retícula",
    use: "Container + Col",
    href: "#grid",
  },
  { need: "Apilar cosas en vertical", use: "Stack", href: "#stack" },
  {
    need: "Poner cosas en fila, que salten de línea si no caben",
    use: "Cluster",
    href: "#cluster",
  },
  { need: "Una imagen con proporción fija", use: "Media", href: "#media" },
  {
    need: "Tarjetas o campos que se reparten solos",
    use: "AutoGrid",
    href: "#autogrid",
  },
  {
    need: "Superponer, salir a sangre, componer en asimetría",
    use: "Grid + Cell",
    href: "#grid",
  },
];

export const primitives: PrimitiveDoc[] = [
  {
    id: "section",
    name: "Section",
    oneLiner:
      "Una banda horizontal de la página: decide cuánto aire tiene arriba y abajo, y qué fondo lleva.",
    analogy:
      "Las franjas de un cartel: cada una con su color y su respiración.",
    whenYes: [
      "Cada bloque de una página (hero, problema, método, garantía…).",
      "Alternar fondos para dar ritmo: base, surface, y un solo inverse por página.",
    ],
    whenNo: [
      "Para separar elementos dentro de un bloque: usa Stack.",
      "Para el footer, si su aire no es uno de los tres ritmos: deja su clase de gesto.",
    ],
    props: [
      {
        name: "rhythm",
        values: "none · tight (40px) · default (64px) · airy (96px)",
      },
      { name: "tone", values: "base · surface · inverse" },
      { name: "as, id, className", values: "section por defecto" },
    ],
    snippet: `<Section id="problema" rhythm="tight" tone="surface">
  <Container>
    <Col cols={{ sm: 4, md: 6, lg: 6 }}>…</Col>
  </Container>
</Section>`,
  },
  {
    id: "stack",
    name: "Stack",
    oneLiner:
      "Apila a sus hijos en vertical, con el mismo espacio entre todos.",
    analogy:
      "Una pila de platos: uno encima de otro, siempre a la misma distancia.",
    whenYes: [
      "Título, bajada y párrafo de un bloque.",
      'Listas verticales: as="ul" y cada ítem as="li".',
    ],
    whenNo: [
      "Para poner cosas lado a lado: usa Cluster.",
      "Para un espacio distinto entre dos hijos concretos: anida dos Stack, no pongas márgenes.",
    ],
    props: [
      {
        name: "gap",
        values: "1 · 2 · 3 · 4 · 6 · 8 · 10 · 12 · 16 · 24 · 32 (× 4px)",
      },
      { name: "as, id, className", values: "div por defecto" },
    ],
    snippet: `<Stack gap={6}>
  <Text as="h2" variant="headline">Título</Text>
  <Text as="p" variant="subtitle">Bajada</Text>
</Stack>`,
  },
  {
    id: "cluster",
    name: "Cluster",
    oneLiner:
      "Pone a sus hijos en fila y, si no caben, los pasa a la línea siguiente.",
    analogy: "Palabras en un renglón: cuando se acaba el ancho, siguen abajo.",
    whenYes: [
      "Botones de una acción, etiquetas, métricas sueltas.",
      "Icono + texto en una línea: wrap={false}.",
      'Dos grupos a los extremos (firma y créditos): justify="between".',
    ],
    whenNo: [
      "Para columnas de igual ancho: usa AutoGrid.",
      "Para alinear con la retícula de 12 columnas: usa Grid o Col.",
    ],
    props: [
      {
        name: "gap",
        values: "un paso, o { row, column } para espacios distintos",
      },
      { name: "align", values: "start · center (sin valor: se estiran)" },
      { name: "justify", values: "start · between" },
      { name: "wrap", values: "true (por defecto) · false" },
    ],
    snippet: `<Cluster align="center" gap={6}>
  <Button label="Agenda tu estudio" variant="primary" />
  <Text as="a" href="#metodo" variant="label">Cómo funciona</Text>
</Cluster>`,
  },
  {
    id: "media",
    name: "Media",
    oneLiner:
      "Un marco con proporción fija; la imagen de dentro lo llena y se recorta.",
    analogy: "Un portarretratos: el marco no cambia, la foto se ajusta a él.",
    whenYes: [
      "Fotos dentro de una columna, con next/image y fill.",
      "Cuando varias imágenes deben medir lo mismo aunque sus archivos no.",
    ],
    whenNo: [
      'Para una foto de borde a borde de la pantalla: usa una Cell con breakout="full".',
      "Para iconos: usa Icon del toolkit.",
    ],
    props: [
      { name: "ratio", values: "16/10 · 4/3 · 3/4" },
      { name: "radius", values: "md (--radius-md, por defecto) · none" },
    ],
    snippet: `<Media ratio="4/3">
  <Image fill alt="…" className="object-cover" src="…" />
</Media>`,
  },
  {
    id: "autogrid",
    name: "AutoGrid",
    oneLiner:
      "Reparte a sus hijos en columnas iguales: caben tantas como permita el ancho.",
    analogy: "Baldosas en un piso: más ancho el cuarto, más baldosas por fila.",
    whenYes: [
      "Pasos de un método, campos de un formulario, tarjetas.",
      "Cuando no quieres decidir columnas por breakpoint.",
    ],
    whenNo: [
      "Para composiciones donde cada bloque tiene un ancho distinto: usa Grid.",
      "Para elementos de ancho natural (botones, etiquetas): usa Cluster.",
    ],
    props: [
      { name: "minItemWidth", values: "220 · 240 (px)" },
      { name: "gap", values: "un paso de la escala" },
    ],
    snippet: `<AutoGrid as="ol" gap={10} minItemWidth={240}>
  <Stack as="li" gap={2}>…</Stack>
</AutoGrid>`,
  },
  {
    id: "grid",
    name: "Grid + Cell",
    oneLiner:
      "La retícula de 12 columnas (6 en tablet, 4 en móvil) con superpoderes: superponer, salir a sangre y componer en asimetría.",
    analogy:
      "La plancha de un diagramador: columnas fijas, y encima puedes encimar recortes.",
    whenYes: [
      "Texto encima de una foto que va de borde a borde.",
      "Bloques que empiezan en columnas distintas, a propósito.",
      "Una imagen que invade la columna del texto.",
      "Una foto que llega a un solo borde de la pantalla.",
    ],
    whenNo: [
      "Para columnas estándar sin nada especial: Container + Col es más simple.",
      "Para apilar o poner en fila: Stack o Cluster.",
    ],
    props: [
      {
        name: "Grid · rowGap",
        values:
          "un paso de la escala (entre columnas va el gutter del sistema)",
      },
      {
        name: "Cell · start, span",
        values: "1–12, o { sm, md, lg } como en Col",
      },
      {
        name: "Cell · row",
        values: "1–6, o { sm, md, lg }: misma fila = se superponen",
      },
      { name: "Cell · breakout", values: "full · wide-start · wide-end" },
      { name: "Cell · align", values: "start · center · end" },
    ],
    snippet: `<Grid>
  <Cell breakout="full" row={1}>…foto…</Cell>
  <Cell align="end" row={1} span={{ lg: 8 }}>…texto…</Cell>
</Grid>`,
  },
];

/** Los cuatro gestos de Grid, cada uno con su comportamiento en móvil. */
export const gestures = {
  bleed: {
    title: "Texto sobre foto a sangre",
    body: "La foto va de borde a borde; el texto vive en la retícula. Las dos celdas comparten la fila 1, así que se superponen sin position: absolute. Es lo que hace el hero de la landing.",
    mobile:
      "En móvil, igual: la foto sigue a sangre y el texto ocupa las 4 columnas.",
    snippet: `<Grid>
  <Cell breakout="full" row={1}>foto</Cell>
  <Cell align="end" row={1} span={{ lg: 6 }}>texto</Cell>
</Grid>`,
  },
  asymmetry: {
    title: "Asimetría",
    body: "Cada bloque empieza en una columna distinta y en su propia fila. La composición se lee en diagonal, como un cartel, y sigue alineada a la retícula.",
    mobile:
      "En móvil, los bloques se apilan a ancho completo: start y span solo se dan para lg.",
    snippet: `<Grid rowGap={6}>
  <Cell row={1} span={{ lg: 7 }}>titular</Cell>
  <Cell row={2} span={{ lg: 5 }} start={{ lg: 8 }}>texto</Cell>
  <Cell row={3} span={{ lg: 4 }} start={{ lg: 3 }}>dato</Cell>
</Grid>`,
  },
  overlap: {
    title: "Superposición",
    body: "La imagen ocupa las columnas 1–7 y el texto las 6–12, en la misma fila: comparten las columnas 6 y 7 y el texto queda encima.",
    mobile:
      "En móvil no se superponen: row cambia por breakpoint y el texto baja a la fila 2.",
    snippet: `<Grid>
  <Cell row={1} span={{ lg: 7 }}>imagen</Cell>
  <Cell align="center" row={{ sm: 2, lg: 1 }} span={{ lg: 7 }} start={{ lg: 6 }}>texto</Cell>
</Grid>`,
  },
  wide: {
    title: "Salida parcial",
    body: "La imagen empieza en la columna 7 y llega hasta el borde derecho de la pantalla; el texto se queda en la retícula. Rompe el contenedor por un solo lado.",
    mobile:
      "En móvil la imagen baja a la fila 2 y sigue llegando al borde derecho.",
    snippet: `<Grid>
  <Cell align="center" row={1} span={{ lg: 5 }}>texto</Cell>
  <Cell breakout="wide-end" row={{ sm: 2, lg: 1 }} start={{ lg: 7 }}>imagen</Cell>
</Grid>`,
  },
};
