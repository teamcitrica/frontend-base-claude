'use client'
import React from 'react'
import { Button, Container, Col, Text } from 'citrica-ui-toolkit'

const PageHome = () => {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-black/5 dark:border-white/10">
        <Container noPadding>
          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            <div className="flex items-center justify-between h-20 px-6 lg:px-20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black dark:bg-white flex items-center justify-center">
                  <span className="text-white dark:text-black text-xl">💪</span>
                </div>
                <Text variant="title" as="h2" weight="bold" className="tracking-wider">
                  DUMBBELLDANCE
                </Text>
              </div>
              <nav className="hidden md:flex items-center gap-10">
                <a className="text-xs font-bold tracking-widest hover:text-[#EAFF00] transition-colors" href="#">CURSO</a>
                <a className="text-xs font-bold tracking-widest hover:text-[#EAFF00] transition-colors" href="#">EXAMEN</a>
                <a className="text-xs font-bold tracking-widest hover:text-[#EAFF00] transition-colors" href="#">REDDI</a>
                <a className="text-xs font-bold tracking-widest hover:text-[#EAFF00] transition-colors" href="#">NOSOTROS</a>
              </nav>
              <div className="flex items-center gap-4">
                <button className="text-xs font-bold tracking-widest hover:opacity-70 transition-opacity">LOGIN</button>
                <Button variant="primary" className="px-6 py-3 text-xs font-black tracking-widest uppercase">
                  COMENZAR
                </Button>
              </div>
            </div>
          </Col>
        </Container>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
            style={{ filter: 'grayscale(100%) contrast(110%)' }}
            poster="https://lh3.googleusercontent.com/aida-public/AB6AXuDudZiOA3i4XaRnP6vSde9aJ9WPiGGbvKGXy-FrhmK9GSrgt6eCcD7QJdNIm5FVA6UzIkxJfyeWV5EhQnZi1LSf6ueTfCcrNWv_IRzWXdg9QOEjiqqj0ubgJ32TmZN08BWK7h5nz4nAQpplZ1GkrB9SXOp7E6I5GMFm23zipKEP898kEi2tv1Kq50V5_ZGVFcxf5BZvC8uYVYpnck4vXQPmaPEcDUFYhlpVjmaQcIqpkaHHYHnbfhtaDE7F4IMKYlOkq7O0ajVE62x5"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-exercising-in-a-gym-with-dumbbells-34444-large.mp4" type="video/mp4" />
          </video>
        </div>
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
              <Text
                variant="display"
                as="h1"
                weight="bold"
                color="#FFF"
                className="text-5xl md:text-7xl lg:text-8xl leading-tight mb-8 tracking-normal uppercase"
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                CERTIFÍCATE CON EL ESTÁNDAR DE ÉLITE: DOMINA EL MÉTODO DUMBBELLDANCE Y LIDERA EL MERCADO FITNESS.
              </Text>
              <Text
                variant="body"
                as="p"
                color="rgba(255, 255, 255, 0.9)"
                className="text-lg md:text-2xl font-normal leading-relaxed max-w-4xl mx-auto mb-12"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Accede a la metodología de alto rendimiento diseñada por Erika Santiago (NASM) que fusiona técnica científica de mancuernas con el poder del baile. Tu carrera profesional comienza aquí.
              </Text>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <Button variant="primary" className="px-12 py-6 text-lg font-black tracking-tighter uppercase">
                  INICIAR CERTIFICACIÓN
                </Button>
                <Button variant="secondary" className="px-12 py-6 text-lg font-black tracking-tighter uppercase">
                  VER PROGRAMA
                </Button>
              </div>
            </div>
          </Col>
        </Container>
      </section>

      {/* Certificación en 24 horas */}
      <section className="bg-white dark:bg-black py-24 border-b border-black/5">
        <Container>
          <Col cols={{ sm: 4, md: 3, lg: 6 }}>
            <div className="w-full aspect-[4/5] bg-neutral-100 dark:bg-neutral-900 bg-cover bg-center transition-all duration-700"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBkoqOGTujtFSg_xd2_gcu0jJgBTJidf4FHKn0z9YNO142Bvlh4TASwUNIIQZKKdscbxgImRXg2y-t0SJCXtmYWeByzU8yvQfEK_Hb9FIW-LIBWR_Ev94_AbG7X0hZJL9fIvBQdXNcHmOE9lfUwfxlP1DnuAmasANYW3uTd4BOR5XJmp8iAOzyguLFGvRC4JfmDBWk0RWvxIA3EQZgo_nfN2tP47D72rYYr-zqccO5czvApKQBAhOUSiyC5SVJBtRZx6igGFW0TBK1R')",
                filter: 'grayscale(100%)'
              }}
            ></div>
          </Col>
          <Col cols={{ sm: 4, md: 3, lg: 6 }}>
            <div className="w-full space-y-8">
              <Text
                variant="display"
                as="h2"
                weight="bold"
                className="text-5xl md:text-7xl tracking-tighter leading-none italic uppercase"
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                CERTIFICACIÓN<br/>EN 24 HORAS
              </Text>
              <div className="h-1 w-24 bg-[#EAFF00]"></div>
              <Text
                variant="body"
                as="p"
                className="text-xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-lg"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Nuestro sistema 100% automatizado está diseñado para la eficiencia técnica. Sin esperas burocráticas, solo formación de élite y validación inmediata.
              </Text>
              <div className="grid grid-cols-2 gap-8 py-8 border-t border-black/10 dark:border-white/10">
                <div>
                  <Text variant="title" as="p" weight="bold" className="text-3xl tracking-tighter" style={{ fontFamily: 'Anton, sans-serif' }}>
                    100%
                  </Text>
                  <Text variant="label" as="p" color="#737373" className="text-xs font-bold tracking-widest uppercase">
                    Digital
                  </Text>
                </div>
                <div>
                  <Text variant="title" as="p" weight="bold" className="text-3xl tracking-tighter" style={{ fontFamily: 'Anton, sans-serif' }}>
                    HD
                  </Text>
                  <Text variant="label" as="p" color="#737373" className="text-xs font-bold tracking-widest uppercase">
                    Librería Video
                  </Text>
                </div>
              </div>
            </div>
          </Col>
        </Container>
      </section>

      {/* Tres Pilares del Éxito */}
      <section className="bg-white dark:bg-black py-32">
        <Container>
          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            <div className="mb-20 space-y-4">
              <Text
                variant="display"
                as="h2"
                weight="bold"
                className="text-4xl md:text-5xl tracking-tighter italic uppercase"
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                TRES PILARES DEL ÉXITO
              </Text>
              <Text
                variant="body"
                as="p"
                className="text-neutral-500 text-lg uppercase tracking-wide"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                METODOLOGÍA DE ALTO RENDIMIENTO PARA LÍDERES FITNESS.
              </Text>
            </div>
          </Col>

          <Col cols={{ sm: 4, md: 2, lg: 4 }}>
            <div className="p-12 border border-black/10 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors group">
              <span className="text-4xl mb-8 block group-hover:text-[#EAFF00] transition-colors">📚</span>
              <Text variant="title" as="h3" weight="bold" className="text-2xl mb-4 tracking-tight uppercase" style={{ fontFamily: 'Anton, sans-serif' }}>
                CURSO DE INSTRUCTOR
              </Text>
              <Text variant="body" as="p" textColor="color-on-surface-var" className="font-light leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Acceso inmediato a manuales técnicos digitales y librería de videos en alta definición. Formación técnica exhaustiva desde el minuto uno.
              </Text>
            </div>
          </Col>

          <Col cols={{ sm: 4, md: 2, lg: 4 }}>
            <div className="p-12 border border-black/10 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors group">
              <span className="text-4xl mb-8 block group-hover:text-[#EAFF00] transition-colors">🎓</span>
              <Text variant="title" as="h3" weight="bold" className="text-2xl mb-4 tracking-tight uppercase" style={{ fontFamily: 'Anton, sans-serif' }}>
                EXAMEN DE CERTIFICACIÓN
              </Text>
              <Text variant="body" as="p" textColor="color-on-surface-var" className="font-light leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Evaluación rigurosa de 100 preguntas diseñada para validar tu excelencia técnica. Dispones de 3 intentos para alcanzar la maestría.
              </Text>
            </div>
          </Col>

          <Col cols={{ sm: 4, md: 2, lg: 4 }}>
            <div className="p-12 border border-black/10 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors group">
              <span className="text-4xl mb-8 block group-hover:text-[#EAFF00] transition-colors">🌍</span>
              <Text variant="title" as="h3" weight="bold" className="text-2xl mb-4 tracking-tight uppercase" style={{ fontFamily: 'Anton, sans-serif' }}>
                RED DE INSTRUCTORES
              </Text>
              <Text variant="body" as="p" textColor="color-on-surface-var" className="font-light leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Acceso exclusivo a REDDI. Mapa global de instructores activos, educación continua y networking profesional de alto nivel.
              </Text>
            </div>
          </Col>
        </Container>
      </section>

      {/* Reglas Claras Section */}
      <section className="bg-neutral-100 dark:bg-[#141414] py-24">
        <Container>
          <Col cols={{ sm: 4, md: 3, lg: 6 }}>
            <div className="space-y-12">
              <div className="space-y-4">
                <Text
                  variant="headline"
                  as="h2"
                  weight="bold"
                  className="text-3xl tracking-tighter italic uppercase"
                  style={{ fontFamily: 'Anton, sans-serif' }}
                >
                  REGLAS CLARAS
                </Text>
                <Text
                  variant="label"
                  as="p"
                  className="text-neutral-500 uppercase text-sm tracking-widest font-bold"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  COMPROMISO CON LA EXCELENCIA
                </Text>
              </div>
              <div className="space-y-8">
                <div className="flex gap-6 pb-8 border-b border-black/5 dark:border-white/5">
                  <Text variant="title" as="div" weight="bold" color="#EAFF00" className="text-xl" style={{ fontFamily: 'Anton, sans-serif' }}>
                    01
                  </Text>
                  <div>
                    <Text variant="subtitle" as="h4" weight="bold" className="uppercase tracking-tighter mb-2">
                      Vigencia Anual
                    </Text>
                    <Text variant="body" as="p" textColor="color-on-surface-var" className="text-sm leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      La certificación tiene una validez de 12 meses. Mantenemos el estándar de calidad mediante renovación anual obligatoria.
                    </Text>
                  </div>
                </div>
                <div className="flex gap-6 pb-8 border-b border-black/5 dark:border-white/5">
                  <Text variant="title" as="div" weight="bold" color="#EAFF00" className="text-xl" style={{ fontFamily: 'Anton, sans-serif' }}>
                    02
                  </Text>
                  <div>
                    <Text variant="subtitle" as="h4" weight="bold" className="uppercase tracking-tighter mb-2">
                      Límite de Intentos
                    </Text>
                    <Text variant="body" as="p" textColor="color-on-surface-var" className="text-sm leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Contamos con un sistema riguroso. Tienes un máximo de 3 intentos para aprobar el examen técnico de 100 preguntas.
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col cols={{ sm: 4, md: 3, lg: 6 }}>
            <div className="bg-white dark:bg-black p-12 border border-black/5 dark:border-white/10 space-y-10">
              <Text variant="title" as="h3" weight="bold" className="text-xl tracking-widest uppercase" style={{ fontFamily: 'Anton, sans-serif' }}>
                Pagos Seguros
              </Text>
              <div className="flex flex-wrap gap-8 opacity-40 transition-all duration-500 hover:opacity-100"
                style={{ filter: 'grayscale(100%)' }}
              >
                <div className="h-8 w-24 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold text-xs uppercase tracking-widest">STRIPE</div>
                <div className="h-8 w-24 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold text-xs uppercase tracking-widest">PAYPAL</div>
                <div className="h-8 w-24 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold text-xs uppercase tracking-widest">VISA</div>
                <div className="h-8 w-24 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold text-xs uppercase tracking-widest">MASTERCARD</div>
              </div>
              <div className="p-8 bg-[#EAFF00]/5 border border-[#EAFF00]/20">
                <Text variant="body" as="p" className="text-sm font-medium leading-relaxed italic" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  "El sistema de certificación más eficiente que he utilizado. Directo al grano, técnico y con reconocimiento global inmediato."
                </Text>
                <Text variant="label" as="p" color="#EAFF00" className="mt-4 text-xs font-bold tracking-widest uppercase">
                  — Master Coach Pro
                </Text>
              </div>
            </div>
          </Col>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-20">
        <Container>
          <Col cols={{ sm: 4, md: 3, lg: 6 }}>
            <div className="space-y-6 pb-20 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white flex items-center justify-center">
                  <span className="text-black text-sm">💪</span>
                </div>
                <Text variant="title" as="h2" weight="bold" className="text-lg tracking-wider uppercase" style={{ fontFamily: 'Anton, sans-serif' }}>
                  DUMBBELLDANCE
                </Text>
              </div>
              <Text
                variant="body"
                as="p"
                className="text-neutral-500 text-sm max-w-sm uppercase tracking-wider leading-loose"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Forjando el futuro de la instrucción fitness a través de tecnología y estándares de élite.
              </Text>
            </div>
          </Col>

          <Col cols={{ sm: 4, md: 1.5, lg: 3 }}>
            <div className="space-y-4 pb-20 border-b border-white/10 md:border-b-0">
              <Text variant="label" as="h4" color="#A3A3A3" className="text-xs font-bold tracking-[0.2em] uppercase">
                Plataforma
              </Text>
              <nav className="flex flex-col gap-2">
                <a className="text-sm hover:text-[#EAFF00] transition-colors uppercase tracking-tight" href="#" style={{ fontFamily: 'Roboto, sans-serif' }}>El Curso</a>
                <a className="text-sm hover:text-[#EAFF00] transition-colors uppercase tracking-tight" href="#" style={{ fontFamily: 'Roboto, sans-serif' }}>Examen Online</a>
                <a className="text-sm hover:text-[#EAFF00] transition-colors uppercase tracking-tight" href="#" style={{ fontFamily: 'Roboto, sans-serif' }}>Mapa REDDI</a>
              </nav>
            </div>
          </Col>

          <Col cols={{ sm: 4, md: 1.5, lg: 3 }}>
            <div className="space-y-4 pb-20 border-b border-white/10 md:border-b-0">
              <Text variant="label" as="h4" color="#A3A3A3" className="text-xs font-bold tracking-[0.2em] uppercase">
                Legal
              </Text>
              <nav className="flex flex-col gap-2">
                <a className="text-sm hover:text-[#EAFF00] transition-colors uppercase tracking-tight" href="#" style={{ fontFamily: 'Roboto, sans-serif' }}>Reembolsos</a>
                <a className="text-sm hover:text-[#EAFF00] transition-colors uppercase tracking-tight" href="#" style={{ fontFamily: 'Roboto, sans-serif' }}>Privacidad</a>
                <a className="text-sm hover:text-[#EAFF00] transition-colors uppercase tracking-tight" href="#" style={{ fontFamily: 'Roboto, sans-serif' }}>Soporte</a>
              </nav>
            </div>
          </Col>

          <Col cols={{ sm: 4, md: 6, lg: 12 }}>
            <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <Text
                variant="label"
                as="p"
                className="text-[10px] text-neutral-600 font-bold tracking-widest uppercase"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                © 2024 DUMBBELLDANCE. TODOS LOS DERECHOS RESERVADOS.
              </Text>
              <div className="flex gap-6">
                <a className="text-neutral-400 hover:text-white transition-colors" href="#">
                  <span className="text-xl">↗</span>
                </a>
                <a className="text-neutral-400 hover:text-white transition-colors" href="#">
                  <span className="text-xl">@</span>
                </a>
              </div>
            </div>
          </Col>
        </Container>
      </footer>
    </>
  )
}

export default PageHome
