import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"
import Icon from "@/components/ui/icon"

const days = [
  {
    day: "День 1",
    date: "12 сентября",
    items: [
      { time: "09:00", title: "Регистрация участников", type: "org" },
      { time: "10:00", title: "Открытие форума. Приветственное слово", speaker: "Дмитрий Тугушев", type: "talk" },
      { time: "10:30", title: "ERP для швейных производств: внедрение и эффект", speaker: "Евгений Криницин", type: "talk" },
      { time: "11:30", title: "Развитие промышленных предприятий и оптимизация процессов", speaker: "Алексей Антонов", type: "talk" },
      { time: "12:30", title: "Обед. Нетворкинг", type: "org" },
      { time: "14:00", title: "Автоматизация фабрики: стратегии и кейсы", speaker: "Юлия Смирнова", type: "talk" },
      { time: "15:30", title: "Панельная дискуссия: цифровое будущее лёгкой промышленности", type: "panel" },
      { time: "17:00", title: "Окончание первого дня", type: "org" },
    ],
  },
  {
    day: "День 2",
    date: "13 сентября",
    items: [
      { time: "09:30", title: "Начало второго дня. Приветствие", type: "org" },
      { time: "10:00", title: "Операционное управление и маркетинг в fashion-индустрии", speaker: "Антон Гуреев", type: "talk" },
      { time: "11:00", title: "Как построить бренд женской одежды с нуля", speaker: "Керим Жумаев", type: "talk" },
      { time: "12:00", title: "Блогерство и продажи: как предпринимателю выйти в онлайн", speaker: "Никита Серов", type: "talk" },
      { time: "13:00", title: "Обед. Нетворкинг", type: "org" },
      { time: "14:30", title: "Мастермайнд: разбор кейсов участников", type: "panel" },
      { time: "16:00", title: "Закрытие форума. Итоги", type: "org" },
    ],
  },
]

const typeStyle: Record<string, string> = {
  talk: "text-primary",
  panel: "text-accent",
  org: "text-foreground/40",
}

export function ProgramSection({ scrollToSection }: { scrollToSection?: (i: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)
  const [activeDay, setActiveDay] = useState(0)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start flex-col justify-center px-6 pt-20 pb-6 md:px-12 md:pt-20 md:pb-8 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl flex flex-col h-full justify-center">
        {/* Header */}
        <div
          className={`mb-4 flex items-end justify-between transition-all duration-700 md:mb-6 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
        >
          <div>
            <h2 className="mb-1 font-sans text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Программа
            </h2>
            <p className="font-mono text-xs text-foreground/60 md:text-sm">/ 12–13 сентября 2026 · Иваново</p>
          </div>

          {/* Day tabs */}
          <div className="flex gap-2">
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-all duration-300 ${
                  activeDay === i
                    ? "border-accent bg-accent/20 text-accent"
                    : "border-foreground/20 text-foreground/60 hover:border-foreground/40 hover:text-foreground/80"
                }`}
              >
                {d.day} · {d.date}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div
          className={`flex-1 overflow-y-auto pr-1 transition-all duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ scrollbarWidth: "none" }}
        >
          <div className="space-y-0">
            {days[activeDay].items.map((item, i) => (
              <div
                key={i}
                className={`group flex items-start gap-4 border-b border-foreground/8 py-3 transition-all duration-500 md:gap-8 md:py-4 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="w-12 shrink-0 font-mono text-xs text-foreground/40 pt-0.5 md:w-16 md:text-sm">
                  {item.time}
                </span>
                <div className="flex-1">
                  <p className={`text-sm font-light md:text-base ${item.type === "org" ? "text-foreground/50 italic" : "text-foreground"}`}>
                    {item.title}
                  </p>
                  {item.speaker && (
                    <p className={`mt-0.5 font-mono text-xs ${typeStyle[item.type]}`}>
                      {item.speaker}
                    </p>
                  )}
                </div>
                <div className={`shrink-0 mt-1 ${typeStyle[item.type]}`}>
                  {item.type === "talk" && <Icon name="Mic" size={14} />}
                  {item.type === "panel" && <Icon name="Users" size={14} />}
                  {item.type === "org" && <Icon name="Clock" size={14} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-4 flex items-center justify-between transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <p className="font-mono text-xs text-foreground/50">Программа предварительная, возможны изменения</p>
          <button
            onClick={() => scrollToSection?.(5)}
            className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-xs text-accent transition-all hover:bg-accent/20"
          >
            Зарегистрироваться <Icon name="ArrowRight" size={12} />
          </button>
        </div>
      </div>

      <style>{`div::-webkit-scrollbar{display:none}`}</style>
    </section>
  )
}
