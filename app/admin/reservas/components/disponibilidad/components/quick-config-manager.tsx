"use client";
import React, { useState } from "react";
import { Text, Button, Card, Icon } from "citrica-ui-toolkit";
import { Input as DateInput, Select, SelectItem } from "@heroui/react";

import { useAdminBookings } from "@/app/hooks/useAdminBookings";

const QuickConfigManager = () => {
  const { isLoading, applyWeeklyPreset, togglePeriodBatch, emergencyCloseAll } =
    useAdminBookings();

  const [batchConfig, setBatchConfig] = useState({
    startDate: "",
    endDate: "",
    action: "generate", // "generate", "activate", "deactivate"
  });

  const [presets] = useState([
    {
      name: "7 Días (10-18)",
      description: "Todos los días 10:00-18:00",
      config: {
        everyday: { start: "10:00", end: "18:00", active: true },
      },
    },
  ]);

  const handleBatchAction = async () => {
    if (!batchConfig.startDate || !batchConfig.endDate) {
      alert("Por favor selecciona las fechas");

      return;
    }

    if (new Date(batchConfig.startDate) > new Date(batchConfig.endDate)) {
      alert("La fecha de inicio debe ser anterior a la fecha de fin");

      return;
    }

    try {
      let result;

      if (batchConfig.action === "activate") {
        result = await togglePeriodBatch(
          batchConfig.startDate,
          batchConfig.endDate,
          "activate",
        );
        if (result.success) {
          alert("Período activado exitosamente");
        } else {
          alert("Error al activar el período");
        }
      } else if (batchConfig.action === "deactivate") {
        result = await togglePeriodBatch(
          batchConfig.startDate,
          batchConfig.endDate,
          "deactivate",
        );
        if (result.success) {
          alert("Período desactivado exitosamente");
        } else {
          alert("Error al desactivar el período");
        }
      } else if (batchConfig.action === "generate") {
        // Para generar slots, simplemente activamos el período
        result = await togglePeriodBatch(
          batchConfig.startDate,
          batchConfig.endDate,
          "activate",
        );
        if (result.success) {
          alert("Período activado para generar slots automáticamente");
        } else {
          alert("Error al activar el período");
        }
      }
    } catch (error) {
      console.error("Error in batch action:", error);
      alert("Error al procesar la acción");
    }
  };

  const calculateDaysBetween = (start: string, end: string) => {
    if (!start || !end) return 0;

    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div>
          <p>
            <Text color="#964f20" variant="title">
              Configuración Rápida
            </Text>
          </p>
          <p>
            <Text color="color-on-surface" variant="body">
              Herramientas para configurar disponibilidad masiva y aplicar
              cambios a múltiples días
            </Text>
          </p>
        </div>
      </Card>

      {/* Presets de configuración */}
      <Card className="p-6">
        <div className="space-y-4">
          <p>
            <Text color="#964f20" variant="subtitle">
              Configuraciones Predefinidas
            </Text>
          </p>
          <p>
            <Text className="text-sm" color="color-on-surface" variant="body">
              Aplica configuraciones comunes a toda la semana
            </Text>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {presets.map((preset, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:border-[#964f20] transition-colors cursor-pointer"
                onClick={async () => {
                  if (
                    confirm(
                      `¿Aplicar la configuración "${preset.name}"?\n\nEsto afectará la disponibilidad semanal actual.`,
                    )
                  ) {
                    try {
                      const result = await applyWeeklyPreset(preset.config);

                      if (result.success) {
                        alert(
                          `Configuración "${preset.name}" aplicada exitosamente`,
                        );
                      } else {
                        alert(
                          `Error al aplicar la configuración "${preset.name}"`,
                        );
                      }
                    } catch (error) {
                      console.error("Error applying preset:", error);
                      alert(
                        `Error al aplicar la configuración "${preset.name}"`,
                      );
                    }
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p>
                      <Text color="color-on-surface" variant="subtitle">
                        {preset.name}
                      </Text>
                    </p>
                    <p>
                      <Text
                        className="text-sm mt-1"
                        color="color-on-surface"
                        variant="body"
                      >
                        {preset.description}
                      </Text>
                    </p>
                  </div>
                  <Icon
                    className="text-gray-400"
                    name="ChevronRight"
                    size={20}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Acciones por lotes */}
      <Card className="p-6">
        <div className="space-y-4">
          <p>
            <Text color="#964f20" variant="subtitle">
              Acciones por Lotes
            </Text>
          </p>
          <p>
            <Text className="text-sm" color="color-on-surface" variant="body">
              Aplica cambios a un rango de fechas específico
            </Text>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DateInput
              className="input-citrica-ui input-primary"
              color="default"
              label="Fecha de inicio"
              type="date"
              value={batchConfig.startDate}
              variant="bordered"
              onChange={(e) =>
                setBatchConfig({ ...batchConfig, startDate: e.target.value })
              }
            />

            <DateInput
              className="input-citrica-ui input-primary"
              color="default"
              label="Fecha de fin"
              type="date"
              value={batchConfig.endDate}
              variant="bordered"
              onChange={(e) =>
                setBatchConfig({ ...batchConfig, endDate: e.target.value })
              }
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Acción
              </label>
              <Select
                placeholder="Selecciona una acción"
                value={batchConfig.action}
                onChange={(e) =>
                  setBatchConfig({ ...batchConfig, action: e.target.value })
                }
              >
                <SelectItem key="generate">Generar Slots</SelectItem>
                <SelectItem key="activate">Activar Período</SelectItem>
                <SelectItem key="deactivate">Desactivar Período</SelectItem>
              </Select>
            </div>
          </div>

          {batchConfig.startDate && batchConfig.endDate && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <Text className="text-sm" color="color-on-surface" variant="body">
                <strong>Resumen:</strong> Se aplicará la acción "
                {batchConfig.action === "generate"
                  ? "Generar Slots"
                  : batchConfig.action === "activate"
                    ? "Activar"
                    : "Desactivar"}
                " a{" "}
                {calculateDaysBetween(
                  batchConfig.startDate,
                  batchConfig.endDate,
                )}{" "}
                días (desde{" "}
                {new Date(batchConfig.startDate).toLocaleDateString("es-ES")}{" "}
                hasta{" "}
                {new Date(batchConfig.endDate).toLocaleDateString("es-ES")})
              </Text>
            </div>
          )}

          <Button
            disabled={
              !batchConfig.startDate || !batchConfig.endDate || isLoading
            }
            startContent={<Icon name="Play" size={16} />}
            variant="primary"
            onClick={handleBatchAction}
          >
            {isLoading ? "Procesando..." : "Aplicar Acción"}
          </Button>
        </div>
      </Card>

      {/* Herramientas útiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Generación automática */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Icon className="text-[#964f20]" name="Zap" size={20} />
              <Text color="#964f20" variant="subtitle">
                Generación Automática
              </Text>
            </div>

            <Text className="text-sm" color="color-on-surface" variant="body">
              Genera slots automáticamente para los próximos meses basándose en
              tu configuración semanal
            </Text>

            <div className="space-y-2">
              <Button
                fullWidth
                size="sm"
                variant="secondary"
                onClick={async () => {
                  const today = new Date();
                  const nextMonth = new Date(
                    today.getFullYear(),
                    today.getMonth() + 1,
                    1,
                  );
                  const endOfNextMonth = new Date(
                    today.getFullYear(),
                    today.getMonth() + 2,
                    0,
                  );

                  if (
                    confirm(
                      "¿Activar disponibilidad para el próximo mes?\n\nEsto eliminará cualquier bloqueo existente en ese período.",
                    )
                  ) {
                    try {
                      const result = await togglePeriodBatch(
                        nextMonth.toISOString().split("T")[0],
                        endOfNextMonth.toISOString().split("T")[0],
                        "activate",
                      );

                      if (result.success) {
                        alert("✅ Próximo mes activado para reservas");
                      } else {
                        alert("❌ Error al activar el próximo mes");
                      }
                    } catch (error) {
                      console.error("Error activating next month:", error);
                      alert("❌ Error al activar el próximo mes");
                    }
                  }
                }}
              >
                Próximo Mes
              </Button>

              <Button
                fullWidth
                size="sm"
                variant="secondary"
                onClick={async () => {
                  const today = new Date();
                  const next3Months = new Date(
                    today.getFullYear(),
                    today.getMonth() + 3,
                    0,
                  );

                  if (
                    confirm(
                      "¿Activar disponibilidad para los próximos 3 meses?\n\nEsto eliminará cualquier bloqueo existente en ese período.",
                    )
                  ) {
                    try {
                      const result = await togglePeriodBatch(
                        today.toISOString().split("T")[0],
                        next3Months.toISOString().split("T")[0],
                        "activate",
                      );

                      if (result.success) {
                        alert("✅ Próximos 3 meses activados para reservas");
                      } else {
                        alert("❌ Error al activar los próximos 3 meses");
                      }
                    } catch (error) {
                      console.error("Error activating next 3 months:", error);
                      alert("❌ Error al activar los próximos 3 meses");
                    }
                  }
                }}
              >
                Próximos 3 Meses
              </Button>

              <Button
                fullWidth
                size="sm"
                variant="secondary"
                onClick={async () => {
                  const today = new Date();
                  const nextYear = new Date(today.getFullYear() + 1, 0, 1);
                  const endOfNextYear = new Date(
                    today.getFullYear() + 1,
                    11,
                    31,
                  );

                  if (
                    confirm(
                      "¿Activar disponibilidad para el próximo año?\n\nEsto eliminará cualquier bloqueo existente en ese período.",
                    )
                  ) {
                    try {
                      const result = await togglePeriodBatch(
                        nextYear.toISOString().split("T")[0],
                        endOfNextYear.toISOString().split("T")[0],
                        "activate",
                      );

                      if (result.success) {
                        alert("✅ Próximo año activado para reservas");
                      } else {
                        alert("❌ Error al activar el próximo año");
                      }
                    } catch (error) {
                      console.error("Error activating next year:", error);
                      alert("❌ Error al activar el próximo año");
                    }
                  }
                }}
              >
                Próximo Año
              </Button>
            </div>
          </div>
        </Card>

        {/* Acciones de emergencia */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Icon
                className="text-orange-500"
                name="AlertTriangle"
                size={20}
              />
              <Text color="#964f20" variant="subtitle">
                Acciones de Emergencia
              </Text>
            </div>

            <Text className="text-sm" color="color-on-surface" variant="body">
              Herramientas para situaciones especiales (usar con precaución)
            </Text>

            <div className="space-y-2">
              <Button
                fullWidth
                size="sm"
                variant="warning"
                onClick={async () => {
                  if (
                    confirm(
                      "⚠️ ¿Cerrar el estudio MAÑANA?\n\nEsto bloqueará todo el día siguiente.",
                    )
                  ) {
                    const tomorrow = new Date();

                    tomorrow.setDate(tomorrow.getDate() + 1);
                    const dateStr = tomorrow.toISOString().split("T")[0];

                    try {
                      const result = await togglePeriodBatch(
                        dateStr,
                        dateStr,
                        "deactivate",
                      );

                      if (result.success) {
                        alert("✅ Estudio cerrado para mañana");
                      } else {
                        alert("❌ Error al cerrar el estudio para mañana");
                      }
                    } catch (error) {
                      console.error("Error closing tomorrow:", error);
                      alert("❌ Error al cerrar el estudio para mañana");
                    }
                  }
                }}
              >
                ⚠️ Cerrar Mañana
              </Button>

              <Button
                fullWidth
                size="sm"
                variant="warning"
                onClick={async () => {
                  if (
                    confirm(
                      "⚠️ ¿Cerrar el estudio esta SEMANA?\n\nEsto bloqueará los próximos 7 días.",
                    )
                  ) {
                    const today = new Date();
                    const nextWeek = new Date();

                    nextWeek.setDate(nextWeek.getDate() + 7);

                    try {
                      const result = await togglePeriodBatch(
                        today.toISOString().split("T")[0],
                        nextWeek.toISOString().split("T")[0],
                        "deactivate",
                      );

                      if (result.success) {
                        alert("✅ Estudio cerrado para esta semana");
                      } else {
                        alert("❌ Error al cerrar el estudio para esta semana");
                      }
                    } catch (error) {
                      console.error("Error closing this week:", error);
                      alert("❌ Error al cerrar el estudio para esta semana");
                    }
                  }
                }}
              >
                ⚠️ Cerrar Esta Semana
              </Button>

              <Button
                fullWidth
                size="sm"
                variant="danger"
                onClick={async () => {
                  if (
                    confirm(
                      "🚨 ¿CERRAR TODO?\n\nEsto desactivará TODOS los horarios de la semana.\n\n¡Esta acción no se puede deshacer fácilmente!",
                    )
                  ) {
                    try {
                      const result = await emergencyCloseAll();

                      if (result.success) {
                        alert(
                          "🚨 ¡ESTUDIO CERRADO COMPLETAMENTE! Todos los horarios semanales han sido desactivados.",
                        );
                      } else {
                        alert("❌ Error al cerrar completamente el estudio");
                      }
                    } catch (error) {
                      console.error("Error in emergency close all:", error);
                      alert("❌ Error al cerrar completamente el estudio");
                    }
                  }
                }}
              >
                🚨 Cerrar Todo
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Información */}
      <Card className="p-6">
        <div className="space-y-3">
          <Text color="#964f20" variant="subtitle">
            Información Importante
          </Text>
          <div className="space-y-2 text-sm">
            <Text className="text-sm" color="color-on-surface" variant="body">
              • <strong>Configuraciones Predefinidas:</strong> Aplican horarios
              estándar a toda la semana
            </Text>
            <Text className="text-sm" color="color-on-surface" variant="body">
              • <strong>Generar Slots:</strong> Activa un período eliminando
              bloqueos existentes
            </Text>
            <Text className="text-sm" color="color-on-surface" variant="body">
              • <strong>Activar Período:</strong> Elimina bloqueos y permite
              reservas en el rango seleccionado
            </Text>
            <Text className="text-sm" color="color-on-surface" variant="body">
              • <strong>Desactivar Período:</strong> Bloquea completamente un
              rango de fechas
            </Text>
            <Text className="text-sm" color="color-on-surface" variant="body">
              • <strong>Acciones de Emergencia:</strong> Cierran inmediatamente
              días o toda la disponibilidad
            </Text>
            <Text className="text-sm" color="color-on-surface" variant="body">
              • Los slots se generan dinámicamente basándose en la configuración
              semanal
            </Text>
            <Text className="text-sm" color="color-on-surface" variant="body">
              • Siempre verifica las fechas antes de aplicar cambios masivos
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuickConfigManager;
