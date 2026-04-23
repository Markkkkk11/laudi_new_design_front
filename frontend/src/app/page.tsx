"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Reveal, { RevealGroup } from "@/components/ui/Reveal";

const PROMPTS = [
  "Нужно быстро подготовить текст, 4 визуала и короткую презентацию",
  "Сравни сильные стороны Claude, ChatGPT и Gemini под задачу",
  "Сгенерируй изображения для баннеров и обложек",
  "Помоги с кодом, разбором ошибок и рабочими черновиками",
];

const STARTERS = ["Чат", "Изображения", "Презентации", "Код", "Ресерч"];

const HERO_MARKS = ["ChatGPT", "Claude", "Gemini", "Suno", "NanoBanana"];
const CHAT_URL = "https://chat.laudi.ai/";

const FEATURE_STORIES = [
  {
    num: "01",
    title: "Все топовые AI в одной подписке",
    desc: "Claude, ChatGPT, Gemini, Suno, NanoBanana и другие модели для генерации кода, изображений, видео, презентаций собраны в одном интерфейсе.",
    visual: "tasks",
    tone: "dark",
  },
  {
    num: "02",
    title: "Без VPN и зарубежных карт",
    desc: "Пользуйтесь AI-сервисами без обходных решений и сложных оплат. Подключение и доступ остаются простыми и привычными.",
    visual: "access",
    tone: "warm",
  },
  {
    num: "03",
    title: "Дешевле отдельных подписок",
    desc: "Одна подписка laudi заменяет сразу большое количество сервисов и обходится выгоднее, чем оплачивать каждый инструмент отдельно по полной стоимости.",
    visual: "launch",
    tone: "yellow",
  },
  {
    num: "04",
    title: "Прозрачная цена каждой генерации",
    desc: "Видно остаток в рублях и цену каждой модели перед запросом. Если результат промпта не понравился, отметьте это - деньги за него не спишутся.",
    visual: "models",
    tone: "violet",
  },
];

const FEATURES = [
  { icon: "models", name: "Все топовые AI в одной подписке", desc: "Claude, ChatGPT, Gemini, Suno, NanoBanana и другие модели для генерации кода, изображений, видео, презентаций собраны в одном интерфейсе." },
  { icon: "access", name: "Без VPN и зарубежных карт", desc: "Пользуйтесь AI-сервисами без обходных решений и сложных оплат. Подключение и доступ остаются простыми и привычными." },
  { icon: "value", name: "Дешевле отдельных подписок", desc: "Одна подписка laudi заменяет сразу большое количество сервисов и обходится выгоднее, чем оплачивать каждый инструмент отдельно по полной стоимости." },
  { icon: "balance", name: "Остаток виден в рублях", desc: "Вы сразу понимаете, сколько денег осталось на балансе, без пересчета токенов и скрытых лимитов." },
  { icon: "price", name: "Цена каждой модели перед генерацией", desc: "Перед запросом видно стоимость генерации для выбранной модели, поэтому легко сравнить ChatGPT, Claude, Gemini и другие варианты." },
  { icon: "check", name: "Не понравился результат - деньги не спишутся", desc: "Отметьте плохой ответ, и списание за этот промпт не пройдет." },
];

const AI_TOOLS = [
  {
    name: "Текстовые AI-помощники",
    label: "ChatGPT, Claude, Gemini",
    desc: "Пишите тексты, разбирайте документы, код, идеи и рабочие задачи в одном чате.",
    points: ["длинный контекст", "ресерч", "код", "ежедневные задачи"],
    visual: "chat",
  },
  {
    name: "Генерация картинок",
    label: "Изображения",
    desc: "Создавайте визуалы для рекламы, презентаций, соцсетей, интерфейсов и быстрых концептов.",
    points: ["баннеры", "логотипы", "обложки", "референсы"],
    visual: "image",
  },
  {
    name: "Видео",
    label: "Ролики и motion-идеи",
    desc: "Готовьте короткие видео-сценарии, раскадровки и визуальные заготовки без отдельных сервисов.",
    points: ["сценарии", "сториборды", "промо", "motion"],
    visual: "video",
  },
  {
    name: "Песни и аудио",
    label: "Suno и аудио-идеи",
    desc: "Генерируйте музыку, джинглы, саунд-дизайн и быстрые аудио-наброски для проектов.",
    points: ["музыка", "джинглы", "саунд", "идеи"],
    visual: "audio",
  },
  {
    name: "Презентации",
    label: "Структура и слайды",
    desc: "Собирайте логику питча, тексты для слайдов, тезисы и визуальные блоки для выступлений.",
    points: ["питч", "слайды", "структура", "тезисы"],
    visual: "deck",
  },
];

