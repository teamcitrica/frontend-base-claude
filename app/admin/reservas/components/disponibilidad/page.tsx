"use client";
// Deshabilitar prerenderizado estático - necesario para useSearchParams()
export const dynamic = "force-dynamic";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Text, Icon, Button, Container, Col } from "citrica-ui-toolkit";
import WeeklyScheduleManager from "./components/weekly-schedule-manager";
import UnifiedAvailabilityManager from "./components/unified-availability-manager";

// Componente interno que usa useSearchParams
const DisponibilidadContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams?.get("page") || "disponibilidad";

  const renderContent = () => {
    switch (activeTab) {
      case "semanal":
        return <WeeklyScheduleManager />;
      case "disponibilidad":
      default:
        return <UnifiedAvailabilityManager />;
    }
  };

  const getTabDescription = () => {
    switch (activeTab) {
      case "semanal":
        return "Configura los horarios base de toda la semana";
      case "disponibilidad":
      default:
        return "Gestiona bloqueos específicos por fecha y visualiza disponibilidad en tiempo real";
    }
  };

  return (
    <Container>
      <Col className="space-y-6" cols={{ lg: 12, md: 6, sm: 4 }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <Icon className="text-[#964f20]" name="Clock" size={24} />
            <div>
              <p>
                <Text color="#964f20" variant="headline">
                  Horarios
                </Text>
              </p>
              <Text color="black" variant="body">
                {getTabDescription()}
              </Text>
            </div>
          </div>

          {/* Navegación de pestañas */}
          <div className="flex gap-2">
            <Button
              size="sm"
              startContent={<Icon name="Calendar" size={16} />}
              variant={activeTab === "disponibilidad" ? "primary" : "secondary"}
              onClick={() =>
                router.push("/admin/disponibilidad?page=disponibilidad")
              }
            >
              Gestión de Disponibilidad
            </Button>
            <Button
              size="sm"
              startContent={<Icon name="Clock" size={16} />}
              variant={activeTab === "semanal" ? "primary" : "secondary"}
              onClick={() => router.push("/admin/disponibilidad?page=semanal")}
            >
              Configuración Semanal
            </Button>
          </div>
        </div>

        {/* Contenido de la pestaña activa */}
        {renderContent()}
      </Col>
    </Container>
  );
};

// Componente principal envuelto en Suspense
const DisponibilidadAdminPage = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <DisponibilidadContent />
    </Suspense>
  );
};

export default DisponibilidadAdminPage;
