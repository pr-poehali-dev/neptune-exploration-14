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
      className="flex h-screen w-screen shrink-0 snap-start flex-col justify-center px-6 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-6 transition-all duration-700 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-1 font-sans text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Темы форума
          </h2>
          <p className="font-mono text-xs text-foreground/60 md:text-sm">/ Лёгкая промышленность · от идеи до клиента</p>
        </div>

        <div className="space-y-0">
          {topics.map((topic, i) => (
            <TopicCard key={i} topic={topic} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>

      {/* Бегущая строка партнёров */}
      <div
        className={`mt-8 w-full overflow-hidden border-y border-foreground/10 py-3 transition-all duration-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <div className="mb-2 px-6 md:px-12 lg:px-16">
          <p className="font-mono text-xs text-foreground/40">/ Партнёры форума</p>
        </div>
        <div className="relative flex w-full overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-8 whitespace-nowrap pr-8">
            {partners.map((p, i) => (
              <span key={i} className="font-sans text-base font-light text-foreground/60 md:text-lg">
                {p}<span className="ml-8 text-accent">•</span>
              </span>
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee items-center gap-8 whitespace-nowrap pr-8" aria-hidden="true">
            {partners.map((p, i) => (
              <span key={i} className="font-sans text-base font-light text-foreground/60 md:text-lg">
                {p}<span className="ml-8 text-accent">•</span>
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
      className={`group flex items-center justify-between border-b border-foreground/10 py-4 transition-all duration-700 hover:border-accent/40 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 120}ms`,
        marginLeft: index % 2 === 0 ? "0" : "auto",
        maxWidth: index % 2 === 0 ? "85%" : "90%",
      }}
    >
      <div className="flex items-baseline gap-4 md:gap-6">
        <span className="font-mono text-xs text-accent/60 transition-colors group-hover:text-accent md:text-sm">
          {topic.number}
        </span>
        <div>
          <h3 className="mb-0.5 font-sans text-lg font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-2xl lg:text-3xl">
            {topic.title}
          </h3>
          <p className="font-mono text-xs text-foreground/50">{topic.category}</p>
        </div>
      </div>
      <span className="font-mono text-xs text-foreground/30">{topic.year}</span>
    </div>
  )
}
