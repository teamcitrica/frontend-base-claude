"use client";

import { Col, Container, Text } from "citrica-ui-toolkit";

import { Section, Stack } from "@/shared/components/layout";
import { CompareRow, TicketCard } from "@/shared/project-components/resto-app";

// Tabla de roles del brief, sección 6.
const ROLES = [
  {
    rol: "Super Admin",
    alcance:
      "Acceso global a usuarios, sucursales y configuración del sistema.",
    control: "Otorga y revoca accesos en toda la empresa.",
  },
  {
    rol: "Administrador",
    alcance:
      "Gestión del local completo: ventas, costos, caja, bancos y reportes.",
    control: "No puede modificar ni crear usuarios.",
  },
  {
    rol: "Cajero",
    alcance: "Cobro y cierre de su turno de caja.",
    control: "Bloqueado para editar precios o consultar días anteriores.",
  },
  {
    rol: "Mesero",
    alcance: "Toma de comandas y atención de sus mesas asignadas.",
    control: "Bloqueado de caja, costos, reportes y anulaciones.",
  },
];

/** Control por rol, en la banda azul: el tono serio de la página. */
const Roles = () => (
  <Section tone="inverse">
    <Container>
      <Col cols={{ sm: 4, md: 6, lg: 10 }}>
        <Stack gap={8}>
          <Stack gap={4}>
            <Text as="h2" textColor="color-text-white" variant="headline">
              Cada quien ve lo suyo
            </Text>
            <Text
              as="p"
              className="u-measure-narrow"
              textColor="color-text-white"
              variant="subtitle"
            >
              Permisos por rol para cerrar la puerta a descuentos no autorizados
              y fugas de caja, sin vigilar en persona.
            </Text>
          </Stack>
          <TicketCard>
            <Stack gap={1}>
              {ROLES.map(({ rol, alcance, control }) => (
                <CompareRow
                  key={rol}
                  end={{ label: "Control", text: control }}
                  start={{ label: "Rol", title: rol, text: alcance }}
                />
              ))}
            </Stack>
          </TicketCard>
        </Stack>
      </Col>
    </Container>
  </Section>
);

export default Roles;
