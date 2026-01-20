"use client";
import React from "react";
import { Col, Container } from "@citrica/objects";
import { Text, Button, Icon } from "citrica-ui-toolkit";

import { siteConfig } from "@/config/site";

interface HeaderProps {
  logo?: React.ReactNode;
  variant?: "floating" | "split" | "basic"; // Nueva prop para las variantes
  className?: string;
  showButton?: boolean; // Prop para mostrar/ocultar el botón
  buttonText?: string; // Texto personalizable del botón
  onButtonClick?: () => void; // Función personalizable para el botón
}

const Header = ({
  logo,
  variant = "basic",
  className = "",
  showButton = false,
  buttonText = "GET STARTED",
  onButtonClick,
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = siteConfig.navLinks;

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1));

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  // Renderizar variante floating (como Matour)
  if (variant === "floating") {
    return (
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-transparent/60 shadow-md backdrop-blur-md"
            : "bg-transparent"
        } ${className}`}
      >
        <Container>
          <Col
            className="flex justify-between items-center py-4"
            cols={{ lg: 12, md: 6, sm: 4 }}
          >
            {/* Logo */}
            <div className="flex items-center">
              {logo ? (
                logo
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-8 h-8 bg-[#964f20] rounded-sm flex items-center justify-center">
                      <Text color="#FFFFFF" variant="label" weight="bold">
                        M
                      </Text>
                    </div>
                  </div>
                  <div>
                    <Text color="#FFFFFF" variant="title" weight="bold">
                      Matour
                    </Text>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Navigation Centrada */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="bg-white/60 backdrop-blur-md rounded-full px-8 py-2">
                <div className="flex items-center space-x-8">
                  {navItems.map((item, index) => (
                    <button
                      key={index}
                      className="transition-colors duration-200 hover:text-[#f0f0f0] text-white/90"
                      onClick={() => scrollToSection(item.href)}
                    >
                      <Text textColor="color-on-surface" variant="label">
                        {item.title}
                      </Text>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            {showButton && (
              <div className="hidden lg:block">
                <Button
                  className="bg-white text-black hover:bg-gray-100"
                  label={buttonText}
                  size="md"
                  variant="primary"
                  onClick={onButtonClick || (() => scrollToSection("#contact"))}
                />
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                className="p-2 !min-w-0"
                size="sm"
                variant="flat"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Icon className="var(--color-white)" name="Menu" size={24} />
              </Button>
            </div>
          </Col>
        </Container>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md">
            <Container>
              <Col className="py-6" cols={{ sm: 4 }}>
                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <button
                      key={index}
                      className="w-full text-left py-2 hover:text-gray-300 transition-colors text-white"
                      onClick={() => scrollToSection(item.href)}
                    >
                      <Text className="font-medium" variant="body">
                        {item.title}
                      </Text>
                    </button>
                  ))}

                  {showButton && (
                    <div className="pt-2">
                      <Button
                        fullWidth
                        className="bg-white text-black"
                        label={buttonText}
                        size="md"
                        variant="primary"
                        onClick={
                          onButtonClick || (() => scrollToSection("#contact"))
                        }
                      />
                    </div>
                  )}
                </div>
              </Col>
            </Container>
          </div>
        )}
      </nav>
    );
  }

  // Renderizar variante split (como Flowblox)
  if (variant === "split") {
    // Calcular distribución de elementos de navegación
    const totalItems = navItems.length;
    const leftItemsCount = Math.ceil(totalItems / 2); // Da preferencia al lado izquierdo
    const leftItems = navItems.slice(0, leftItemsCount);
    const rightItems = navItems.slice(leftItemsCount);

    return (
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--color-white)] shadow-md backdrop-blur-md"
            : "bg-[var(--color-white)] backdrop-blur-sm"
        } ${className}`}
      >
        <Container>
          <Col
            className="flex justify-between items-center py-4"
            cols={{ lg: 12, md: 6, sm: 4 }}
          >
            {/* Left Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {leftItems.map((item, index) => (
                <button
                  key={index}
                  className="transition-colors duration-200 hover:text-[#6366f1] text-gray-600"
                  onClick={() => scrollToSection(item.href)}
                >
                  <Text textColor="color-black" variant="body" weight="bold">
                    {item.title}
                  </Text>
                </button>
              ))}
            </div>

            {/* Logo Centrado */}
            <div className="flex items-center justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
              {logo ? (
                logo
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-8 h-8 bg-[#6366f1] rounded-lg flex items-center justify-center">
                      <Text color="#FFFFFF" variant="label" weight="bold">
                        F
                      </Text>
                    </div>
                  </div>
                  <div>
                    <Text textColor="color-black" variant="title" weight="bold">
                      Flowblox
                    </Text>
                  </div>
                </div>
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-8">
              {/* Right Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {rightItems.map((item, index) => (
                  <button
                    key={index}
                    className="transition-colors duration-200 hover:text-[#6366f1]"
                    onClick={() => scrollToSection(item.href)}
                  >
                    <Text textColor="color-black" variant="body" weight="bold">
                      {item.title}
                    </Text>
                  </button>
                ))}
              </div>

              {/* CTA Button */}
              {showButton && (
                <Button
                  className="bg-black text-white hover:bg-gray-800 rounded-full px-6"
                  label={
                    buttonText === "GET STARTED" ? "Get started" : buttonText
                  }
                  size="md"
                  variant="primary"
                  onClick={onButtonClick || (() => scrollToSection("#contact"))}
                />
              )}

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <Button
                  className="p-2 !min-w-0"
                  size="sm"
                  variant="flat"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Icon className="text-gray-600" name="Menu" size={24} />
                </Button>
              </div>
            </div>
          </Col>
        </Container>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
            <Container>
              <Col className="py-4" cols={{ sm: 4 }}>
                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <button
                      key={index}
                      className="w-full text-left py-2 hover:text-[#6366f1] transition-colors text-gray-600"
                      onClick={() => scrollToSection(item.href)}
                    >
                      <Text className="font-medium" variant="body">
                        {item.title}
                      </Text>
                    </button>
                  ))}

                  {showButton && (
                    <div className="pt-2">
                      <Button
                        fullWidth
                        className="bg-black text-white rounded-full"
                        label={
                          buttonText === "GET STARTED"
                            ? "Get started"
                            : buttonText
                        }
                        size="md"
                        variant="primary"
                        onClick={
                          onButtonClick || (() => scrollToSection("#contact"))
                        }
                      />
                    </div>
                  )}
                </div>
              </Col>
            </Container>
          </div>
        )}
      </nav>
    );
  }

  // Renderizar variante basic (con navegación completa como Lienzo Production Studio)
  if (variant === "basic") {
    return (
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--color-white)] shadow-lg backdrop-blur-md"
            : "bg-[var(--color-white)] backdrop-blur-sm"
        } ${className}`}
      >
        <Container>
          <Col
            className="flex justify-between items-center py-2"
            cols={{ lg: 12, md: 6, sm: 4 }}
          >
            {/* Logo */}
            <a className="flex items-center" href="#home">
              {logo ? (
                logo
              ) : (
                <img
                  alt="Lienzo Production Studio Logo"
                  className="h-10 w-auto"
                  src="/img/logo-lienzo.svg"
                />
              )}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  className="transition-colors duration-200 hover:text-[#964f20] text-[#222222]"
                  onClick={() => scrollToSection(item.href)}
                >
                  <Text className="font-medium" variant="body">
                    {item.title}
                  </Text>
                </button>
              ))}

              {showButton && (
                <Button
                  className="ml-4"
                  label={buttonText === "GET STARTED" ? "Reservar" : buttonText}
                  size="md"
                  variant="primary"
                  onClick={onButtonClick || (() => scrollToSection("#contact"))}
                />
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                className="p-2 !min-w-0"
                size="sm"
                variant="flat"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Icon className="text-[#222222]" name="Menu" size={24} />
              </Button>
            </div>
          </Col>
        </Container>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
            <Container>
              <Col className="py-4" cols={{ sm: 4 }}>
                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <button
                      key={index}
                      className="w-full text-left py-2 hover:text-[#964f20] transition-colors"
                      onClick={() => scrollToSection(item.href)}
                    >
                      <Text className="font-medium" variant="body">
                        {item.title}
                      </Text>
                    </button>
                  ))}

                  {showButton && (
                    <div className="pt-2">
                      <Button
                        fullWidth
                        label={
                          buttonText === "GET STARTED"
                            ? "Reservar Estudio"
                            : buttonText
                        }
                        size="md"
                        variant="primary"
                        onClick={
                          onButtonClick || (() => scrollToSection("#contact"))
                        }
                      />
                    </div>
                  )}
                </div>
              </Col>
            </Container>
          </div>
        )}
      </nav>
    );
  }

  // Fallback a la variante por defecto
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--color-white)] shadow-md backdrop-blur-md"
          : "bg-[var(--color-white)] backdrop-blur-sm"
      } ${className}`}
    >
      <Container>
        <Col
          className="flex justify-between items-center py-4"
          cols={{ lg: 12, md: 6, sm: 4 }}
        >
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {logo ? (
              logo
            ) : (
              <>
                <div className="flex items-center space-x-1">
                  <div className="w-8 h-8 bg-[#964f20] rounded-sm flex items-center justify-center">
                    <Text color="#FFFFFF" variant="label" weight="bold">
                      L
                    </Text>
                  </div>
                  <div className="w-2 h-8 bg-[#8d957e] rounded-sm" />
                </div>
                <div>
                  <Text
                    textColor="color-on-surface"
                    variant="subtitle"
                    weight="bold"
                  >
                    LIENZO
                  </Text>
                </div>
              </>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                className="transition-colors duration-200 hover:text-[#964f20] text-[#222222]"
                onClick={() => scrollToSection(item.href)}
              >
                <Text className="font-medium" variant="body">
                  {item.title}
                </Text>
              </button>
            ))}

            {showButton && (
              <Button
                className="ml-4"
                label={buttonText === "GET STARTED" ? "Reservar" : buttonText}
                size="md"
                variant="primary"
                onClick={onButtonClick || (() => scrollToSection("#contact"))}
              />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              className="p-2 !min-w-0"
              size="sm"
              variant="flat"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Icon className="text-[#222222]" name="Menu" size={24} />
            </Button>
          </div>
        </Col>
      </Container>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
          <Container>
            <Col className="py-4" cols={{ sm: 4 }}>
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    className="w-full text-left py-2 hover:text-[#964f20] transition-colors"
                    onClick={() => scrollToSection(item.href)}
                  >
                    <Text className="font-medium" variant="body">
                      {item.title}
                    </Text>
                  </button>
                ))}

                {showButton && (
                  <div className="pt-2">
                    <Button
                      fullWidth
                      label={
                        buttonText === "GET STARTED"
                          ? "Reservar Estudio"
                          : buttonText
                      }
                      size="md"
                      variant="primary"
                      onClick={
                        onButtonClick || (() => scrollToSection("#contact"))
                      }
                    />
                  </div>
                )}
              </div>
            </Col>
          </Container>
        </div>
      )}
    </nav>
  );
};

export default Header;