const FAQ_ITEMS = [
  { q: "Что такое laudi?", a: "laudi - это единое пространство для работы с популярными AI-моделями и инструментами. В одном интерфейсе доступны чат, генерация изображений, работа с кодом, контентом и другими повседневными задачами без переключения между разными сервисами." },
  { q: "Зачем использовать несколько AI-моделей?", a: "У разных моделей свои сильные стороны: одни лучше справляются с текстами, другие с кодом, анализом или быстрыми ответами. laudi дает доступ к нескольким инструментам сразу, чтобы вы могли выбирать лучший вариант под конкретную задачу." },
  { q: "Это то же самое, что ChatGPT?", a: "Нет. ChatGPT - это отдельный продукт, а laudi объединяет несколько AI-сервисов в одном доступе. Поэтому здесь можно решать больше задач в одном интерфейсе и не платить отдельно за каждую подписку." },
  { q: "Где можно использовать laudi?", a: "laudi подходит и для работы, и для личных задач: тексты, ресерч, генерация изображений, помощь с кодом, подготовка презентаций, маркетинговые материалы и повседневная продуктивность." },
  { q: "Какие модели доступны в laudi?", a: "В laudi собраны популярные AI-модели для разных задач, включая текстовые ассистенты, генерацию изображений и другие востребованные инструменты в одном доступе." },
  { q: "Нужен ли VPN для работы с laudi?", a: "Нет. Один из ключевых плюсов laudi в том, что сервисом можно пользоваться без VPN, без обходных решений и без лишнего технического трения." },
  { q: "Почему laudi выгоднее отдельных подписок?", a: "Вместо оплаты нескольких AI-сервисов по отдельности вы получаете единый доступ к основным возможностям и платите за конкретные генерации с понятной ценой в рублях." },
  { q: "Есть ли пробный период?", a: "Да. Для новых пользователей предусмотрен бесплатный пробный период, чтобы можно было спокойно попробовать модели, сценарии и рабочие возможности laudi до оформления подписки." },
];

const FOOTER_COLUMNS = [
  {
    title: "Продукт",
    links: [
      { label: "Возможности", href: "#how" },
      { label: "AI-инструменты", href: "#agents" },
      { label: "Инструменты", href: "#tools" },
      { label: "Вопросы", href: "#faq" },
    ],
  },
  {
    title: "Доступ",
    links: [
      { label: "Без VPN", href: "#agents" },
      { label: "Без зарубежных карт", href: "#agents" },
      { label: "Баланс в рублях", href: "#agents" },
      { label: "Пробный период", href: "#trial" },
    ],
  },
  {
    title: "Контакты",
    links: [
      { label: "laudi_support@outlook.com", href: "mailto:laudi_support@outlook.com" },
      { label: "ИП Маркин Марк Маркович", href: "#" },
      { label: "ИНН 772418563904", href: "#" },
    ],
  },
];

