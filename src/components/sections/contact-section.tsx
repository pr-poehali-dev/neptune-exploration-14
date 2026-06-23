import { useReveal } from "@/hooks/use-reveal"
import { useState, type FormEvent } from "react"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    region: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone) {
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", phone: "", company: "", region: "" })
    setTimeout(() => setSubmitSuccess(false), 6000)
  }

  const inputClass =
    "w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-accent focus:outline-none md:py-2 md:text-base"

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <div
              className={`mb-6 transition-all duration-700 md:mb-10 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-sans text-4xl font-light leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-6xl lg:text-7xl">
                Регистрация
                <br />
                на форум
              </h2>
              <p className="font-mono text-xs text-accent md:text-base">/ Участие бесплатное</p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div
                className={`flex items-center gap-3 transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <Icon name="Calendar" className="h-4 w-4 text-accent" />
                <p className="text-base text-foreground md:text-xl">12–13 сентября 2026</p>
              </div>

              <div
                className={`flex items-center gap-3 transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "320ms" }}
              >
                <Icon name="MapPin" className="h-4 w-4 text-accent" />
                <p className="text-base text-foreground md:text-xl">г. Иваново</p>
              </div>

              <div
                className={`flex items-center gap-3 transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "440ms" }}
              >
                <Icon name="Ticket" className="h-4 w-4 text-accent" />
                <p className="text-base text-foreground md:text-xl">Вход свободный по регистрации</p>
              </div>
            </div>
          </div>

          {/* Форма регистрации */}
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2 md:gap-x-6 md:gap-y-5">
              <div
                className={`md:col-span-2 transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "150ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/60">ФИО *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className={inputClass}
                  placeholder="Иванов Иван Иванович"
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "250ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/60">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className={inputClass}
                  placeholder="your@email.com"
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/60">Телефон *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className={inputClass}
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "450ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/60">Название компании</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={inputClass}
                  placeholder="ООО «Компания»"
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "550ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/60">Регион</label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className={inputClass}
                  placeholder="Ивановская область"
                />
              </div>

              <div
                className={`md:col-span-2 mt-2 transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "650ms" }}
              >
                <MagneticButton variant="primary" size="lg" className="w-full disabled:opacity-50">
                  {isSubmitting ? "Отправка..." : "Зарегистрироваться на форум"}
                </MagneticButton>
                {submitSuccess && (
                  <p className="mt-3 text-center font-mono text-sm text-accent">
                    Заявка принята! Мы свяжемся с вами по указанным контактам.
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
