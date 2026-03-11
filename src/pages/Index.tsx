import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Маршруты", href: "#routes" },
  { label: "Яхты", href: "#yachts" },
  { label: "Услуги", href: "#services" },
  { label: "Галерея", href: "#gallery" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const YACHT_TYPES = [
  {
    name: "Classic Yacht",
    icon: "⛵",
    tag: "Базовый",
    tagColor: "var(--teal)",
    desc: "Классическая парусная яхта. Настоящий опыт жизни под парусом.",
    specs: ["3 каюты", "4–6 гостей + капитан"],
    price: "от 650 €",
    priceNote: "за человека / неделю",
    highlight: false,
  },
  {
    name: "Comfort Yacht",
    icon: "🛥",
    tag: "Популярный",
    tagColor: "var(--gold)",
    desc: "Больше пространства в каютах и на палубе. Увеличенный уровень комфорта.",
    specs: ["Просторные каюты", "Больше места на палубе"],
    price: "≈ 880 €",
    priceNote: "за человека / неделю",
    highlight: true,
  },
  {
    name: "Premium Catamaran",
    icon: "🚢",
    tag: "Премиум",
    tagColor: "#a78bfa",
    desc: "Двухкорпусная яхта. Максимальная устойчивость и пространство для вашей команды.",
    specs: ["До 10 гостей", "Идеально для компаний"],
    price: "≈ 975 €",
    priceNote: "за человека / неделю",
    highlight: false,
  },
];

const ROUTE_STOPS = [
  { name: "Фетхие / Мармарис", desc: "Старт из одной из красивейших марин Средиземноморья", icon: "⚓" },
  { name: "Олюдениз", desc: "Знаменитая лагуна с бирюзовой водой и белым песком", icon: "🏖" },
  { name: "Бухта Бабочек", desc: "Уединённая бухта, доступная только с моря", icon: "🦋" },
  { name: "Остров Св. Николая", desc: "Руины древнего ликийского города прямо у кромки воды", icon: "🏛" },
  { name: "Бухта Гемилер", desc: "Живописная якорная стоянка среди скал и оливков", icon: "⛰" },
  { name: "Дикие бухты", desc: "Тихие стоянки вдали от туристических маршрутов", icon: "🌊" },
];

const DAY_SCHEDULE = [
  { time: "Утро", emoji: "🌅", text: "Завтрак на палубе и купание в бухте. Первый кофе под звуки моря." },
  { time: "День", emoji: "⛵", text: "Переход под парусом 3–6 часов. Остановки для купания в открытом море." },
  { time: "Вечер", emoji: "🍽", text: "Якорь в тихой бухте или швартовка у пирса локального ресторана." },
];

const SPECIAL_WEEKS = [
  { icon: "💍", title: "Свадебные путешествия", desc: "Капитан имеет право регистрировать брак — церемония прямо на борту яхты." },
  { icon: "👯‍♀️", title: "Девичники", desc: "Неделя красивых бухт, моря и закатов с подругами." },
  { icon: "👥", title: "Компании друзей", desc: "Лучший формат для тех, кто ценит свободу и настоящие приключения." },
  { icon: "🧘", title: "Спокойный яхтинг", desc: "Для тех, кто ищет тишину и море вдали от шумных курортов." },
];

const REVIEWS = [
  {
    name: "Анна К.",
    city: "Москва",
    text: "Это была лучшая неделя в моей жизни. Просыпаться каждое утро в новой бухте — ни один отель не даст такого ощущения. Евгений — потрясающий капитан, всё организовано идеально.",
    stars: 5,
    trip: "Classic Yacht, июль",
  },
  {
    name: "Максим и Лена",
    city: "Санкт-Петербург",
    text: "Провели медовый месяц на яхте. Церемония прямо на борту — что-то невероятное. Команда сделала всё, чтобы этот день запомнился на всю жизнь.",
    stars: 5,
    trip: "Premium Catamaran, сентябрь",
  },
  {
    name: "Дмитрий П.",
    city: "Екатеринбург",
    text: "Боялся морской болезни — оказалось зря. Уже на второй день забыл об этом страхе. Больше всего запомнились вечера у маленьких ресторанов прямо у воды.",
    stars: 5,
    trip: "Comfort Yacht, август",
  },
];

const GALLERY_ITEMS = [
  { emoji: "🌊", label: "Бирюзовые бухты", bg: "from-cyan-900 to-blue-900", span: true },
  { emoji: "⛵", label: "Под парусом", bg: "from-indigo-900 to-cyan-900", span: false },
  { emoji: "🌅", label: "Закаты на воде", bg: "from-orange-900 to-pink-900", span: false },
  { emoji: "🏖", label: "Дикие пляжи", bg: "from-teal-900 to-blue-900", span: false },
  { emoji: "🍽", label: "Ужины у воды", bg: "from-blue-900 to-violet-900", span: false },
  { emoji: "⚓", label: "Марины Турции", bg: "from-slate-900 to-blue-900", span: true },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOpaque, setNavOpaque] = useState(false);

  useEffect(() => {
    const handleScroll = () => setNavOpaque(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "var(--sea-deep)", color: "var(--text-primary)", fontFamily: "'Golos Text', sans-serif", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: navOpaque ? "rgba(6,15,30,0.96)" : "transparent",
          backdropFilter: navOpaque ? "blur(20px)" : "none",
          borderBottom: navOpaque ? "1px solid rgba(38,201,195,0.1)" : "none",
        }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-2">
            <span style={{ fontSize: "1.4rem" }}>⚓</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--teal)", fontSize: "1.1rem", fontWeight: 600 }}>
              Яхтинг в Турции
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>
          <a href="#booking" className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm btn-teal" style={{ color: "var(--sea-deep)" }}>
            Забронировать
          </a>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--teal)" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden glass" style={{ borderTop: "1px solid rgba(38,201,195,0.1)" }}>
            <div className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="py-3 px-4 rounded-lg text-sm" style={{ color: "var(--text-secondary)" }} onClick={() => setMenuOpen(false)}>{l.label}</a>
              ))}
              <a href="#booking" className="mt-2 py-3 px-4 rounded-full text-center text-sm btn-teal" style={{ color: "var(--sea-deep)" }}>Забронировать</a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 120% 80% at 50% 100%, rgba(38,201,195,0.07) 0%, transparent 60%), linear-gradient(180deg, #060f1e 0%, #0a1628 50%, #0d2040 100%)"
        }} />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="absolute w-full animate-wave" style={{
            height: "2px",
            background: `linear-gradient(90deg, transparent, rgba(38,201,195,${0.12 - i * 0.025}), transparent)`,
            bottom: `${30 + i * 35}px`,
            animationDelay: `${i * 1.3}s`,
            animationDuration: `${6 + i * 0.9}s`,
          }} />
        ))}
        <div className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full animate-float" style={{
          background: "radial-gradient(circle, rgba(38,201,195,0.05) 0%, transparent 70%)",
          animationDuration: "9s",
        }} />

        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
          <div className="max-w-3xl">
            <div className="mb-5 animate-fadeInUp">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(38,201,195,0.1)", color: "var(--teal)", border: "1px solid rgba(38,201,195,0.2)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" style={{ animation: "pulse 2s infinite" }} />
                Сезон апрель — ноябрь 2026
              </span>
            </div>
            <h1 className="leading-tight mb-6 animate-fadeInUp delay-100"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.6rem, 6vw, 5.2rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Яхтенное путешествие<br />
              вдоль <span className="shimmer-text" style={{ fontWeight: 600 }}>бирюзового</span><br />
              побережья Турции
            </h1>
            <p className="text-lg leading-relaxed mb-5 animate-fadeInUp delay-200" style={{ color: "var(--text-secondary)", maxWidth: "540px" }}>
              Неделя под парусом. Тихие бухты, прозрачное море и жизнь на яхте.
            </p>
            <div className="flex flex-wrap gap-5 mb-10 animate-fadeInUp delay-300">
              {["4–6 гостей на яхте", "До 10 на катамаране", "Заезды сб → сб", "От 650 € / неделю"].map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--teal)", fontSize: "0.5rem" }}>●</span> {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 animate-fadeInUp delay-400">
              <a href="#routes" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base btn-teal" style={{ color: "var(--sea-deep)" }}>
                Посмотреть даты <Icon name="ArrowRight" size={18} />
              </a>
              <a href="#booking" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base btn-outline-teal">
                Забронировать каюту
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll-hint" style={{ color: "var(--text-muted)" }}>
          <span className="text-xs tracking-widest uppercase">Листать</span>
          <Icon name="ChevronDown" size={18} />
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #060f1e 0%, #0a1628 100%)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--teal)" }}>О путешествии</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                Путешествие, которое<br />невозможно <em>прожить в отеле</em>
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                Это не тур и не круиз. Это неделя жизни на яхте. Мы идём вдоль южного побережья Турции, останавливаемся в прозрачных бухтах, купаемся в открытом море и заходим в небольшие прибрежные города.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Каждый день — новое место. Море, ветер и ощущение свободы.
              </p>
            </div>
            <div className="reveal delay-200">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🌊", title: "На палубе", desc: "Завтраки, закаты, разговоры и морской воздух" },
                  { icon: "🤿", title: "В море", desc: "Купание прямо с яхты в открытом море" },
                  { icon: "⛵", title: "Под парусом", desc: "3–6 часов хода в день с остановками" },
                  { icon: "🍋", title: "У ресторана", desc: "Ужины у маленьких заведений прямо у воды" },
                ].map((item) => (
                  <div key={item.title} className="glass rounded-2xl p-5 card-hover">
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <div className="font-semibold mb-1 text-sm" style={{ color: "var(--text-primary)" }}>{item.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DAY SCHEDULE */}
      <section className="py-20 relative" style={{ background: "linear-gradient(180deg, #0a1628 0%, #0d2040 100%)" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase mb-3 reveal" style={{ color: "var(--teal)" }}>Жизнь на яхте</p>
          <h2 className="reveal delay-100 mb-16" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)" }}>
            Как проходит день
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {DAY_SCHEDULE.map((item, i) => (
              <div key={item.time} className={`glass rounded-2xl p-8 card-hover reveal delay-${(i + 1) * 100}`}>
                <div style={{ fontSize: "2.5rem" }} className="mb-4">{item.emoji}</div>
                <div className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--teal)" }}>{item.time}</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 glass rounded-2xl p-7 reveal delay-400">
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>Большую часть времени гости проводят</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["На палубе", "В кокпите", "У мачты на подушках", "В море"].map((place) => (
                <span key={place} className="px-4 py-2 rounded-full text-sm" style={{ background: "rgba(38,201,195,0.08)", color: "var(--teal)", border: "1px solid rgba(38,201,195,0.15)" }}>
                  {place}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROUTES */}
      <section id="routes" className="py-24 relative" style={{ background: "linear-gradient(180deg, #0d2040 0%, #060f1e 100%)" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(38,201,195,0.3), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-3 reveal" style={{ color: "var(--teal)" }}>Маршрут</p>
            <h2 className="reveal delay-100 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Вдоль южного побережья
            </h2>
            <p className="reveal delay-200" style={{ color: "var(--text-secondary)" }}>
              Один из самых красивых регионов Средиземного моря. Старт из Фетхие или Мармарис.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROUTE_STOPS.map((stop, i) => (
              <div key={stop.name} className={`glass rounded-2xl p-6 card-hover reveal delay-${(i % 4 + 1) * 100}`}>
                <div className="flex items-start gap-4">
                  <div className="text-3xl mt-1">{stop.icon}</div>
                  <div>
                    <h3 className="font-semibold mb-1.5 text-base" style={{ color: "var(--text-primary)" }}>{stop.name}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{stop.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 glass rounded-xl p-4 text-center reveal delay-400">
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              ✦ Маршрут может меняться в зависимости от погоды и состояния моря
            </p>
          </div>
        </div>
      </section>

      {/* YACHTS */}
      <section id="yachts" className="py-24 relative" style={{ background: "#0a1628" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(38,201,195,0.3), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-3 reveal" style={{ color: "var(--teal)" }}>Форматы</p>
            <h2 className="reveal delay-100" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Выберите свою яхту
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {YACHT_TYPES.map((yacht, i) => (
              <div key={yacht.name}
                className={`relative rounded-2xl p-8 card-hover reveal delay-${(i + 1) * 100} flex flex-col`}
                style={{
                  background: yacht.highlight ? "linear-gradient(135deg, rgba(38,201,195,0.12) 0%, rgba(13,32,64,0.85) 100%)" : "rgba(13,32,64,0.7)",
                  border: `1px solid ${yacht.highlight ? "rgba(38,201,195,0.3)" : "rgba(38,201,195,0.1)"}`,
                  boxShadow: yacht.highlight ? "0 0 40px rgba(38,201,195,0.1)" : "none",
                }}>
                {yacht.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-semibold animate-glow-pulse" style={{ background: "var(--teal)", color: "var(--sea-deep)" }}>
                      Популярный выбор
                    </span>
                  </div>
                )}
                <div className="text-4xl mb-4">{yacht.icon}</div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)" }}>{yacht.name}</h3>
                  <span className="px-2 py-0.5 rounded text-xs" style={{ background: `${yacht.tagColor}18`, color: yacht.tagColor, border: `1px solid ${yacht.tagColor}30` }}>
                    {yacht.tag}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>{yacht.desc}</p>
                <div className="flex flex-col gap-2 mb-6 flex-1">
                  {yacht.specs.map((s) => (
                    <div key={s} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                      <span style={{ color: "var(--teal)" }}>✓</span> {s}
                    </div>
                  ))}
                </div>
                <div className="border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600, color: yacht.highlight ? "var(--teal)" : "var(--text-primary)" }}>
                    {yacht.price}
                  </div>
                  <div className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>{yacht.priceNote}</div>
                </div>
                <a href="#booking" className={`w-full py-2.5 rounded-full text-sm text-center ${yacht.highlight ? "btn-teal" : "btn-outline-teal"}`}
                  style={yacht.highlight ? { color: "var(--sea-deep)" } : {}}>
                  Забронировать
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 glass rounded-2xl p-8 reveal delay-400" style={{ border: "1px solid rgba(232,184,75,0.2)" }}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="font-semibold text-xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--gold)" }}>Аренда яхты целиком</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Для компании от 4 человек — закрытое путешествие только для вашей команды и капитана. Девичники, семейные путешествия, компании друзей.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: "var(--gold)" }}>от 3 000 €</div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>за всю яхту / неделю</div>
                </div>
                <a href="#booking" className="btn-gold px-8 py-3 rounded-full text-sm" style={{ color: "var(--sea-deep)", whiteSpace: "nowrap" }}>
                  Запросить условия
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 relative" style={{ background: "linear-gradient(180deg, #0a1628 0%, #060f1e 100%)" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(38,201,195,0.3), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-3 reveal" style={{ color: "var(--teal)" }}>Услуги</p>
            <h2 className="reveal delay-100" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Морские недели
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {SPECIAL_WEEKS.map((item, i) => (
              <div key={item.title} className={`glass rounded-2xl p-6 card-hover reveal delay-${(i + 1) * 100}`}>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-semibold mb-2 text-sm" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-8 reveal">
              <h3 className="font-semibold text-lg mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--text-primary)" }}>
                💰 Из чего складывается стоимость
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Верёвочный сбор", amount: "400 €", desc: "Основная стоимость участия" },
                  { name: "Судовая касса", amount: "≈ 250 €", desc: "Топливо, стоянки, продукты, расходы" },
                ].map((item) => (
                  <div key={item.name} className="flex items-start justify-between gap-4 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div>
                      <div className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{item.name}</div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{item.desc}</div>
                    </div>
                    <div className="font-semibold text-sm whitespace-nowrap" style={{ color: "var(--teal)" }}>{item.amount}</div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2">
                  <div className="font-semibold" style={{ color: "var(--text-primary)" }}>Итого</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 600, color: "var(--teal)" }}>≈ 650 €</div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8 reveal delay-200" style={{ border: "1px solid rgba(38,201,195,0.15)" }}>
              <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--text-primary)" }}>
                👨‍🍳 Повар на борту
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
                По желанию — повар на весь маршрут. Завтраки, обеды, ужины. Полностью расслабьтесь и наслаждайтесь морем.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Завтраки", "Обеды", "Ужины", "Свежие продукты"].map((meal) => (
                  <span key={meal} className="px-3 py-1 rounded-full text-xs" style={{ background: "rgba(38,201,195,0.08)", color: "var(--teal)", border: "1px solid rgba(38,201,195,0.15)" }}>
                    {meal}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 glass rounded-2xl p-7 reveal delay-300">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>🌊 О морской болезни</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Большинство чувствуют себя комфортно уже в первые дни. Капитан выбирает спокойные маршруты, переходы в защищённых акваториях. Большую часть времени вы на палубе или в воде — там укачивание практически не ощущается.
                </p>
              </div>
              <div className="glass-light rounded-xl p-5 flex items-center gap-3">
                <div className="text-3xl">😌</div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  <strong style={{ color: "var(--text-primary)" }}>90%</strong> гостей<br />не испытывают<br />дискомфорта
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPTAIN */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#0d2040" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 100% 50%, rgba(38,201,195,0.05) 0%, transparent 60%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(38,201,195,0.3), transparent)" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 text-4xl"
                style={{ background: "linear-gradient(135deg, rgba(38,201,195,0.15) 0%, rgba(13,32,64,0.8) 100%)", border: "2px solid rgba(38,201,195,0.25)" }}>
                ⚓
              </div>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--teal)" }}>Капитан</p>
              <h2 className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, color: "var(--text-primary)" }}>
                Евгений
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                Вырос у моря и под парусом с детства. Прошёл акватории шести морей. Хорошо знает побережье Турции и множество красивых бухт.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Права ГИМС РФ", "Лицензии IYT", "Член РГО"].map((badge) => (
                  <span key={badge} className="px-3 py-1.5 rounded-full text-xs" style={{ background: "rgba(38,201,195,0.08)", color: "var(--teal)", border: "1px solid rgba(38,201,195,0.2)" }}>
                    ✓ {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="reveal delay-300">
              <div className="glass rounded-2xl p-8" style={{ border: "1px solid rgba(38,201,195,0.15)" }}>
                <p className="text-xs tracking-widest uppercase mb-5" style={{ color: "var(--text-muted)" }}>Пройденные акватории</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {["Азовское", "Каспийское", "Средиземное", "Эгейское", "Ионическое", "Адриатическое"].map((sea) => (
                    <div key={sea} className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm" style={{ background: "rgba(38,201,195,0.06)", color: "var(--text-secondary)" }}>
                      <span style={{ color: "var(--teal)", fontSize: "0.5rem" }}>●</span> {sea} море
                    </div>
                  ))}
                </div>
                <div className="pt-5 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <p className="text-sm italic" style={{ color: "var(--text-secondary)" }}>
                    «Главный принцип на борту: уважение к морю, яхте и команде.»
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 relative" style={{ background: "linear-gradient(180deg, #0d2040 0%, #060f1e 100%)" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(38,201,195,0.3), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-3 reveal" style={{ color: "var(--teal)" }}>Галерея</p>
            <h2 className="reveal delay-100" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Жизнь на воде
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((item, i) => (
              <div key={item.label}
                className={`relative rounded-2xl overflow-hidden card-hover reveal delay-${(i % 3 + 1) * 100}`}
                style={{ minHeight: item.span ? "280px" : "200px" }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bg}`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div style={{ fontSize: "2.5rem" }}>{item.emoji}</div>
                  <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 relative" style={{ background: "#0a1628" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(38,201,195,0.3), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-3 reveal" style={{ color: "var(--teal)" }}>Отзывы</p>
            <h2 className="reveal delay-100" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Те, кто уже побывал
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <div key={review.name} className={`glass rounded-2xl p-7 card-hover reveal delay-${(i + 1) * 100} flex flex-col`}>
                <div className="flex gap-0.5 mb-4">
                  {Array(review.stars).fill(0).map((_, j) => (
                    <span key={j} style={{ color: "var(--gold)" }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "var(--text-secondary)" }}>"{review.text}"</p>
                <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{review.name}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{review.city}</div>
                  </div>
                  <div className="text-xs px-2 py-1 rounded" style={{ background: "rgba(38,201,195,0.08)", color: "var(--teal)" }}>{review.trip}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 relative overflow-hidden" style={{ background: "#060f1e" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(38,201,195,0.06) 0%, transparent 70%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(38,201,195,0.3), transparent)" }} />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase mb-4 reveal" style={{ color: "var(--teal)" }}>Ближайшие путешествия</p>
          <h2 className="reveal delay-100 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)" }}>
            Места ограничены
          </h2>
          <p className="text-base leading-relaxed mb-12 reveal delay-200" style={{ color: "var(--text-secondary)" }}>
            На яхте всего 3 каюты, поэтому места обычно заканчиваются заранее.
          </p>

          <div className="glass rounded-2xl p-10 reveal delay-300" style={{ border: "1px solid rgba(38,201,195,0.2)" }}>
            <div className="mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 300, color: "var(--text-secondary)" }}>
              Неделя на яхте — это когда:
            </div>
            <div className="space-y-3 text-left max-w-sm mx-auto mb-8">
              {["утром вы просыпаетесь в новой бухте", "днём идёте под парусом", "а вечером ужинаете у маленького ресторана у воды"].map((line) => (
                <div key={line} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--teal)", marginTop: "3px", fontSize: "0.5rem" }}>●</span> {line}
                </div>
              ))}
            </div>
            <p className="text-sm italic mb-10" style={{ color: "var(--text-muted)" }}>
              Иногда именно такие недели становятся самыми запоминающимися.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contacts" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base btn-teal" style={{ color: "var(--sea-deep)" }}>
                Посмотреть календарь <Icon name="Calendar" size={18} />
              </a>
              <a href="#contacts" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base btn-gold" style={{ color: "var(--sea-deep)" }}>
                Забронировать <Icon name="ArrowRight" size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 relative" style={{ background: "#0d2040" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(38,201,195,0.3), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-3 reveal" style={{ color: "var(--teal)" }}>Контакты</p>
            <h2 className="reveal delay-100" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Напишите нам
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="reveal">
              <div className="glass rounded-2xl p-8 h-full">
                <h3 className="font-semibold mb-6" style={{ color: "var(--text-primary)" }}>Связаться с нами</h3>
                <div className="space-y-3">
                  {[
                    { icon: "MessageCircle", label: "Telegram", value: "@yacht_turkey" },
                    { icon: "Phone", label: "WhatsApp", value: "+7 (999) 000-00-00" },
                    { icon: "Mail", label: "Email", value: "info@yacht-turkey.ru" },
                  ].map((contact) => (
                    <a key={contact.label} href="#"
                      className="flex items-center gap-4 py-3 px-4 rounded-xl transition-all"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(38,201,195,0.08)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}>
                      <div className="flex items-center justify-center w-9 h-9 rounded-full" style={{ background: "rgba(38,201,195,0.1)" }}>
                        <Icon name={contact.icon} size={16} style={{ color: "var(--teal)" }} />
                      </div>
                      <div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>{contact.label}</div>
                        <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{contact.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="reveal delay-200">
              <div className="glass rounded-2xl p-8 h-full">
                <h3 className="font-semibold mb-6" style={{ color: "var(--text-primary)" }}>Задать вопрос</h3>
                <div className="space-y-4">
                  {[
                    { type: "text", placeholder: "Ваше имя" },
                    { type: "tel", placeholder: "Телефон или Telegram" },
                  ].map((field) => (
                    <input key={field.placeholder} type={field.type} placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(38,201,195,0.12)", color: "var(--text-primary)" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(38,201,195,0.4)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(38,201,195,0.12)")} />
                  ))}
                  <textarea placeholder="Ваш вопрос или пожелания" rows={3}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(38,201,195,0.12)", color: "var(--text-primary)" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(38,201,195,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(38,201,195,0.12)")} />
                  <button className="w-full py-3 rounded-xl text-sm btn-teal" style={{ color: "var(--sea-deep)" }}>
                    Отправить сообщение
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 relative" style={{ borderTop: "1px solid rgba(38,201,195,0.1)", background: "var(--sea-deep)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "1.2rem" }}>⚓</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--teal)", fontWeight: 600 }}>Яхтинг в Турции</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-xs" style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Сезон 2026 · Апрель — Ноябрь</p>
        </div>
      </footer>
    </div>
  );
}