export default function LandingPage() {
  const [loaderVisible, setLoaderVisible] = useState(true);

  useHeroScrollGradient();

  useEffect(() => {
    const startedAt = window.performance.now();
    const minDuration = 1450;
    let hideTimer: number | undefined;

    const hideLoader = () => {
      const elapsed = window.performance.now() - startedAt;
      hideTimer = window.setTimeout(
        () => setLoaderVisible(false),
        Math.max(0, minDuration - elapsed)
      );
    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader, { once: true });
    }

    return () => {
      window.removeEventListener("load", hideLoader);
      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }
    };
  }, []);

  return (
    <div className="min-h-screen [overflow-x:clip] bg-[#f7f7f4] text-[#050505]">
      <PageLoader visible={loaderVisible} />
      <header className="site-header">
        <div className="site-header-shell">
          <Link href="/" className="site-brand" aria-label="Главная laudi">
            <LogoMark />
            <span>laudi</span>
          </Link>

          <nav className="site-nav">
            <a href="#how">
              Возможности <ChevronDown />
            </a>
            <a href="#agents">
              AI-инструменты <ChevronDown />
            </a>
            <a href="#tools">
              Инструменты <ChevronDown />
            </a>
            <a href="#faq">
              Вопросы <ChevronDown />
            </a>
          </nav>

          <div className="site-actions">
            <button
              aria-label="Сменить язык"
              className="site-language"
            >
              <GlobeIcon />
            </button>
            <Link
              href={CHAT_URL}
              className="site-cta"
            >
              Попробовать бесплатно
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-sky relative min-h-[calc(100svh-64px)] overflow-hidden px-5 pb-10 pt-14 text-center sm:px-6 lg:pt-[72px]">
          <div className="hero-gradient-field" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,rgba(247,247,244,0.96),rgba(247,247,244,0))]" />
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center">
            <Reveal direction="up">
              <Link
                href={CHAT_URL}
                className="mb-8 inline-flex items-center rounded-full border border-black/[0.06] bg-white/44 px-3 py-2 text-[13px] font-semibold text-black/76 shadow-[0_18px_50px_rgba(40,44,50,0.06)] backdrop-blur-2xl transition hover:bg-white/70"
              >
                <span className="mr-2 rounded-full bg-black px-3 py-1 text-[11px] font-bold uppercase tracking-[0.02em] text-white">
                  AI
                </span>
                25 143+ пользователей
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Reveal>

            <Reveal direction="up" delay={100}>
              <p className="text-[18px] font-semibold tracking-[-0.03em] text-black sm:text-[22px]">
                Раскройте весь потенциал
              </p>
              <h1 className="mt-3 max-w-6xl text-[62px] font-normal leading-[0.9] tracking-[-0.065em] text-black sm:text-[96px] lg:text-[124px] xl:text-[138px]">
                laudi
              </h1>
              <p className="mt-5 text-[22px] font-semibold tracking-[-0.04em] text-black sm:text-[32px]">
                единственный AI-ассистент, который вам нужен
              </p>
            </Reveal>

            <Reveal direction="up" delay={190}>
              <p className="mt-7 max-w-[560px] text-[15px] font-medium leading-[1.38] tracking-[-0.01em] text-black/62 sm:text-[16px]">
                Получайте Claude, ChatGPT, Gemini, Suno и другие модели для генерации изображений, видео, аудио без переходов между приложениями.
              </p>
            </Reveal>

            <Reveal direction="up" delay={280} className="mt-10 w-full max-w-[760px]">
              <PromptComposer />
            </Reveal>

            <Reveal direction="up" delay={360}>
              <div className="mt-9 w-full">
                <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.16em] text-black/34">
                  Почему laudi
                </p>
                <div className="mx-auto flex max-w-[680px] flex-wrap items-center justify-center gap-x-10 gap-y-4">
                  {HERO_MARKS.map((mark) => (
                    <span key={mark} className="text-[22px] font-extrabold tracking-[-0.06em] text-black/68 sm:text-[28px]">
                      {mark}
                    </span>
                  ))}
                </div>
                <div className="mx-auto mt-6 flex max-w-[620px] flex-wrap justify-center gap-2">
                  {STARTERS.slice(0, 4).map((starter) => (
                    <Link
                      href={CHAT_URL}
                      key={starter}
                      className="rounded-full border border-black/[0.06] bg-white/38 px-4 py-2 text-[13px] font-semibold text-black/70 shadow-[0_14px_36px_rgba(30,42,48,0.04)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/72 hover:text-black"
                    >
                      {starter}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <LimitlessBridge />
        <ProductStoryStack />

        <section id="agents" className="agents-section relative bg-white px-5 py-24 sm:px-6 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="agents-board">
                <article className="agents-intro-panel">
                  <p className="agents-kicker">Поиск</p>
                  <h2>Все нужные AI-инструменты в одной подписке</h2>
                  <p>
                    laudi объединяет чат-модели, генерацию изображений, презентаций и другие AI-сценарии в одном интерфейсе без VPN, зарубежных карт и переплат за отдельные сервисы.
                  </p>
                  <LaudiOrbitMark />
                </article>

                <div className="agents-grid-panel">
                  <RevealGroup stagger={70} className="agents-grid">
                    {FEATURES.map((feature) => (
                      <article key={feature.name} className="agent-tile">
                        <FeatureIcon type={feature.icon} />
                        <div>
                          <h3>{feature.name}</h3>
                          <p>{feature.desc}</p>
                        </div>
                      </article>
                    ))}
                  </RevealGroup>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="tools" className="relative overflow-hidden bg-[#f7f7f4] px-5 py-20 sm:px-6 lg:py-24">
          <div className="pricing-gradient" aria-hidden="true" />
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="mb-12 grid gap-5 lg:grid-cols-[0.9fr_1fr] lg:items-end">
                <div>
                  <p className="mb-4 text-[12px] font-extrabold uppercase tracking-[0.16em] text-black/38">
                    Инструменты
                  </p>
                  <h2 className="text-[44px] font-normal leading-[1.03] tracking-[-0.035em] sm:text-[64px]">
                    Что уже есть внутри laudi
                  </h2>
                </div>
                <p className="max-w-xl text-[18px] leading-[1.5] text-black/60 lg:justify-self-end">
                  Текстовые AI-помощники, генерация картинок, видео, песен и презентаций собраны в одном рабочем пространстве без отдельных подписок.
                </p>
              </div>
            </Reveal>

            <RevealGroup stagger={110} className="ai-tools-grid">
              {AI_TOOLS.map((tool) => (
                <article
                  key={tool.name}
                  className="ai-tool-card"
                >
                  <AiToolVisual type={tool.visual} />
                  <div className="ai-tool-copy">
                    <span>{tool.label}</span>
                    <h3>{tool.name}</h3>
                    <p>{tool.desc}</p>
                  </div>
                  <div className="ai-tool-tags">
                    {tool.points.map((point) => (
                      <span key={point}>{point}</span>
                    ))}
                  </div>
                </article>
              ))}
            </RevealGroup>
          </div>
        </section>

        <section id="faq" className="faq-section bg-white px-5 py-24 sm:px-6 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.35fr]">
            <Reveal>
              <div className="faq-heading lg:sticky lg:top-24">
                <h2>
                  Частые
                  <br />
                  вопросы
                </h2>
              </div>
            </Reveal>

            <div className="faq-list">
              {FAQ_ITEMS.map((item) => (
                <FaqItem key={item.q} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        </section>

        <section id="trial" className="sendoff-section relative overflow-hidden px-5 py-24 sm:px-6 lg:py-32">
          <div className="sendoff-orbits" aria-hidden="true" />
          <Reveal direction="up">
            <div className="sendoff-panel relative z-10 mx-auto flex flex-col items-center text-center">
              <h2>
                Запустите свой 7-дневный бесплатный пробный период
              </h2>
              <p>
                Запускайся быстрее, становись частью команды laudi и экономь на подписках AI-продуктов.
              </p>
              <Link
                href={CHAT_URL}
                className="sendoff-cta"
              >
                Попробовать бесплатно
                <span>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="footer-rich bg-[#f7f7f4] px-5 pb-10 pt-16 sm:px-6 lg:pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <LogoMark />
                <span className="text-[18px] font-extrabold">laudi</span>
              </div>
              <p>
                Единое AI-пространство с ChatGPT, Claude, Gemini и другими моделями без VPN, зарубежных карт и лишних переключений между сервисами.
              </p>
            </div>

            <nav className="footer-nav" aria-label="Навигация в футере">
              {FOOTER_COLUMNS.map((column) => (
                <div className="footer-column" key={column.title}>
                  <h3>{column.title}</h3>
                  <ul>
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a href={link.href}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="footer-bottom">
            <p>© 2026 laudi. Единое AI-пространство для работы, идей и повседневных задач.</p>
            <div>
              <span>ИП Маркин Марк Маркович</span>
              <span>ИНН 772418563904</span>
              <a href="mailto:laudi_support@outlook.com">laudi_support@outlook.com</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LimitlessBridge() {
  return (
    <section className="limitless-bridge relative overflow-hidden px-5 pb-0 pt-20 text-center sm:px-6 lg:pt-24">
      <Reveal direction="up" visibleClassName="gradient-title-visible">
        <h2 className="gradient-title mx-auto max-w-6xl text-[52px] font-normal leading-[0.95] tracking-[-0.065em] sm:text-[92px] lg:text-[126px]">
          Не только текст
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-[1.5] text-black/54">
          Создавайте в laudi все, что нужно: код, изображения, аудио и видео.
        </p>
      </Reveal>
    </section>
  );
}

function ProductStoryStack() {
  useStoryStackMotion();

  return (
    <section id="how" className="story-scroll-section relative px-5 sm:px-6" data-story-section>
      <div className="story-top-glow" aria-hidden="true" />
      <div className="story-sticky-stage">
        <div className="story-stack-frame">
          {FEATURE_STORIES.map((story, index) => (
            <article
              key={story.title}
              className={`story-card story-card-${story.tone}`}
              style={{ zIndex: 20 + index }}
              data-story-card
            >
              <div className="story-copy">
                <div className="story-kicker">
                  <span>{story.num}</span>
                  <span className="text-black/34">/</span>
                  <span className="text-black/42">04</span>
                  <h3>{story.title}</h3>
                </div>
                <p>{story.desc}</p>
                <Link href={CHAT_URL} className="story-button">
                  Попробовать бесплатно <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <FeatureVisual type={story.visual} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function useStoryStackMotion() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>("[data-story-section]");
    const stage = section?.querySelector<HTMLElement>(".story-sticky-stage");
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-story-card]"));
    let step = 1;
    let stickyTop = 64;
    let progress = 0;
    let targetProgress = 0;
    let motionFrame = 0;
    let scrollDistance = 1;
    const lastCardIndex = Math.max(cards.length - 1, 0);

    const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
    const clampProgress = (value: number) => Math.min(Math.max(value, 0), scrollDistance);
    const smootherStep = (value: number) => value * value * value * (value * (value * 6 - 15) + 10);

    const syncLayout = () => {
      if (!section || !stage || cards.length === 0) {
        return;
      }

      stickyTop = Number.parseFloat(window.getComputedStyle(stage).top) || 64;
      step = Math.min(Math.max(window.innerHeight * 0.82, 620), 900);
      scrollDistance = Math.max(lastCardIndex * step, 1);

      const stickyHeight = Math.max(window.innerHeight - stickyTop, 1);
      const releaseHold = Math.min(Math.max(window.innerHeight * 0.18, 120), 220);
      section.style.setProperty("--story-scroll-height", `${stickyHeight + scrollDistance + releaseHold}px`);
    };

    const render = (value = progress) => {
      if (cards.length === 0) {
        return;
      }

      const stackProgress = clampProgress(value);
      const travel = step * 0.92;

      cards.forEach((card, index) => {
        const enterRaw = index === 0 ? 1 : clamp((stackProgress - (index - 1) * step) / travel);
        const coverRaw = index === lastCardIndex ? 0 : clamp((stackProgress - index * step) / travel);
        const enter = smootherStep(enterRaw);
        const cover = smootherStep(coverRaw);
        const slide = index === 0 ? 0 : (1 - enter) * 100;
        const shade = cover * 0.07;

        card.style.setProperty("--card-y", `${slide}%`);
        card.style.setProperty("--card-lift", "0px");
        card.style.setProperty("--card-scale", "1");
        card.style.setProperty("--card-shade", shade.toFixed(3));
        card.style.setProperty("--card-opacity", index === 0 || enterRaw > 0.001 ? "1" : "0");
      });
    };

    const tickMotion = () => {
      const distance = targetProgress - progress;

      if (Math.abs(distance) < 0.35) {
        progress = targetProgress;
        render();
        motionFrame = 0;
        return;
      }

      progress += distance * 0.16;
      render();
      motionFrame = window.requestAnimationFrame(tickMotion);
    };

    const startMotion = () => {
      if (!motionFrame) {
        motionFrame = window.requestAnimationFrame(tickMotion);
      }
    };

    const onScroll = () => {
      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      targetProgress = clampProgress(stickyTop - rect.top);
      startMotion();
    };

    const onResize = () => {
      const oldMaxProgress = Math.max(scrollDistance, 1);
      const progressRatio = clamp(progress / oldMaxProgress);
      const targetRatio = clamp(targetProgress / oldMaxProgress);
      syncLayout();
      progress = progressRatio * scrollDistance;
      targetProgress = targetRatio * scrollDistance;
      render();
    };

    syncLayout();
    onScroll();
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (motionFrame) {
        window.cancelAnimationFrame(motionFrame);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);
}

function FeatureVisual({ type }: { type: string }) {
  if (type === "tasks") {
    return (
      <div className="feature-visual feature-visual-dark">
        <div className="visual-topbar">
          <span className="visual-face">L</span>
          <span>laudi workspace</span>
          <span className="ml-auto h-7 w-7 rounded-full bg-white/20" />
        </div>
        <div className="px-6 pb-6 pt-5">
          <div className="mb-5 flex items-center justify-between">
            <h4 className="text-[30px] tracking-[-0.04em] text-white">Все модели</h4>
            <div className="flex gap-3 text-[12px] text-white/50">
              <span>Поиск</span>
              <span>История</span>
            </div>
          </div>
          <div className="grid min-w-[680px] grid-cols-4 gap-3">
            {["ChatGPT", "Claude", "Gemini", "Suno"].map((column, i) => (
              <div key={column}>
                <div className={`mb-2 rounded-t-[6px] px-3 py-2 text-[12px] font-bold ${i === 0 ? "bg-[#eef45f]" : i === 1 ? "bg-[#d8c8ff]" : i === 2 ? "bg-[#ef8064]" : "bg-[#9ee8bf]"}`}>
                  {column} {i + 3}
                </div>
                {[0, 1, 2, 3, 4].map((item) => (
                  <div key={item} className="mb-2 rounded-[4px] bg-white/[0.09] p-3 text-[11px] text-white/62">
                    <div className="mb-2 h-2 w-20 rounded-full bg-white/18" />
                    <span className={`rounded-full px-2 py-0.5 text-[9px] ${item % 3 === 0 ? "bg-[#8ee4a7] text-black" : item % 3 === 1 ? "bg-[#c8a7ff]" : "bg-[#ef8064]"}`}>
                      {item % 3 === 0 ? "Готово" : item % 3 === 1 ? "В работе" : "Промпт"}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="visual-prompt">
          <span>Чем я могу помочь вам сегодня?</span>
          <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-black text-white">
            <ArrowRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    );
  }

  if (type === "access") {
    return (
      <div className="feature-visual feature-visual-warm">
        <div className="builder-shell">
          <aside>
            {["Чат", "Код", "Визуалы", "Слайды"].map((item, index) => (
              <span key={item} className={index === 0 ? "is-active" : ""}>{item}</span>
            ))}
          </aside>
          <main>
            <div className="builder-toolbar">
              <span />
              <span />
              <span />
            </div>
            <h4>Сценарий laudi</h4>
            {["Текст и идеи", "Изображения и видео", "Презентации", "Доступ без VPN"].map((item, index) => (
              <div key={item} className="schema-row">
                <span>{item}</span>
                <b>{index === 0 ? "chat" : index === 1 ? "media" : index === 2 ? "deck" : "access"}</b>
              </div>
            ))}
          </main>
        </div>
      </div>
    );
  }

  if (type === "launch") {
    return (
      <div className="feature-visual feature-visual-yellow">
          <div className="browser-card">
            <div className="browser-bar">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-black/10">⌂</span>
            <span className="rounded-full bg-[#f5f4ef] px-6 py-3 text-[24px] tracking-[-0.04em]">chat.laudi.ai</span>
            </div>
            <div className="browser-page">
              <aside />
              <main>
              <h4>Без барьеров</h4>
              <p>Работайте без зарубежных карт, VPN и переплат за отдельные подписки.</p>
                <div className="course-grid">
                  <span />
                  <span />
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feature-visual feature-visual-violet">
      <div className="model-card">
        <div className="model-option is-selected">
          <div>
            <h4>Claude Opus 4.6</h4>
            <p>Точные тексты, длинный контекст и спокойная работа с большими задачами.</p>
          </div>
          <span>✓</span>
        </div>
        <div className="model-option">
          <div>
            <h4>OpenAI, Gemini, Suno</h4>
            <p>Идеи, код, анализ, музыка, мультимодальные сценарии и быстрый ресерч.</p>
          </div>
          <span>⌄</span>
        </div>
      </div>
    </div>
  );
}

function useHeroScrollGradient() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const update = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 1.15), 1);
      root.style.setProperty("--hero-scroll", progress.toFixed(3));
      frame = 0;
    };

    const onScroll = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}

function PromptComposer() {
  const [promptIndex, setPromptIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");
  const prompt = PROMPTS[promptIndex];

  useEffect(() => {
    const delay = phase === "holding" ? 1450 : phase === "typing" ? 38 : 18;

    const timeout = window.setTimeout(() => {
      if (phase === "typing") {
        if (text.length < prompt.length) {
          setText(prompt.slice(0, text.length + 1));
        } else {
          setPhase("holding");
        }
        return;
      }

      if (phase === "holding") {
        setPhase("deleting");
        return;
      }

      if (text.length > 0) {
        setText(prompt.slice(0, text.length - 1));
      } else {
        setPromptIndex((current) => (current + 1) % PROMPTS.length);
        setPhase("typing");
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [phase, prompt, text]);

  return (
    <div className="prompt-card relative rounded-[22px] border border-white/75 bg-white/74 p-5 text-left shadow-[0_24px_80px_rgba(35,38,44,0.10)] backdrop-blur-2xl">
      <div className="min-h-[72px] px-2 pt-1 text-[21px] leading-[1.3] tracking-[-0.02em] text-[#60636d] sm:text-[25px]">
        <span>{text}</span>
        <span className="typing-caret" aria-hidden="true" />
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-black/[0.06] px-1 pt-4">
        <div className="flex items-center gap-3">
          <button aria-label="Добавить файл" className="grid h-8 w-8 place-items-center rounded-full text-black transition hover:bg-black/5">
            <PlusIcon />
          </button>
          <button aria-label="Режим плана" className="inline-flex items-center gap-2 rounded-full text-[13px] font-semibold text-black/70">
            <span className="h-5 w-9 rounded-full bg-black/[0.06] p-0.5">
              <span className="block h-4 w-4 rounded-full bg-white shadow-sm" />
            </span>
            План
            <InfoIcon />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button aria-label="Голосовой ввод" className="grid h-8 w-8 place-items-center rounded-full text-black/60 transition hover:bg-black/5">
            <MicIcon />
          </button>
          <Link
            href={CHAT_URL}
            aria-label="Отправить запрос"
            className="grid h-9 w-9 place-items-center rounded-full bg-black text-white transition hover:scale-105 hover:bg-[#6c5cff]"
          >
            <ArrowUpIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

function AiToolVisual({ type }: { type: string }) {
  if (type === "chat") {
    return (
      <svg className="ai-tool-visual" viewBox="0 0 260 190" aria-hidden="true">
        <defs>
          <linearGradient id="tool-chat-bg" x1="34" x2="226" y1="18" y2="172" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff7d7" />
            <stop offset="0.54" stopColor="#f7e7ee" />
            <stop offset="1" stopColor="#e7f5ee" />
          </linearGradient>
          <radialGradient id="tool-chat-dot" cx="30%" cy="24%" r="72%">
            <stop stopColor="#ffc37e" />
            <stop offset="0.62" stopColor="#f09759" />
            <stop offset="1" stopColor="#d78f88" />
          </radialGradient>
        </defs>
        <rect x="20" y="18" width="220" height="154" rx="28" fill="url(#tool-chat-bg)" />
        <rect x="44" y="44" width="118" height="36" rx="18" fill="white" fillOpacity="0.72" />
        <rect x="86" y="96" width="130" height="44" rx="22" fill="#111" fillOpacity="0.86" />
        <circle cx="68" cy="62" r="9" fill="url(#tool-chat-dot)" />
        <path d="M105 117h72M105 130h48" stroke="white" strokeOpacity="0.72" strokeWidth="7" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "image") {
    return (
      <svg className="ai-tool-visual" viewBox="0 0 260 190" aria-hidden="true">
        <defs>
          <linearGradient id="tool-image-bg" x1="34" x2="226" y1="22" y2="168" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f6f1df" />
            <stop offset="0.55" stopColor="#edf4df" />
            <stop offset="1" stopColor="#e8f3f7" />
          </linearGradient>
          <linearGradient id="tool-image-sun" x1="80" x2="188" y1="54" y2="144" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f8be70" />
            <stop offset="1" stopColor="#e78d73" />
          </linearGradient>
        </defs>
        <rect x="28" y="22" width="204" height="146" rx="26" fill="url(#tool-image-bg)" />
        <circle cx="91" cy="69" r="18" fill="url(#tool-image-sun)" />
        <path d="M50 142l52-52 37 35 25-22 46 39" fill="none" stroke="#151515" strokeOpacity="0.72" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M52 142h156" stroke="#151515" strokeOpacity="0.16" strokeWidth="13" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "video") {
    return (
      <svg className="ai-tool-visual" viewBox="0 0 260 190" aria-hidden="true">
        <defs>
          <linearGradient id="tool-video-bg" x1="42" x2="220" y1="18" y2="170" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f1e7ff" />
            <stop offset="0.55" stopColor="#ffe6dc" />
            <stop offset="1" stopColor="#fff2b8" />
          </linearGradient>
        </defs>
        <rect x="26" y="24" width="208" height="142" rx="26" fill="url(#tool-video-bg)" />
        <rect x="50" y="48" width="160" height="92" rx="20" fill="white" fillOpacity="0.58" />
        <path d="M118 79l38 22-38 22V79Z" fill="#111" fillOpacity="0.82" />
        <path d="M62 156h136" stroke="#111" strokeOpacity="0.18" strokeWidth="10" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "audio") {
    return (
      <svg className="ai-tool-visual" viewBox="0 0 260 190" aria-hidden="true">
        <defs>
          <linearGradient id="tool-audio-bg" x1="34" x2="226" y1="24" y2="168" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff0c6" />
            <stop offset="0.48" stopColor="#f5d5d8" />
            <stop offset="1" stopColor="#dceee2" />
          </linearGradient>
        </defs>
        <rect x="27" y="22" width="206" height="146" rx="28" fill="url(#tool-audio-bg)" />
        {[58, 86, 114, 142, 170, 198].map((x, index) => (
          <rect key={x} x={x} y={54 + (index % 2) * 18} width="15" height={82 - (index % 3) * 14} rx="7.5" fill="#111" fillOpacity={index === 2 ? "0.86" : "0.44"} />
        ))}
        <circle cx="130" cy="95" r="23" fill="#f49a59" fillOpacity="0.66" />
      </svg>
    );
  }

  return (
    <svg className="ai-tool-visual" viewBox="0 0 260 190" aria-hidden="true">
      <defs>
        <linearGradient id="tool-deck-bg" x1="34" x2="226" y1="18" y2="170" gradientUnits="userSpaceOnUse">
          <stop stopColor="#eff7d8" />
          <stop offset="0.55" stopColor="#fff2d1" />
          <stop offset="1" stopColor="#f1dce7" />
        </linearGradient>
      </defs>
      <rect x="30" y="24" width="200" height="142" rx="26" fill="url(#tool-deck-bg)" />
      <rect x="56" y="52" width="82" height="86" rx="16" fill="white" fillOpacity="0.72" />
      <rect x="152" y="52" width="52" height="20" rx="10" fill="#111" fillOpacity="0.74" />
      <rect x="152" y="86" width="52" height="20" rx="10" fill="#111" fillOpacity="0.28" />
      <rect x="152" y="120" width="38" height="20" rx="10" fill="#111" fillOpacity="0.18" />
      <path d="M75 121l22-24 23 24" stroke="#f09a58" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="faq-item">
      <button
        onClick={() => setOpen(!open)}
        className="faq-trigger"
      >
        <span>{question}</span>
        <span className={`faq-plus ${open ? "is-open" : ""}`}>
          <PlusIcon />
        </span>
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="faq-answer">{answer}</p>
        </div>
      </div>
    </article>
  );
}

function LogoMark() {
  return <span className="logo-mark" aria-hidden="true" />;
}

function PageLoader({ visible }: { visible: boolean }) {
  return (
    <div className={`page-loader ${visible ? "is-visible" : "is-hidden"}`} aria-hidden={!visible}>
      <div className="page-loader-glow" />
      <div className="page-loader-mark-wrap">
        <span className="page-loader-ring" />
        <span className="page-loader-ring page-loader-ring-soft" />
        <span className="page-loader-mark" />
      </div>
      <div className="page-loader-progress">
        <span />
      </div>
    </div>
  );
}

function FeatureIcon({ type }: { type: string }) {
  const common = {
    className: "agent-icon",
    viewBox: "0 0 40 40",
    "aria-hidden": true,
  };

  if (type === "models") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="32" height="32" rx="9" className="agent-icon-bg" />
        <path d="M20 12v16M12 20h16M14.4 14.4l11.2 11.2M25.6 14.4 14.4 25.6" className="agent-icon-line" />
        <circle cx="20" cy="20" r="3.2" className="agent-icon-light" />
        <circle cx="20" cy="10.4" r="2.2" className="agent-icon-light" />
        <circle cx="29.6" cy="20" r="2.2" className="agent-icon-light" />
        <circle cx="20" cy="29.6" r="2.2" className="agent-icon-light" />
        <circle cx="10.4" cy="20" r="2.2" className="agent-icon-light" />
      </svg>
    );
  }

  if (type === "access") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="32" height="32" rx="9" className="agent-icon-bg" />
        <g transform="translate(0 2)">
          <rect x="12" y="18" width="16" height="11" rx="3.5" className="agent-icon-light" />
          <path d="M15 18v-4.2C15 9.9 17.2 7.5 20 7.5s5 2.4 5 6.3V18" className="agent-icon-line-strong" />
          <path d="M20 22.2v2.6" className="agent-icon-line-dark" />
        </g>
      </svg>
    );
  }

  if (type === "value") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="32" height="32" rx="9" className="agent-icon-bg" />
        <rect x="10" y="11" width="8" height="12" rx="2" className="agent-icon-line" />
        <rect x="22" y="11" width="8" height="12" rx="2" className="agent-icon-line" />
        <rect x="13" y="25" width="14" height="6" rx="3" className="agent-icon-light" />
        <path d="M14 17h3M23 17h3M17 28h6" className="agent-icon-line-dark" />
        <path d="M20 22.5v2.3" className="agent-icon-line-strong" />
      </svg>
    );
  }

  if (type === "balance") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="32" height="32" rx="9" className="agent-icon-bg" />
        <rect x="9.5" y="13" width="21" height="16" rx="4.5" className="agent-icon-line" />
        <path d="M10 17h20M24 22h6" className="agent-icon-line-strong" />
        <circle cx="26.5" cy="22" r="1.7" className="agent-icon-light" />
      </svg>
    );
  }

  if (type === "price") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="32" height="32" rx="9" className="agent-icon-bg" />
        <circle cx="20" cy="20" r="11" fill="#ffffff" />
        <circle cx="20" cy="20" r="11" fill="none" stroke="#ffffff" strokeWidth="1.6" />
        <circle cx="20" cy="20" r="8.2" fill="none" stroke="#111111" strokeOpacity="0.38" strokeWidth="1.4" />
        <path d="M12.6 15.2 15 12.8M11.2 20h3.4M12.6 24.8 15 27.2M20 11.2v3.4M25 12.8l2.4 2.4M25 27.2l2.4-2.4M25.4 20h3.4M20 25.4v3.4" stroke="#111111" strokeOpacity="0.38" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M17.1 14.6h4.8a3 3 0 0 1 0 6h-4.8m0-6v11.2m0-5.2h6.2M15.4 23.6h7.9" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="4" y="4" width="32" height="32" rx="9" className="agent-icon-bg" />
      <path d="M12.5 20.5 18 26l10-12" className="agent-icon-line-strong" />
      <path d="M11 29h18" className="agent-icon-line" />
    </svg>
  );
}

function LaudiOrbitMark() {
  return (
    <svg className="agents-orbit" viewBox="0 0 220 220" aria-hidden="true">
      <defs>
        <radialGradient id="laudi-orbit-orange" cx="32%" cy="24%" r="75%">
          <stop offset="0%" stopColor="#ffc27d" />
          <stop offset="58%" stopColor="#f09255" />
          <stop offset="100%" stopColor="#db9586" />
        </radialGradient>
        <radialGradient id="laudi-orbit-rose" cx="35%" cy="24%" r="75%">
          <stop offset="0%" stopColor="#efc8c6" />
          <stop offset="58%" stopColor="#daa5ab" />
          <stop offset="100%" stopColor="#c78c91" />
        </radialGradient>
        <radialGradient id="laudi-orbit-sand" cx="34%" cy="24%" r="75%">
          <stop offset="0%" stopColor="#e7c196" />
          <stop offset="64%" stopColor="#cfa078" />
          <stop offset="100%" stopColor="#b88f7d" />
        </radialGradient>
        <filter id="laudi-orbit-soft" x="-18%" y="-18%" width="136%" height="136%">
          <feGaussianBlur stdDeviation="0.45" />
        </filter>
      </defs>

      <rect width="220" height="220" rx="28" fill="rgba(255,255,255,0.54)" />
      <g filter="url(#laudi-orbit-soft)">
        <circle cx="110" cy="110" r="32" fill="url(#laudi-orbit-orange)" />
        <circle cx="110" cy="48" r="21" fill="url(#laudi-orbit-orange)" />
        <circle cx="158" cy="82" r="21" fill="url(#laudi-orbit-rose)" />
        <circle cx="158" cy="138" r="21" fill="url(#laudi-orbit-orange)" />
        <circle cx="110" cy="172" r="21" fill="url(#laudi-orbit-sand)" />
        <circle cx="62" cy="138" r="21" fill="url(#laudi-orbit-orange)" />
        <circle cx="62" cy="82" r="21" fill="url(#laudi-orbit-orange)" />
      </g>
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="6.4" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 8.5H14.5M8.5 2.1C10.1 3.8 10.8 5.9 10.8 8.5C10.8 11.1 10.1 13.2 8.5 14.9C6.9 13.2 6.2 11.1 6.2 8.5C6.2 5.9 6.9 3.8 8.5 2.1Z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 12.5V3.5M4.5 7L8 3.5L11.5 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3.5V12.5M3.5 8H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M7.5 9.2C6.35 9.2 5.45 8.3 5.45 7.15V3.9C5.45 2.75 6.35 1.85 7.5 1.85C8.65 1.85 9.55 2.75 9.55 3.9V7.15C9.55 8.3 8.65 9.2 7.5 9.2Z" stroke="currentColor" strokeWidth="1.35" />
      <path d="M3.7 6.8C3.7 8.9 5.35 10.65 7.5 10.65M11.3 6.8C11.3 8.9 9.65 10.65 7.5 10.65M7.5 10.65V13.15" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="4.4" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" />
      <path d="M6.5 6.1V8.65M6.5 4.45H6.51" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
