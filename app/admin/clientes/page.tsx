"use client";
import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
  Card,
  Icon,
  Input,
  Container,
  Col,
} from "citrica-ui-toolkit";
import {
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@heroui/react";
import { useCustomers } from "@/app/hooks/useCustomers";

const ClientesAdminPage = () => {
  const {
    isLoading,
    customers,
    getAllCustomers,
    deleteCustomer,
    getCustomerStats,
  } = useCustomers();

  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getAllCustomers();
    loadStats();
  }, []);

  const loadStats = async () => {
    const result = await getCustomerStats();

    if (result.success && result.stats) {
      setStats(result.stats);
    }
  };

  const handleSearch = async (search: string) => {
    setSearchTerm(search);
    await getAllCustomers(50, 0, search);
  };

  const handleDeleteCustomer = async (
    customerId: string,
    customerName: string,
  ) => {
    if (confirm(`¿Estás seguro de eliminar el cliente "${customerName}"?`)) {
      const result = await deleteCustomer(customerId);

      if (result.success) {
        getAllCustomers(50, 0, searchTerm);
        loadStats();
      } else {
        alert(result.error || "Error al eliminar el cliente");
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  return (
    <Container>
      <Col className="space-y-6" cols={{ lg: 12, md: 6, sm: 4 }}>
        {/* Header */}
        <div className="flex items-center gap-3">
          <Icon className="text-[#964f20]" name="Users" size={24} />
          <div>
            <Text color="#964f20" variant="title">
              Gestión de Clientes
            </Text>
            <p>
              <Text color="var(--color-on-surface)" variant="body">
                Administra la base de datos de clientes del estudio
              </Text>
            </p>
          </div>
        </div>

        {/* Estadísticas */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon className="text-blue-600" name="Users" size={20} />
                </div>
                <div>
                  <p>
                    <Text
                      className="text-sm"
                      color="color-on-surface"
                      variant="label"
                    >
                      Total Clientes
                    </Text>
                  </p>
                  <p>
                    <Text color="color-on-surface" variant="title">
                      {stats.total_customers}
                    </Text>
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Icon className="text-green-600" name="UserPlus" size={20} />
                </div>
                <div>
                  <p>
                    <Text
                      className="text-sm"
                      color="color-on-surface"
                      variant="label"
                    >
                      Nuevos este mes
                    </Text>
                  </p>
                  <p>
                    <Text color="color-on-surface" variant="title">
                      {stats.new_customers_this_month}
                    </Text>
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Icon className="text-purple-600" name="Calendar" size={20} />
                </div>
                <div>
                  <p>
                    <Text
                      className="text-sm"
                      color="color-on-surface"
                      variant="label"
                    >
                      Con Reservas
                    </Text>
                  </p>
                  <p>
                    <Text color="color-on-surface" variant="title">
                      {stats.customers_with_bookings}
                    </Text>
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Icon className="text-gray-600" name="UserX" size={20} />
                </div>
                <div>
                  <p>
                    <Text
                      className="text-sm"
                      color="color-on-surface"
                      variant="label"
                    >
                      Sin Reservas
                    </Text>
                  </p>
                  <p>
                    <Text color="color-on-surface" variant="title">
                      {stats.customers_without_bookings}
                    </Text>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Controles y búsqueda */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <Text color="#964f20" variant="title">
                Lista de Clientes
              </Text>
              <p>
                <Text color="var(--color-on-surface)" variant="body">
                  {customers.length} clientes registrados
                </Text>
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <Input
                className="w-full md:w-80"
                placeholder="Buscar por nombre, email o teléfono..."
                size="sm"
                startContent={<Icon name="Search" size={16} />}
                value={searchTerm}
                onValueChange={handleSearch}
              />

              {/* Botón para agregar cliente en futuras versiones */}
              {/* <Button
                size="sm"
                variant="primary"
                startContent={<Icon name="UserPlus" size={16} />}
              >
                Nuevo Cliente
              </Button> */}
            </div>
          </div>
        </Card>

        {/* Tabla de clientes */}
        <Card className="p-2">
          {isLoading ? (
            <div className="text-center py-8">
              <Spinner color="primary" size="lg" />
              <Text className="mt-4" color="color-on-surface" variant="body">
                Cargando clientes...
              </Text>
            </div>
          ) : customers.length === 0 ? (
            <div className="text-center py-8">
              <Icon
                className="mx-auto text-gray-400 mb-4"
                name="Users"
                size={48}
              />
              <Text className="mb-2" color="color-on-surface" variant="title">
                No hay clientes
              </Text>
              <Text color="color-on-surface" variant="body">
                {searchTerm
                  ? `No se encontraron clientes que coincidan con "${searchTerm}"`
                  : "Aún no hay clientes registrados en el sistema"}
              </Text>
            </div>
          ) : (
            <Table aria-label="Tabla de clientes">
              <TableHeader>
                <TableColumn>CLIENTE</TableColumn>
                <TableColumn>CONTACTO</TableColumn>
                <TableColumn>RESERVAS</TableColumn>
                <TableColumn>REGISTRO</TableColumn>
                <TableColumn className="flex justify-center items-center">
                  ACCIONES
                </TableColumn>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#964f20] text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {getInitials(customer.full_name)}
                        </div>
                        <div>
                          <p>
                            <Text color="color-on-surface" variant="body">
                              {customer.full_name}
                            </Text>
                          </p>
                          <p>
                            <Text
                              className="text-sm opacity-70"
                              color="color-on-surface"
                              variant="label"
                            >
                              ID: {customer.id.slice(0, 8)}...
                            </Text>
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div>
                        <p>
                          <Text color="color-on-surface" variant="body">
                            {customer.email}
                          </Text>
                        </p>
                        {customer.phone && (
                          <p>
                            <Text
                              className="text-sm"
                              color="color-on-surface"
                              variant="label"
                            >
                              {customer.phone}
                            </Text>
                          </p>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Chip
                          color={
                            customer._count?.bookings ? "primary" : "default"
                          }
                          size="sm"
                          variant="flat"
                        >
                          {customer._count?.bookings || 0} reservas
                        </Chip>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Text color="color-on-surface" variant="body">
                        {formatDate(customer.created_at)}
                      </Text>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          className="!min-w-0 !px-4"
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            // TODO: Implementar vista de detalles del cliente
                            alert("Funcionalidad de detalles en desarrollo");
                          }}
                        >
                          <Icon name="Eye" size={16} />
                        </Button>

                        <Button
                          className="!min-w-0 !px-4"
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            // TODO: Implementar edición de cliente
                            alert("Funcionalidad de edición en desarrollo");
                          }}
                        >
                          <Icon name="Edit" size={16} />
                        </Button>

                        <Button
                          className="!min-w-0 !px-4"
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            handleDeleteCustomer(
                              customer.id,
                              customer.full_name,
                            )
                          }
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </Col>
    </Container>
  );
};

export default ClientesAdminPage;
