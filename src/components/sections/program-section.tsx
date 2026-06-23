import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"
import Icon from "@/components/ui/icon"

type ProgramItem = {
  time: string
  title: string
  subtitle?: string
  note?: string
  type: "org" | "talk" | "panel" | "track" | "excursion"
}

const days: { day: string; date: string; location: string; items: ProgramItem[] }[] = [
  {
    day: "День 1",
    date: "12 сентября",
    location: "ИВГПУ → Фабрики",
    items: [
      {
        time: "09:00 – 10:00",
        title: "Регистрация. Приветственный кофе",
        note: "Швеи — синие бейджи · Фабриканты — красные бейджи",
        type: "org",
      },
      {
        time: "10:00 – 13:00",
        title: "Параллельные треки",
        subtitle: "Одновременно · разделение потоков",
        type: "track",
      },
      {
        time: "",
        title: "Трек А: Конкурс швей «Золотая игла»",
        subtitle: "Изготовление изделия за 3 часа (рубашка / платье-футляр). Работа жюри — технологи фабрик. Итоги на 2-й день.",
        type: "talk",
      },
      {
        time: "",
        title: "Трек Б: Дефиле и творческая программа ИВГПУ",
        subtitle: "Дефиле с моделями фабрик Иваново. Творческие номера и программа от ИВГПУ.",
        type: "panel",
      },
      {
        time: "13:00 – 14:00",
        title: "Обед",
        note: "Фуршет / бизнес-ланч",
        type: "org",
      },
      {
        time: "14:00 – 18:00",
        title: "Экскурсионный блок — Бизнес-тур по фабрикам",
        subtitle: "Посещение: HomeStyle, Бисер, Исток Пром",
        note: "Формат «инспекция»: линия раскроя, контроль качества, сроки. Швеи остаются на площадке для конкурса.",
        type: "excursion",
      },
      {
        time: "18:00 – 20:00",
        title: "Торжественное закрытие Дня 1",
        subtitle: "Ужин с фабрикантами",
        type: "org",
      },
    ],
  },
  {
    day: "День 2",
    date: "13 сентября",
    location: "База «ТекстильПрофи»",
    items: [
      {
        time: "10:00 – 11:00",
        title: "Открытие выставки оборудования",
        subtitle: "Холл: стенды поставщиков швейного оборудования, раскройных систем, ПО",
        note: "Вход на Форум — строго через выставку",
        type: "excursion",
      },
      {
        time: "11:00 – 13:00",
        title: "Пленарная сессия — Форум",
        subtitle: "Эксперты рынка, представители Минпромторга (импортозамещение), руководители фабрик",
        note: "Топ-темы: «Автоматизация за 12 месяцев» · «Новые ткани для новых реалий»",
        type: "talk",
      },
      {
        time: "13:00 – 14:00",
        title: "Кофе-брейк в зоне выставки",
        subtitle: "5-минутные демо-показы станков от экспонентов",
        type: "org",
      },
      {
        time: "14:00 – 16:00",
        title: "Форум (продолжение) и мастер-майнды",
        subtitle: "Продолжение пленарной сессии. Вопросы из зала.",
        type: "panel",
      },
      {
        time: "",
        title: "🏆 Награждение победителей конкурса швей «Золотая игла»",
        type: "talk",
      },
      {
        time: "16:00 – 17:00",
        title: "Закрывающий фуршет. B2B-переговоры",
        type: "org",
      },
    ],
  },
]

const typeIcon: Record<string, string> = {
  talk: "Mic",
  panel: "Users",
  org: "Clock",
  track: "Layers",
  excursion: "Bus",
}

const typeColor: Record<string, string> = {
  talk: "text-primary",
  panel: "text-accent",
  org: "text-foreground/35",
  track: "text-yellow-400",
  excursion: "text-cyan-400",
}

const typeBorder: Record<string, string> = {
  talk: "border-primary/20",
  panel: "border-accent/20",
  org: "border-foreground/8",
  track: "border-yellow-400/20",
  excursion: "border-cyan-400/20",
}

export function ProgramSection({ scrollToSection }: { scrollToSection?: (i: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)
  const [activeDay, setActiveDay] = useState(0)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start flex-col px-4 pt-16 pb-3 md:px-12 md:pt-20 md:pb-6 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl flex flex-col h-full">
        {/* Header */}
        <div
          className={`mb-3 flex flex-wrap items-end justify-between gap-3 transition-all duration-700 md:mb-5 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
        >
          <div>
            <h2 className="mb-0.5 font-sans text-xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Программа
            </h2>
            <p className="font-mono text-[10px] text-foreground/50 md:text-xs">
              / 12–13 сентября · {days[activeDay].location}
            </p>
          </div>

          <div className="flex gap-2">
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className={`rounded-full border px-2.5 py-1 font-mono text-[10px] transition-all duration-300 md:px-4 md:py-1.5 md:text-xs ${
                  activeDay === i
                    ? "border-accent bg-accent/20 text-accent"
                    : "border-foreground/20 text-foreground/50 hover:border-foreground/40 hover:text-foreground/80"
                }`}
              >
                {d.day} · {d.date}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule scroll area */}
        <div
          className={`min-h-0 flex-1 overflow-y-auto transition-all duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ scrollbarWidth: "none" }}
        >
          <div>
            {days[activeDay].items.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 border-b py-2.5 transition-all duration-500 md:gap-6 md:py-3 ${typeBorder[item.type]} ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {/* Time */}
                <span className="w-16 shrink-0 font-mono text-[9px] leading-tight text-foreground/35 pt-0.5 md:w-36 md:text-xs">
                  {item.time}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-light leading-snug md:text-base ${
                    item.type === "org" ? "italic text-foreground/50" :
                    item.type === "track" ? "font-medium text-yellow-300" :
                    "text-foreground"
                  }`}>
                    {item.title}
                  </p>
                  {item.subtitle && (
                    <p className="mt-0.5 hidden text-xs leading-snug text-foreground/55 sm:block md:text-sm">{item.subtitle}</p>
                  )}
                  {item.note && (
                    <p className={`mt-0.5 hidden font-mono text-[10px] leading-snug sm:block md:text-xs ${typeColor[item.type]}`}>
                      {item.note}
                    </p>
                  )}
                </div>

                {/* Icon */}
                <div className={`shrink-0 pt-0.5 ${typeColor[item.type]}`}>
                  <Icon name={typeIcon[item.type]} size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-3 flex items-center justify-between transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <p className="hidden font-mono text-[10px] text-foreground/40 sm:block md:text-xs">Программа предварительная, возможны изменения</p>
          <button
            onClick={() => scrollToSection?.(5)}
            className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent transition-all hover:bg-accent/20 md:px-4 md:py-2"
          >
            Зарегистрироваться <Icon name="ArrowRight" size={11} />
          </button>
        </div>
      </div>

      <style>{`div::-webkit-scrollbar{display:none}`}</style>
    </section>
  )
}