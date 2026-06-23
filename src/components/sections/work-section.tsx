import { useReveal } from "@/hooks/use-reveal"

const partners = [
  "ИВГПУ", "HomeStyle", "Бисер", "Исток Пром", "НФЕС", "Лидер Текс",
  "Текстиль Профи", "Бест Вестерн", "Гостиница Турист", "Зеленый Городок",
  "Шуйская водка", "Мой Бизнес", "Департамент эконом. развития",
  "JUKI", "ZOJE", "SEROV", "Унтекс",
]

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  const topics = [
    { number: "01", title: "Автоматизация производства", category: "ERP, MES, APS, WMS для швейных фабрик", year: "Цифра", direction: "left" },
    { number: "02", title: "Оптимизация процессов", category: "Развитие промышленных предприятий", year: "Рост", direction: "right" },
    { number: "03", title: "Маркетинг и продажи", category: "Поиск клиентов в fashion-индустрии", year: "Продажи", direction: "left" },
    { number: "04", title: "Управление и стратегия", category: "Операционное управление и развитие брендов", year: "Бизнес", direction: "right" },
  ]

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start flex-col justify-center px-4 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-4 transition-all duration-700 md:mb-6 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-1 font-sans text-2xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Темы форума
          </h2>
          <p className="font-mono text-[10px] text-foreground/60 md:text-sm">/ Лёгкая промышленность · от идеи до клиента</p>
        </div>

        <div className="space-y-0">
          {topics.map((topic, i) => (
            <TopicCard key={i} topic={topic} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>

      {/* Бегущая строка партнёров */}
      <div
        className={`mt-6 w-full overflow-hidden border-y border-foreground/10 py-2.5 transition-all duration-700 md:mt-8 md:py-3 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <div className="mb-1.5 px-4 md:px-12 lg:px-16">
          <p className="font-mono text-[9px] text-foreground/40 md:text-xs">/ Партнёры форума</p>
        </div>
        <div className="relative flex w-full overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-6 whitespace-nowrap pr-6 md:gap-8 md:pr-8">
            {partners.map((p, i) => (
              <span key={i} className="font-sans text-sm font-light text-foreground/60 md:text-base lg:text-lg">
                {p}<span className="ml-6 text-accent md:ml-8">•</span>
              </span>
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee items-center gap-6 whitespace-nowrap pr-6 md:gap-8 md:pr-8" aria-hidden="true">
            {partners.map((p, i) => (
              <span key={i} className="font-sans text-sm font-light text-foreground/60 md:text-base lg:text-lg">
                {p}<span className="ml-6 text-accent md:ml-8">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TopicCard({
  topic,
  index,
  isVisible,
}: {
  topic: { number: string; title: string; category: string; year: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) return topic.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group flex items-center justify-between border-b border-foreground/10 py-3 transition-all duration-700 hover:border-accent/40 md:py-4 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="flex items-baseline gap-3 md:gap-6">
        <span className="w-6 shrink-0 font-mono text-[10px] text-accent/60 transition-colors group-hover:text-accent md:text-sm">
          {topic.number}
        </span>
        <div>
          <h3 className="mb-0.5 font-sans text-base font-light text-foreground transition-transform duration-300 group-hover:translate-x-1 md:text-2xl lg:text-3xl">
            {topic.title}
          </h3>
          <p className="font-mono text-[10px] text-foreground/50 md:text-xs">{topic.category}</p>
        </div>
      </div>
      <span className="ml-2 shrink-0 font-mono text-[10px] text-foreground/30 md:text-xs">{topic.year}</span>
    </div>
  )
}
