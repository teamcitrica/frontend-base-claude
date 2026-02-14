"use client";
import React, { useState } from "react";
import { Button, Icon } from "citrica-ui-toolkit";
import UnifiedAvailabilityManager from "./disponibilidad/components/unified-availability-manager";
import WeeklyScheduleManager from "./disponibilidad/components/weekly-schedule-manager";

const BookingAvailabilityView = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    "disponibilidad" | "semanal"
  >("disponibilidad");

  const renderContent = () => {
    switch (activeSubTab) {
      case "semanal":
        return <WeeklyScheduleManager />;
      case "disponibilidad":
      default:
        return <UnifiedAvailabilityManager />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Navegación de sub-pestañas */}
      <div className="flex justify-end gap-2">
        <Button
          isAdmin={true}
          size="sm"
          startContent={<Icon name="Calendar" size={16} />}
          variant={activeSubTab === "disponibilidad" ? "primary" : "secondary"}
          onClick={() => setActiveSubTab("disponibilidad")}
        >
          Gestión de Disponibilidad
        </Button>
        <Button
          isAdmin={true}
          size="sm"
          startContent={<Icon name="Clock" size={16} />}
          variant={activeSubTab === "semanal" ? "primary" : "secondary"}
          onClick={() => setActiveSubTab("semanal")}
        >
          Configuración Semanal
        </Button>
      </div>

      {/* Contenido de la sub-pestaña activa */}
      {renderContent()}
    </div>
  );
};

export default BookingAvailabilityView;
