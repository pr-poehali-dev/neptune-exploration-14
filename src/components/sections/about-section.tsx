import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"

export function AboutSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12 lg:gap-20">
          {/* Left */}
          <div>
            <div
              className={`mb-4 transition-all duration-700 md:mb-5 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-sans text-2xl font-light leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                О форуме
                <br />
                <span className="text-accent">ИНДУСТРИЯ</span>
                <br />
                <span className="text-foreground/40">БУДУЩЕГО</span>
              </h2>
            </div>

            <div
              className={`space-y-2 transition-all duration-700 md:space-y-3 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="max-w-md text-sm leading-relaxed text-foreground/80">
                12–13 сентября 2026 года в Иванове соберутся эксперты, владельцы фабрик и брендов лёгкой промышленности.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-foreground/80">
                Два дня практики: автоматизация производства, оптимизация процессов, маркетинг и поиск клиентов. Участие бесплатное — нужна только регистрация.
              </p>
            </div>
          </div>

          {/* Right — Stats */}
          <div className="flex flex-col justify-center space-y-4 md:space-y-8">
            {[
              { value: "2", label: "Дня", sublabel: "12–13 сентября 2026", direction: "right" },
              { value: "7", label: "Спикеров", sublabel: "Эксперты отрасли", direction: "left" },
              { value: "0₽", label: "Участие", sublabel: "Бесплатно по регистрации", direction: "right" },
            ].map((stat, i) => {
              const revealClass = !isVisible
                ? stat.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
                : "translate-x-0 opacity-100"

              return (
                <div
                  key={i}
                  className={`flex items-baseline gap-3 border-l-2 border-accent/40 pl-3 transition-all duration-700 md:gap-6 md:pl-6 ${revealClass}`}
                  style={{ transitionDelay: `${300 + i * 150}ms` }}
                >
                  <div className="text-3xl font-light text-foreground md:text-6xl lg:text-7xl">{stat.value}</div>
                  <div>
                    <div className="font-sans text-sm font-light text-foreground md:text-lg">{stat.label}</div>
                    <div className="font-mono text-[10px] text-foreground/50 md:text-xs">{stat.sublabel}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className={`mt-6 flex flex-wrap gap-3 transition-all duration-700 md:mt-10 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "750ms" }}
        >
          <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection?.(5)}>
            Зарегистрироваться
          </MagneticButton>
          <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection?.(4)}>
            Программа
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
