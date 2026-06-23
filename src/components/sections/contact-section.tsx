import { useReveal } from "@/hooks/use-reveal"
import { useState, type FormEvent } from "react"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", region: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone) return
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", phone: "", company: "", region: "" })
    setTimeout(() => setSubmitSuccess(false), 6000)
  }

  const inputClass =
    "w-full border-b border-foreground/25 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/35 focus:border-accent focus:outline-none"

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:gap-12 lg:gap-20">

          {/* Left — info */}
          <div className="flex flex-col justify-center">
            <div
              className={`mb-5 transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-1 font-sans text-3xl font-light leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Регистрация
                <br />на форум
              </h2>
              <p className="font-mono text-xs text-accent md:text-sm">/ Участие бесплатное</p>
            </div>

            <div className="space-y-3">
              {[
                { icon: "Calendar", delay: "200ms", text: "12–13 сентября 2026" },
                { icon: "MapPin", delay: "320ms", text: "г. Иваново" },
                { icon: "Ticket", delay: "440ms", text: "Вход по регистрации · 0 ₽" },
              ].map(({ icon, delay, text }) => (
                <div
                  key={text}
                  className={`flex items-center gap-3 transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: delay }}
                >
                  <Icon name={icon as "Calendar" | "MapPin" | "Ticket"} className="h-4 w-4 shrink-0 text-accent" />
                  <p className="text-sm text-foreground md:text-base">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div
                className={`col-span-2 transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "150ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/50">ФИО *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className={inputClass} placeholder="Иванов Иван Иванович" />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "250ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/50">Email *</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className={inputClass} placeholder="your@email.com" />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "330ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/50">Телефон *</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className={inputClass} placeholder="+7 (___) ___-__-__" />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "410ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/50">Компания</label>
                <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className={inputClass} placeholder="ООО «Компания»" />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "490ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/50">Регион</label>
                <input type="text" value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className={inputClass} placeholder="Ивановская область" />
              </div>

              <div
                className={`col-span-2 pt-2 transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "570ms" }}
              >
                <MagneticButton variant="primary" size="lg" className="w-full">
                  {isSubmitting ? "Отправка..." : "Зарегистрироваться на форум"}
                </MagneticButton>
                {submitSuccess && (
                  <p className="mt-3 text-center font-mono text-xs text-accent">
                    Заявка принята! Мы свяжемся с вами.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
