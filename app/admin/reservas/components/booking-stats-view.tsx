"use client";
import React, { useState, useEffect } from "react";
import { Text, Button, Card, Icon } from "citrica-ui-toolkit";
import { Progress } from "@heroui/react";

import { useAdminBookings, BookingStats } from "@/app/hooks/useAdminBookings";

const BookingStatsView = () => {
  const { isLoading, getMonthStats } = useAdminBookings();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [stats, setStats] = useState<BookingStats | null>(null);

  useEffect(() => {
    loadStats();
  }, [currentDate]);

  const loadStats = async () => {
    const result = await getMonthStats(
      currentDate.getMonth(),
      currentDate.getFullYear(),
    );

    if (result.success && result.stats) {
      setStats(result.stats);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const goToCurrentMonth = () => {
    setCurrentDate(new Date());
  };

  const monthYear = currentDate.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  // Calcular porcentajes con los nuevos campos
  const reservationPercentage =
    stats && stats.total_days > 0
      ? Math.round((stats.days_with_bookings / stats.total_days) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <Text className="capitalize" color="#964f20" variant="title">
              Estadísticas - {monthYear}
            </Text>
            <Text color="color-on-surface" variant="body">
              Métricas de reservas del estudio
            </Text>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              startContent={<Icon name="ChevronLeft" size={16} />}
              variant="secondary"
              onClick={goToPreviousMonth}
            >
              Anterior
            </Button>
            <Button size="sm" variant="secondary" onClick={goToCurrentMonth}>
              Actual
            </Button>
            <Button
              endContent={<Icon name="ChevronRight" size={16} />}
              size="sm"
              variant="secondary"
              onClick={goToNextMonth}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </Card>

      {/* Statistics Cards */}
      {isLoading ? (
        <Card className="p-6">
          <div className="text-center py-8">
            <Text color="color-on-surface" variant="body">
              Cargando estadísticas...
            </Text>
          </div>
        </Card>
      ) : !stats ? (
        <Card className="p-6">
          <div className="text-center py-8">
            <Icon
              className="mx-auto text-gray-400 mb-4"
              name="AlertCircle"
              size={48}
            />
            <Text className="mb-2" color="color-on-surface" variant="title">
              No se pudieron cargar las estadísticas
            </Text>
            <Text color="color-on-surface" variant="body">
              Intenta recargar la página o seleccionar otro mes
            </Text>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Días del mes */}
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon className="text-blue-600" name="Calendar" size={24} />
                </div>
              </div>
              <div className="flex-1">
                <Text
                  className="text-2xl font-bold"
                  color="color-on-surface"
                  variant="title"
                >
                  {stats.total_days}
                </Text>
                <Text color="color-on-surface" variant="subtitle">
                  Días del Mes
                </Text>
                <Text
                  className="text-sm"
                  color="color-on-surface"
                  variant="body"
                >
                  Total de días en {monthYear}
                </Text>
              </div>
            </div>
          </Card>

          {/* Días con reservas */}
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon
                    className="text-green-600"
                    name="CheckCircle"
                    size={24}
                  />
                </div>
              </div>
              <div className="flex-1">
                <Text
                  className="text-2xl font-bold"
                  color="color-on-surface"
                  variant="title"
                >
                  {stats.days_with_bookings}
                </Text>
                <Text color="color-on-surface" variant="subtitle">
                  Días con Reservas
                </Text>
                <Text
                  className="text-sm"
                  color="color-on-surface"
                  variant="body"
                >
                  {reservationPercentage}% de días ocupados
                </Text>
                <div className="mt-2">
                  <Progress
                    className="max-w-md"
                    color="success"
                    value={reservationPercentage}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Total reservas */}
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon className="text-purple-600" name="Clock" size={24} />
                </div>
              </div>
              <div className="flex-1">
                <Text
                  className="text-2xl font-bold"
                  color="color-on-surface"
                  variant="title"
                >
                  {stats.total_bookings}
                </Text>
                <Text color="color-on-surface" variant="subtitle">
                  Total Reservas
                </Text>
                <Text
                  className="text-sm"
                  color="color-on-surface"
                  variant="body"
                >
                  Reservas confirmadas en el mes
                </Text>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Summary Card */}
      {stats && (
        <Card className="p-6">
          <Text className="mb-4" color="#964f20" variant="subtitle">
            Resumen del Mes
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Text className="text-sm" color="color-on-surface" variant="body">
                • Días con actividad: {stats.days_with_bookings} de{" "}
                {stats.total_days} días
              </Text>
              <Text className="text-sm" color="color-on-surface" variant="body">
                • Promedio de reservas por día activo:{" "}
                {stats.days_with_bookings > 0
                  ? Math.round(
                      (stats.total_bookings / stats.days_with_bookings) * 10,
                    ) / 10
                  : 0}
              </Text>
              <Text className="text-sm" color="color-on-surface" variant="body">
                • Días libres: {stats.total_days - stats.days_with_bookings}{" "}
                días
              </Text>
            </div>
            <div>
              <Text className="text-sm" color="color-on-surface" variant="body">
                • Nivel de ocupación: {reservationPercentage}%
              </Text>
              <Text className="text-sm" color="color-on-surface" variant="body">
                • Total de sesiones: {stats.total_bookings}
              </Text>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default BookingStatsView;
