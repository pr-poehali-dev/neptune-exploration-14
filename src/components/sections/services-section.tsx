import { useReveal } from "@/hooks/use-reveal"

const speakers = [
  { name: "Евгений Криницин", topic: "ERP для швейных производств", direction: "top" },
  { name: "Алексей Антонов", topic: "СЕО «ПромЭксперт» · развитие промышленных предприятий и оптимизация процессов", direction: "right" },
  { name: "Антон Гуреев", topic: "Управление Fashion-проектами · операционное управление, маркетинг и продажи в модной индустрии", direction: "left" },
  { name: "Керим Жумаев", topic: "Учредитель ООО «НФЭС» · основатель бренда женской одежды nfes", direction: "bottom" },
  { name: "Дмитрий Тугушев", topic: "Директор департамента экономического развития и торговли Ивановской области", direction: "left" },
  { name: "Никита Серов", topic: "Блогер, предприниматель · владелец компании «Serovski Brand»", direction: "right" },
  { name: "Юлия Смирнова", topic: "Эксперт в автоматизации производств · стратегическое управление и развитие фабрик", direction: "bottom" },
]

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Спикеры
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Эксперты лёгкой промышленности</p>
        </div>

        <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 md:gap-x-16 md:gap-y-8 lg:gap-x-24 xl:grid-cols-3">
          {speakers.map((speaker, i) => (
            <SpeakerCard key={i} speaker={speaker} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SpeakerCard({
  speaker,
  index,
  isVisible,
}: {
  speaker: { name: string; topic: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (speaker.direction) {
        case "left":
          return "-translate-x-16 opacity-0"
        case "right":
          return "translate-x-16 opacity-0"
        case "top":
          return "-translate-y-16 opacity-0"
        case "bottom":
          return "translate-y-16 opacity-0"
        default:
          return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="mb-2 flex items-center gap-3">
        <div className="h-px w-8 bg-accent/50 transition-all duration-300 group-hover:w-12 group-hover:bg-accent" />
        <span className="font-mono text-xs text-accent">0{index + 1}</span>
      </div>
      <h3 className="mb-2 font-sans text-xl font-light text-foreground md:text-2xl">{speaker.name}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-foreground/70 md:text-base">{speaker.topic}</p>
    </div>
  )
}
