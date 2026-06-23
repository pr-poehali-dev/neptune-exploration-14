import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ProgramSection } from "@/components/sections/program-section"
import { ContactSection } from "@/components/sections/contact-section"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"
import { useRef, useEffect, useState } from "react"

export default function Index() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number>()

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: "smooth",
      })
      setCurrentSection(index)
    }
  }

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const deltaY = touchStartY.current - touchEndY
      const deltaX = touchStartX.current - touchEndX

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < 5) {
          scrollToSection(currentSection + 1)
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()

        if (!scrollContainerRef.current) return

        scrollContainerRef.current.scrollBy({
          left: e.deltaY,
          behavior: "instant",
        })

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const newSection = Math.round(scrollContainerRef.current.scrollLeft / sectionWidth)
        if (newSection !== currentSection) {
          setCurrentSection(newSection)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSection])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = undefined
          return
        }

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)

        if (newSection !== currentSection && newSection >= 0 && newSection <= 5) {
          setCurrentSection(newSection)
        }

        scrollThrottleRef.current = undefined
      })
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current)
      }
    }
  }, [currentSection])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#0072ff"
            colorB="#8bc53f"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#0066ff"
            upColor="#0066ff"
            downColor="#d1d1d1"
            leftColor="#8bc53f"
            rightColor="#8bc53f"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-4 transition-opacity duration-700 md:px-12 md:py-6 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <img
            src="https://cdn.poehali.dev/projects/ae1e036a-b375-45bd-ad56-d4e27eaef002/bucket/956d5851-bf42-4e09-a901-61a7ab776fd7.png"
            alt="ПромЭксперт"
            className="h-8 w-auto object-contain md:h-10"
          />
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {["Форум", "Темы", "Спикеры", "О форуме", "Программа", "Регистрация"].map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${
                currentSection === index ? "text-foreground" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              {item}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                  currentSection === index ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <MagneticButton variant="secondary" onClick={() => scrollToSection(5)}>
            Регистрация
          </MagneticButton>
        </div>

        {/* Mobile burger */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/10 backdrop-blur-md md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={18} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-md md:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <img
              src="https://cdn.poehali.dev/projects/ae1e036a-b375-45bd-ad56-d4e27eaef002/bucket/956d5851-bf42-4e09-a901-61a7ab776fd7.png"
              alt="ПромЭксперт"
              className="h-8 w-auto object-contain"
            />
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon name="X" size={18} />
            </button>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-2 px-6">
            {["Форум", "Темы", "Спикеры", "О форуме", "Программа"].map((item, index) => (
              <button
                key={item}
                onClick={() => { scrollToSection(index); setMobileMenuOpen(false) }}
                className={`border-b border-foreground/10 py-4 text-left font-sans text-2xl font-light transition-colors ${
                  currentSection === index ? "text-accent" : "text-foreground/80"
                }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => { scrollToSection(5); setMobileMenuOpen(false) }}
              className="mt-4 rounded-xl bg-accent py-4 text-center font-sans text-lg font-medium text-white"
            >
              Зарегистрироваться
            </button>
          </div>
        </div>
      )}

      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 flex h-screen overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hero Section */}
        <section className="flex min-h-screen w-screen shrink-0 flex-col justify-end px-4 pb-10 pt-16 md:px-12 md:pb-20 md:pt-20">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 backdrop-blur-md duration-700 md:mb-4 md:px-4 md:py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse md:h-2 md:w-2" />
              <p className="font-mono text-[11px] text-foreground/90 md:text-xs">12–13 сентября 2026 · Иваново</p>
            </div>
            <h1 className="mb-4 animate-in fade-in slide-in-from-bottom-8 font-sans text-3xl font-light leading-[1.05] tracking-tight text-foreground duration-1000 md:mb-5 md:text-6xl lg:text-7xl">
              <span className="text-balance">
                Форум <span className="font-semibold text-accent">ИНДУСТРИЯ</span> БУДУЩЕГО 2026
              </span>
            </h1>
            <p className="mb-5 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-sm leading-relaxed text-foreground/90 duration-1000 delay-200 md:mb-6 md:text-lg">
              <span className="text-pretty">
                Все актуальные темы лёгкой промышленности — от автоматизации производства до поиска клиентов. Участие бесплатное, нужна только регистрация.
              </span>
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-3 duration-1000 delay-300 sm:flex-row sm:items-center">
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={() => scrollToSection(5)}
              >
                Зарегистрироваться
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(4)}>
                Программа
              </MagneticButton>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-2">
              <p className="font-mono text-[10px] text-foreground/80 md:text-xs">Листайте вправо</p>
              <div className="flex h-5 w-10 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md md:h-6 md:w-12">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/80 md:h-2 md:w-2" />
              </div>
            </div>
          </div>
        </section>

        <WorkSection />
        <ServicesSection />
        <AboutSection scrollToSection={scrollToSection} />
        <ProgramSection scrollToSection={scrollToSection} />
        <ContactSection />
      </div>

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}