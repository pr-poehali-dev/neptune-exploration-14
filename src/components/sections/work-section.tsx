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
      className="flex h-screen w-screen shrink-0 snap-start flex-col justify-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Темы форума
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Лёгкая промышленность · от идеи до клиента</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {topics.map((topic, i) => (
            <TopicCard key={i} topic={topic} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>

      {/* Бегущая строка партнёров */}
      <div
        className={`mt-10 w-full overflow-hidden border-y border-foreground/10 py-4 transition-all duration-700 md:mt-16 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <div className="mb-3 px-6 md:px-12 lg:px-16">
          <p className="font-mono text-xs text-foreground/50">/ Партнёры форума</p>
        </div>
        <div className="relative flex w-full overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-10 whitespace-nowrap pr-10">
            {partners.map((p, i) => (
              <span key={i} className="font-sans text-lg font-light text-foreground/70 md:text-2xl">
                {p}
                <span className="ml-10 text-accent">•</span>
              </span>
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee items-center gap-10 whitespace-nowrap pr-10" aria-hidden="true">
            {partners.map((p, i) => (
              <span key={i} className="font-sans text-lg font-light text-foreground/70 md:text-2xl">
                {p}
                <span className="ml-10 text-accent">•</span>
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
    if (!isVisible) {
      return topic.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group flex items-center justify-between border-b border-foreground/10 py-5 transition-all duration-700 hover:border-accent/40 md:py-6 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
        marginLeft: index % 2 === 0 ? "0" : "auto",
        maxWidth: index % 2 === 0 ? "85%" : "90%",
      }}
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span className="font-mono text-sm text-accent/60 transition-colors group-hover:text-accent md:text-base">
          {topic.number}
        </span>
        <div>
          <h3 className="mb-1 font-sans text-xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
            {topic.title}
          </h3>
          <p className="font-mono text-xs text-foreground/50 md:text-sm">{topic.category}</p>
        </div>
      </div>
      <span className="font-mono text-xs text-foreground/30 md:text-sm">{topic.year}</span>
    </div>
  )
}
