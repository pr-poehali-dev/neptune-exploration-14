import { useReveal } from "@/hooks/use-reveal"

const speakers = [
  { name: "Евгений Криницин", topic: "ERP для швейных производств", direction: "top" },
  { name: "Алексей Антонов", topic: "СЕО «ПромЭксперт» · развитие предприятий и оптимизация", direction: "right" },
  { name: "Антон Гуреев", topic: "Управление Fashion-проектами · маркетинг и продажи", direction: "left" },
  { name: "Керим Жумаев", topic: "Учредитель ООО «НФЭС» · основатель бренда nfes", direction: "bottom" },
  { name: "Дмитрий Тугушев", topic: "Директор департамента эконом. развития Ивановской обл.", direction: "left" },
  { name: "Никита Серов", topic: "Блогер, предприниматель · «Serovski Brand»", direction: "right" },
  { name: "Юлия Смирнова", topic: "Автоматизация производств · стратегическое управление", direction: "bottom" },
]

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-5 transition-all duration-700 md:mb-8 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-1 font-sans text-2xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Спикеры
          </h2>
          <p className="font-mono text-[10px] text-foreground/60 md:text-sm">/ Эксперты лёгкой промышленности</p>
        </div>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5 md:gap-x-12 lg:gap-x-20 xl:grid-cols-3 xl:gap-y-6">
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
        case "left": return "-translate-x-16 opacity-0"
        case "right": return "translate-x-16 opacity-0"
        case "top": return "-translate-y-16 opacity-0"
        case "bottom": return "translate-y-16 opacity-0"
        default: return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="mb-1 flex items-center gap-2">
        <div className="h-px w-5 bg-accent/50 transition-all duration-300 group-hover:w-8 group-hover:bg-accent md:w-6" />
        <span className="font-mono text-[10px] text-accent md:text-xs">0{index + 1}</span>
      </div>
      <h3 className="mb-0.5 font-sans text-base font-light text-foreground md:text-xl">{speaker.name}</h3>
      <p className="text-[11px] leading-relaxed text-foreground/60 md:text-sm">{speaker.topic}</p>
    </div>
  )
}
