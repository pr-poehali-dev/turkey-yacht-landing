import { useEffect, useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";
import YachtModal, { type YachtDetail } from "@/components/YachtModal";

const SUBMIT_URL = "https://functions.poehali.dev/ca2e2601-1e74-49e6-85d5-12e9ca935f4a";

const NAV_LINKS = [
  { label: "Маршруты", href: "#routes" },
  { label: "Яхты", href: "#yachts" },
  { label: "Размещение", href: "#accommodation" },
  { label: "Услуги", href: "#services" },
  { label: "Галерея", href: "#gallery" },
  { label: "Отзывы", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const YACHT_TYPES: YachtDetail[] = [
  {
    name: "Dufour 455",
    subtitle: "Комфорт+",
    icon: "🛥",
    tag: "Комфорт+",
    tagColor: "var(--teal)",
    desc: "Французская яхта с просторным кокпитом, большим столом и современными парусами. Комфорт на каждом переходе.",
    fullDesc: "Dufour 455 — французская элегантность на воде. 3 просторные каюты, большой кокпит с шатром и обеденным столом для всей команды. Новые современные паруса, вместительный холодильник с морозильной камерой. Просторная кухня, два штурвала, носовая площадка для загара. Динги с мотором — свобода добраться до любой бухты.",
    specs: ["3 каюты с двуспальными кроватями", "До 6 гостей + капитан", "2 туалета с душем на борту", "Душ с пресной водой на купальной платформе", "Большой кокпит с шатром и обеденным столом", "Новые современные паруса", "Просторный холодильник с морозильной камерой", "Два штурвала", "Носовая площадка для загара", "SUP-борд", "Маски, ласты для снорклинга", "Снасти для рыбалки", "Динги с мотором"],
    detailedSpecs: [
      { label: "Длина", value: "14.5 м" },
      { label: "Каюты", value: "3" },
      { label: "Гости", value: "до 6" },
      { label: "Год", value: "2006" },
    ],
    price: "от 880 €",
    priceNote: "за человека / неделю",
    highlight: false,
    img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/f1d30f88-a388-4bb1-a5d7-17f190ecb504.jpg",
    gallery: [
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/94c7012e-9644-4e4e-9f53-a3ce7e02f996.jpeg",
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/e7e1c417-10d1-4179-8447-1bc0efaf778b.jpeg",
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/5378ee11-dd2b-4600-8152-10ae181cd6ef.jpg",
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/6f836418-08db-4383-8936-cc2ee5b3e143.jpg",
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/6bbad57e-8b59-45cf-8f7d-8917283dd4ff.jpg",
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/321bd7db-5c28-44b9-9fdd-be9257cc0ab8.png",
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/4f8fc50c-df5e-44dd-bd93-37c3010c7941.png",
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/7a6aa587-4b82-474e-83ba-f1475a0a8ea9.png",
    ],
  },
  {
    name: "Bavaria 42",
    subtitle: "Комфорт",
    icon: "⛵",
    tag: "Популярный выбор",
    tagColor: "var(--gold)",
    desc: "Классическая немецкая парусная яхта. Надёжная, удобная, настоящий опыт жизни под парусом.",
    fullDesc: "Bavaria 42 — это классика немецкого яхтостроения. Надёжный корпус, продуманная эргономика и всё необходимое для комфортного плавания. Три отдельные каюты с двуспальными кроватями, просторный салон с обеденной зоной, полностью оборудованная кухня. На палубе — удобный кокпит для совместных ужинов под звёздами. Идеальный выбор для тех, кто хочет настоящий опыт жизни под парусом.",
    specs: ["3 каюты с двуспальными кроватями", "4–6 гостей + капитан", "2 туалета с душем на борту", "Душ с пресной водой на купальной платформе", "Полностью оборудованная кухня", "Кокпит с тентом от солнца", "2 сап-борда", "Ласты, маски, трубки для снорклинга", "Удочки и снасти для рыбалки", "Оборудование для подводной охоты", "Мангал на борту", "Гамак", "Ледогенератор", "Мягкая зона отдыха на носу (подушки)", "Динги с мотором"],
    detailedSpecs: [
      { label: "Длина", value: "14.2 м" },
      { label: "Каюты", value: "3" },
      { label: "Гости", value: "до 6" },
      { label: "Год", value: "2001" },
    ],
    price: "от 750 €",
    priceNote: "за человека / неделю",
    highlight: true,
    img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/b6bd9ef5-857a-486b-b803-5ce119900841.jpg",
    gallery: [
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/26db3cb8-1dea-4ca6-bd52-24ec06a471bd.jpg",
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/6591ef33-a420-4b12-89b4-8c90742faa17.jpg",
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/6555c1f3-4648-40c1-af88-9965632c5cf4.jpg",
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/c8688f27-641a-4452-8667-bd98db5fe801.jpg",
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/d08eda47-77d4-4636-a55b-aa4f9f45006f.jpg",
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/d341d8b4-5642-4a8c-8b8b-dec78931e625.jpg",
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/edfe203f-fddb-4c78-be69-bdb00a04baa6.jpg",
    ],
  },
  {
    name: "Fountaine Pajot Astréa 42",
    subtitle: "Премиум",
    icon: "🚢",
    tag: "Премиум",
    tagColor: "#a78bfa",
    desc: "Двухкорпусная яхта. Максимальная устойчивость, огромный кокпит и пространство для большой компании.",
    fullDesc: "Fountaine Pajot Astréa 42 — премиальный катамаран для тех, кто не идёт на компромиссы. Два корпуса обеспечивают исключительную устойчивость — никакой качки даже при волнении. Четыре изолированные каюты, каждая с собственным санузлом. Широкий кокпит и зона отдыха с подушками на носовой платформе. Идеально для больших компаний, семей с детьми, девичников и корпоративных поездок.",
    specs: ["4 каюты с индивидуальными санузлами", "До 8 гостей + капитан", "Минимальная качка — два корпуса", "Огромный кокпит и салон", "Зона отдыха с подушками на носовой платформе", "Трамплинная сетка на носу", "SUP-борд", "Ледогенератор", "Каяк — по запросу", "Подводные скутеры — по запросу", "Кофемашина — по запросу"],
    detailedSpecs: [
      { label: "Длина", value: "14.2 м" },
      { label: "Ширина", value: "7.4 м" },
      { label: "Каюты", value: "4" },
      { label: "Гости", value: "до 8" },
    ],
    price: "от 1 200 €",
    priceNote: "за человека / неделю",
    priceExtra: "* Депозит 5 000 € (делится на команду, возвращается после сдачи лодки в последний день)",
    highlight: false,
    img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/2a72d937-7381-4b29-9235-12ad76dbe445.jpg",
    gallery: [
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/5f0d8f69-bc9f-499d-abb9-bd7d60d09d3e.jpeg",
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/aa8dcdd9-c425-4636-9594-0eb0f5314809.jpg",
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/ce7ec152-3864-4f7e-b0a2-170a1290c915.jpeg",
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/512d7d1b-96ae-4a11-84d4-1dfd7974752b.jpg",
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/3c49a4f6-b8e9-4d98-8027-c913e59205be.jpeg",
      "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/47fb2b23-0607-45de-8f59-b162bf469bff.jpg",
    ],
  },
];

const ROUTE_STOPS = [
  { name: "Фетхие / Мармарис", desc: "Старт из одной из красивейших марин Средиземноморья. Набираем провизию, знакомимся с командой.", icon: "⚓", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/e0b1280c-9f05-4527-aa0d-1a900f0ff9e0.jpg" },
  { name: "Олюдениз", desc: "Знаменитая бирюзовая лагуна с белым песком — одно из красивейших мест Турции.", icon: "🏖", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/ab80fa8c-e10a-4261-a773-70389cfd5cb0.jpg" },
  { name: "Бухта Бабочек", desc: "Уединённая бухта, доступная только с моря. Снорклинг и ныряние у скал.", icon: "🦋", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/b3fa61df-77bd-45d0-9c41-58eb93962faf.jpg" },
  { name: "Остров Гемилер", desc: "Руины византийских церквей на скалах прямо у воды. Якорная стоянка у острова — высаживаемся и идём пешком среди древних камней. Один из самых впечатляющих моментов маршрута.", icon: "🏛", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/8dd63f1a-bc53-476a-aed1-f112df22e980.jpeg" },
  { name: "Дикие бухты", desc: "Тихие стоянки вдали от туристов. Морская охота, фридайвинг, закаты у воды.", icon: "🌊", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/b4399b74-8a91-4f26-97bd-66882dfe61b6.jpg" },
  { name: "Каш / Калкан", desc: "Живописные рыбацкие городки с террасными ресторанами и ночной жизнью.", icon: "🏘", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/712f8940-a329-4ab8-85ac-9a5e109b00e6.jpg" },
  { name: "Кекова", desc: "Затопленный античный город Симена — история прямо под водой, видна без маски.", icon: "🏺", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/bf2476da-c70e-4ee3-b660-a427e3062b84.jpg" },
  { name: "Демре / Мира", desc: "Древний ликийский город и церковь Святого Николая. Гробницы, высеченные в скалах.", icon: "🗿", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/cf94c814-2c42-4598-9833-bb0f6905404f.jpg" },
];

const DAY_SCHEDULE = [
  {
    time: "Утро",
    emoji: "🌅",
    text: "Купание в прозрачной бухте. Кофе в кокпите, завтрак на палубе.",
    img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/46a224ed-0c9e-465f-a97b-20fa3dbcc619.jpg",
  },
  {
    time: "День",
    emoji: "⛵",
    text: "Переход 3–5 часов под парусом вдоль скал и островов.",
    img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/24f432de-4321-4ff7-a666-355f5ec5d770.jpg",
  },
  {
    time: "Вечер",
    emoji: "🍽",
    text: "Стоянка у тихого острова или у пирса ресторана.",
    img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/cf38f7d5-0f77-4a83-888a-20fcd95c8f7c.jpg",
  },
  {
    time: "Ночь",
    emoji: "✨",
    text: "Звёзды. Тишина. Море.",
    img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/a54dd1b8-4eef-4246-8f69-05765ebfb795.jpg",
  },
];

const SPECIAL_WEEKS = [
  { icon: "🤿", title: "Морская охота и фридайвинг", desc: "Спускаешься на глубину с ружьём — и ужин уже на борту. Кристальная вода, рыба у самых скал.", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/20de6d30-2c27-4ee2-97a8-0821c30bb597.jpg" },
  { icon: "🎣", title: "Рыбалка", desc: "Закинуть снасть прямо с кормы — на ходу или на стоянке. Свежий улов сразу на сковороду.", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/1d80504d-b2c9-4a9b-b603-477b7e628a7d.jpg" },
  { icon: "⛵", title: "Обучение яхтингу", desc: "Встань за штурвал и возьми курс сам. Капитан обучит управлению парусами прямо в море.", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/c732e4c6-bccd-482e-a03f-6258c8e73768.jpg" },
  { icon: "🥾", title: "Яхтинг + Ликийская тропа", desc: "Самая красивая треккинговая тропа мира 2025 года. Высаживаемся в бухте, идём налегке — без рюкзаков. После прогулки отдыхаем на яхте. Доступно всем, включая детей.", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/7a939002-4344-4d75-a70d-a1f63896b51e.jpg" },
  { icon: "💍", title: "Бракосочетание на яхте", desc: "В морских традициях. Капитан имеет право росписи — церемония прямо на борту, в открытом море.", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/c255fb15-bc1e-4f13-817d-4314873222cd.jpg" },
  { icon: "🎂", title: "День рождения на яхте", desc: "Для взрослых и детей. Квест на руинах древнего города, пиратская вечеринка, день Нептуна — и всё, на что хватит фантазии. Фотограф и аниматор — по запросу.", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/d6422ad4-32fe-4c6e-aed1-9a2440a69a7f.jpg" },
  { icon: "👯‍♀️", title: "Девичники", desc: "Неделя красивых бухт, моря и закатов с подругами. Профессиональная фотосессия — по запросу.", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/f842a71b-5168-48cb-bcba-ad0ad3e96301.jpg" },
  { icon: "👥", title: "Компании друзей", desc: "Лучший формат для тех, кто ценит свободу и настоящие приключения.", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/bd68ae2d-75f0-4144-94f5-13347159898e.jpg" },
  { icon: "🧘", title: "Спокойный яхтинг", desc: "Для тех, кто ищет тишину и море вдали от шумных курортов.", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/274be0fa-8c28-4f88-b93c-779ee450e35e.jpg" },
];

const YACHT_GLOSSARY = [
  { term: "Кокпит", def: "Открытая площадка на корме яхты — ваша «терраса». Здесь штурвал, капитан и большая часть жизни на переходах." },
  { term: "Кают-компания", def: "Общий салон внутри яхты — столовая, гостиная и кухня в одном. Тут едят, общаются и отдыхают." },
  { term: "Камбуз", def: "Кухня на яхте. Плита, холодильник, раковина и всё для готовки — в компактном пространстве." },
  { term: "Гальюн", def: "Туалет на яхте. Работает немного иначе, чем дома — капитан объяснит при посадке." },
  { term: "Марина", def: "Яхтенный порт с причалами, водой, электричеством и иногда ресторанами. Здесь начинается и заканчивается маршрут." },
  { term: "Бакштаг / Галфвинд", def: "Курс яхты относительно ветра. Новичкам знать необязательно — капитан разберётся сам." },
  { term: "Якорная стоянка", def: "Стоянка вдали от берега — яхта держится на якоре. Тишина, звёзды, вода вокруг." },
  { term: "Купальная платформа", def: "Площадка в корме на уровне воды — для прыжков и выхода из моря. Лесенка сюда же." },
  { term: "Динги", def: "Маленькая надувная лодка с мотором — доставляет на берег, когда яхта стоит на якоре." },
  { term: "Шкот", def: "Верёвка (снасть) для управления парусами. Если капитан попросит потянуть — это как раз шкот." },
];

const REVIEWS = [
  {
    name: "Анна К.",
    city: "Москва",
    text: "Это была лучшая неделя в моей жизни. Просыпаться каждое утро в новой бухте — ни один отель не даст такого ощущения. Евгений — потрясающий капитан, всё организовано идеально.",
    stars: 5,
    trip: "Bavaria 42, июль",
    img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/274be0fa-8c28-4f88-b93c-779ee450e35e.jpg",
  },
  {
    name: "Максим и Лена",
    city: "Санкт-Петербург",
    text: "Провели медовый месяц на яхте. Церемония прямо на борту — что-то невероятное. Команда сделала всё, чтобы этот день запомнился на всю жизнь.",
    stars: 5,
    trip: "Catamaran, сентябрь",
    img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/f793efad-69d4-42c1-b61e-11dcd2e8a877.jpg",
  },
  {
    name: "Дмитрий П.",
    city: "Екатеринбург",
    text: "Боялся морской болезни — оказалось зря. Уже на второй день забыл об этом страхе. Больше всего запомнились вечера у маленьких ресторанов прямо у воды.",
    stars: 5,
    trip: "Dufour 455, август",
    img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/d6422ad4-32fe-4c6e-aed1-9a2440a69a7f.jpg",
  },
  {
    name: "Ольга и Сергей",
    city: "Новосибирск",
    text: "Взяли катамаран всей компанией — 8 человек. Пространства хватило всем. Рыбачили каждый день, ныряли с маской в бухтах. Обратно в Турцию хочется уже сейчас.",
    stars: 5,
    trip: "Catamaran, июнь",
    img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/7a939002-4344-4d75-a70d-a1f63896b51e.jpg",
  },
  {
    name: "Ирина В.",
    city: "Казань",
    text: "Отдыхала одна — не знала никого из группы. Через два дня все стали как родные. Капитан Евгений создаёт особую атмосферу на борту. Буду снова в этом году.",
    stars: 5,
    trip: "Bavaria 42, май",
    img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/bd68ae2d-75f0-4144-94f5-13347159898e.jpg",
  },
  {
    name: "Артём Н.",
    city: "Ростов-на-Дону",
    text: "Занимался морской охотой впервые — ощущения непередаваемые. Капитан знает все места, где водится рыба. Приготовили прямо на борту, с видом на скалы. Незабываемо.",
    stars: 5,
    trip: "Dufour 455, октябрь",
    img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/20de6d30-2c27-4ee2-97a8-0821c30bb597.jpg",
  },
  {
    name: "Наташа Г.",
    city: "Краснодар",
    text: "Девичник на яхте — это лучшее решение в моей жизни. Никаких клубов, никакого шума. Только море, закаты, свои люди и полная свобода. Спасибо огромное!",
    stars: 5,
    trip: "Bavaria 42, август",
    img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/f842a71b-5168-48cb-bcba-ad0ad3e96301.jpg",
  },
  {
    name: "Евгения М.",
    city: "Тула",
    text: "Ехала с подругами, совсем не знали капитана. Уже на второй день Евгений стал как свой человек — рассказывал про каждое место, учил нырять, готовил на гриле. Такого не купишь ни в каком туре.",
    stars: 5,
    trip: "Bavaria 42, июнь",
    img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/c936e9b9-f800-43f6-9df4-8fc2a6af0eb3.jpg",
  },
  {
    name: "Павел К.",
    city: "Тюмень",
    text: "До этого путешествовал только в отелях. Яхта — это другое измерение. Встаёшь утром — вокруг бирюзовое море и скалы. Евгений — профессионал и отличный рассказчик.",
    stars: 5,
    trip: "Catamaran, июль",
    img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/cf38f7d5-0f77-4a83-888a-20fcd95c8f7c.jpg",
  },
  {
    name: "Юлия и Андрей",
    city: "Уфа",
    text: "Взяли яхту целиком для двух пар. Лучшее решение — полная свобода маршрута. Останавливались где хотели, ходили сколько хотели. Бухта Бабочек — это сказка.",
    stars: 5,
    trip: "Dufour 460, сентябрь",
    img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/0b2a898f-e8c3-439c-a974-3d7cf2883c34.jpg",
  },
];

const GALLERY_ITEMS = [
  { img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/50940829-ee0a-4e20-8ff0-f8fdf1ef4946.jpg", label: "Остров Гемилер — руины", pos: "center center" },
  { img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/274be0fa-8c28-4f88-b93c-779ee450e35e.jpg", label: "Отдых в бухте", pos: "center center" },
  { img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/8dd63f1a-bc53-476a-aed1-f112df22e980.jpeg", label: "Гемилер с воды", pos: "center center" },
  { img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/0b2a898f-e8c3-439c-a974-3d7cf2883c34.jpg", label: "Бухта Бабочек", pos: "center center" },
  { img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/cf38f7d5-0f77-4a83-888a-20fcd95c8f7c.jpg", label: "Закат на якоре", pos: "center center" },
  { img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/23c69f90-c2f3-4dbe-93d9-3183595fbe5d.jpg", label: "Олюдениз", pos: "center center" },
  { img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/ab8d6dd3-7af1-4f9e-a417-d06307240426.jpg", label: "Остров Св. Николая", pos: "center center" },
  { img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/7d414dc4-051b-4225-b018-da9385f4069d.jpg", label: "Древние руины", pos: "center center" },
  { img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/24f432de-4321-4ff7-a666-355f5ec5d770.jpg", label: "Бирюзовое море", pos: "center center" },
  { img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/77cf7e79-9a8b-45ef-8b23-08b9914ee5fb.jpg", label: "Закат с борта", pos: "center center" },
  { img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/a54dd1b8-4eef-4246-8f69-05765ebfb795.jpg", label: "Закат на море", pos: "center center" },
  { img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/3c1ab62f-1ef3-4ff8-9d47-99e57b6f1f19.jpg", label: "Фетхие — марина", pos: "center center" },
];

function CaptainSlider({ photos }: { photos: { src: string; label: string }[] }) {
  const [idx, setIdx] = useState(0);
  const VISIBLE = 3;
  const canPrev = idx > 0;
  const canNext = idx + VISIBLE < photos.length;
  return (
    <div className="mb-8 reveal">
      <div className="relative">
        <div className="flex gap-3 overflow-hidden">
          {photos.slice(idx, idx + VISIBLE).map((photo, i) => (
            <div key={idx + i} className="flex-shrink-0 flex flex-col gap-2" style={{ width: `calc((100% - 24px) / 3)` }}>
              <div className="rounded-2xl overflow-hidden flex items-center justify-center" style={{ border: "1px solid rgba(255,255,255,0.1)", background: "#0a1828", height: 300 }}>
                <img
                  src={photo.src}
                  alt={photo.label}
                  style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain", display: "block" }}
                />
              </div>
              <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.45)" }}>{photo.label}</p>
            </div>
          ))}
        </div>
        {canPrev && (
          <button onClick={() => setIdx(idx - 1)}
            className="absolute -left-4 top-[140px] -translate-y-1/2 p-2 rounded-full transition-all hover:scale-110 z-10"
            style={{ background: "rgba(13,31,60,0.9)", color: "#fff", border: "1px solid rgba(38,201,195,0.3)" }}>
            <Icon name="ChevronLeft" size={18} />
          </button>
        )}
        {canNext && (
          <button onClick={() => setIdx(idx + 1)}
            className="absolute -right-4 top-[140px] -translate-y-1/2 p-2 rounded-full transition-all hover:scale-110 z-10"
            style={{ background: "rgba(13,31,60,0.9)", color: "#fff", border: "1px solid rgba(38,201,195,0.3)" }}>
            <Icon name="ChevronRight" size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

function DinnerSlider({ photos }: { photos: { src: string; label: string }[] }) {
  const [idx, setIdx] = useState(0);
  return (
    <div className="relative overflow-hidden" style={{ height: "220px" }}>
      <img
        key={idx}
        src={photos[idx].src}
        alt={photos[idx].label}
        className="w-full h-full object-cover transition-all duration-500"
        style={{ objectPosition: "center 40%" }}
      />
      <div className="absolute inset-0 flex items-end justify-between p-4" style={{ background: "linear-gradient(to top, rgba(13,31,60,0.8) 0%, transparent 60%)" }}>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)", fontStyle: "italic" }}>{photos[idx].label}</p>
        <div className="flex gap-1.5">
          {photos.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className="rounded-full transition-all"
              style={{ width: i === idx ? 16 : 6, height: 6, background: i === idx ? "var(--teal)" : "rgba(255,255,255,0.4)" }} />
          ))}
        </div>
      </div>
      <button onClick={() => setIdx((p) => (p - 1 + photos.length) % photos.length)}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full"
        style={{ background: "rgba(0,0,0,0.45)", color: "#fff" }}>
        <Icon name="ChevronLeft" size={14} />
      </button>
      <button onClick={() => setIdx((p) => (p + 1) % photos.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full"
        style={{ background: "rgba(0,0,0,0.45)", color: "#fff" }}>
        <Icon name="ChevronRight" size={14} />
      </button>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden reveal"
      style={{ border: `1px solid ${open ? "rgba(38,201,195,0.3)" : "rgba(255,255,255,0.08)"}`, transition: "border-color 0.3s" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
        style={{ background: open ? "rgba(38,201,195,0.06)" : "rgba(255,255,255,0.03)", transition: "background 0.3s" }}
      >
        <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "1rem", fontWeight: 600, color: "#fff", paddingRight: "1rem" }}>
          {question}
        </span>
        <span style={{ color: "var(--teal)", fontSize: "1.2rem", flexShrink: 0, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
      </button>
      {open && (
        <div className="px-6 pb-5" style={{ background: "rgba(38,201,195,0.03)" }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: 1.7 }}>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOpaque, setNavOpaque] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [selectedYacht, setSelectedYacht] = useState<YachtDetail | null>(null);
  const [routeSlide, setRouteSlide] = useState(0);
  const [gallerySlide, setGallerySlide] = useState(0);
  const [reviewSlide, setReviewSlide] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!formRef.current || sending) return;
    const fd = new FormData(formRef.current);
    const name = (fd.get("name") as string || "").trim();
    const contact = (fd.get("contact") as string || "").trim();
    const guests = (fd.get("guests") as string || "").trim();
    const dates = (fd.get("dates") as string || "").trim();
    if (!name || !contact) { toast.error("Укажите имя и контакт"); return; }
    setSending(true);
    try {
      console.log("Submitting form to", SUBMIT_URL);
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, guests, dates }),
      });
      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);
      if (res.ok && data.ok) {
        toast.success("Заявка отправлена! Ответим в течение часа");
        formRef.current.reset();
        setTimeout(() => setFormOpen(false), 500);
      } else {
        toast.error(data.error || "Ошибка отправки");
      }
    } catch (err) {
      console.error("Fetch error:", err, "for", SUBMIT_URL);
      toast.error("Не удалось отправить. Попробуйте позже.");
    }
    finally { setSending(false); }
  };

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

  useEffect(() => {
    document.body.style.overflow = formOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [formOpen]);

  return (
    <div style={{ background: "var(--sea-deep)", color: "var(--text-primary)", fontFamily: "'Golos Text', sans-serif", minHeight: "100vh" }}>

      {formOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          onClick={(e) => e.target === e.currentTarget && setFormOpen(false)}>
          <div className="relative w-full max-w-lg rounded-3xl p-8 md:p-10 animate-fadeInUp" onClick={(e) => e.stopPropagation()} style={{ background: "linear-gradient(135deg, #112240 0%, #0d1f3c 100%)", border: "1px solid rgba(38,201,195,0.2)", boxShadow: "0 25px 60px rgba(0,0,0,0.5)", maxHeight: "90vh", overflowY: "auto" }}>
            <button onClick={() => setFormOpen(false)} className="absolute top-4 right-4 p-2 rounded-full transition-colors" style={{ color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.05)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
              <Icon name="X" size={20} />
            </button>
            <div className="text-center mb-8">
              <span className="text-3xl mb-3 block">⛵</span>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Подобрать путешествие
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Ответим в WhatsApp или Telegram в течение часа</p>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs mb-1.5 tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>Имя</label>
                <input name="name" type="text" placeholder="Как вас зовут?" required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(38,201,195,0.15)", color: "var(--text-primary)" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(38,201,195,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(38,201,195,0.15)")} />
              </div>
              <div>
                <label className="block text-xs mb-1.5 tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>WhatsApp / Telegram</label>
                <input name="contact" type="text" placeholder="+7 или @username" required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(38,201,195,0.15)", color: "var(--text-primary)" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(38,201,195,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(38,201,195,0.15)")} />
              </div>
              <div>
                <label className="block text-xs mb-1.5 tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>Сколько человек</label>
                <input name="guests" type="text" placeholder="Например, 4"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(38,201,195,0.15)", color: "var(--text-primary)" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(38,201,195,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(38,201,195,0.15)")} />
              </div>
              <div>
                <label className="block text-xs mb-1.5 tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>Желаемые даты</label>
                <input name="dates" type="text" placeholder="Июнь, вторая половина"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(38,201,195,0.15)", color: "var(--text-primary)" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(38,201,195,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(38,201,195,0.15)")} />
              </div>
              <button type="submit" disabled={sending} className="w-full py-4 rounded-xl text-base font-semibold btn-teal mt-2" style={{ color: "var(--sea-deep)", opacity: sending ? 0.6 : 1 }}>
                {sending ? "Отправляем..." : "Отправить заявку"}
              </button>
              <p className="text-xs text-center mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                Обычно отвечаем в течение часа
              </p>
            </form>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: navOpaque ? "rgba(13,31,60,0.96)" : "transparent",
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
              <button onClick={() => { setFormOpen(true); setMenuOpen(false); }} className="mt-2 py-3 px-4 rounded-full text-center text-sm btn-teal" style={{ color: "var(--sea-deep)" }}>Забронировать</button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/a883263d-1db5-44be-9d0e-e3bbb2c382e3.jpg"
            alt="Яхта в бирюзовой бухте Турции"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.45)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,31,60,0.98) 0%, rgba(13,31,60,0.4) 50%, rgba(13,31,60,0.25) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,31,60,0.55) 0%, transparent 65%)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-28 pb-20 w-full">
          <div className="mb-6 animate-fadeInUp">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium" style={{ background: "rgba(38,201,195,0.12)", color: "var(--teal)", border: "1px solid rgba(38,201,195,0.25)", backdropFilter: "blur(8px)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Сезон апрель — ноябрь 2026
            </span>
          </div>

          <h1 className="animate-fadeInUp delay-100 mb-5"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 300, color: "#fff", lineHeight: 1.08, maxWidth: "780px" }}>
            Неделя под парусом<br />
            вдоль <span className="shimmer-text" style={{ fontWeight: 600, fontStyle: "italic" }}>бирюзового</span><br />
            побережья Турции
          </h1>

          <p className="text-lg leading-relaxed mb-4 animate-fadeInUp delay-200" style={{ color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
            Небольшая команда · тихие бухты · жизнь на яхте
          </p>
          <p className="text-base mb-10 animate-fadeInUp delay-200" style={{ color: "rgba(255,255,255,0.5)", maxWidth: "480px" }}>
            4–6 гостей на борту с опытным капитаном
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 animate-fadeInUp delay-300" style={{ maxWidth: "640px" }}>
            {[
              { icon: "⛵", label: "Сезон", value: "апрель — ноябрь" },
              { icon: "🌊", label: "Маршруты", value: "Фетхие · Мармарис · Олюдениз · Кекова" },
              { icon: "👥", label: "Команда", value: "4–6 человек" },
              { icon: "💶", label: "Стоимость", value: "от 650 € с человека" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1 px-4 py-3 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}>
                <span style={{ fontSize: "1.2rem" }}>{s.icon}</span>
                <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#fff", lineHeight: 1.3 }}>{s.value}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-6 mb-10 animate-fadeInUp delay-350" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", maxWidth: "520px" }}>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
              Утро начинается в тихой бухте.<br />
              Прозрачная вода, кофе в кокпите, купание перед завтраком.
            </p>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
              Днём — переход под парусом вдоль скал и островов.<br />
              Вечером — стоянка в бухте или у пирса средиземноморского ресторана.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontStyle: "italic" }}>
              Это не массовый тур. Это жизнь на яхте и море без толпы.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 animate-fadeInUp delay-400">
            <button onClick={() => setFormOpen(true)} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold btn-teal" style={{ color: "var(--sea-deep)" }}>
              Подобрать путешествие <Icon name="ArrowRight" size={18} />
            </button>
            <a href="#yachts" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold btn-outline-teal">
              Посмотреть яхты <Icon name="Sailboat" size={18} />
            </a>
          </div>

          <p className="text-xs animate-fadeInUp delay-500" style={{ color: "rgba(255,255,255,0.35)" }}>
            На яхте всего 3 каюты — поэтому команда обычно 4–6 человек.
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll-hint" style={{ color: "rgba(255,255,255,0.4)" }}>
          <span className="text-xs tracking-widest uppercase">Листать</span>
          <Icon name="ChevronDown" size={18} />
        </div>
      </section>

      {/* DAY SCHEDULE — сразу после hero */}
      <section className="py-20 relative" style={{ background: "linear-gradient(180deg, #0d1f3c 0%, #112240 100%)" }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase mb-3 reveal" style={{ color: "var(--teal)" }}>Жизнь на яхте</p>
          <h2 className="reveal delay-100 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)" }}>
            Как проходит день на яхте
          </h2>
          <p className="text-sm mb-12 reveal delay-200" style={{ color: "var(--text-muted)" }}>
            95% наших гостей никогда раньше не путешествовали на яхте.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {DAY_SCHEDULE.map((item, i) => (
              <div key={item.time} className={`rounded-2xl overflow-hidden card-hover reveal delay-${(i + 1) * 100}`}
                style={{ border: "1px solid rgba(38,201,195,0.12)" }}>
                <div className="relative h-44 overflow-hidden">
                  <img src={item.img} alt={item.time} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,31,60,0.9) 0%, rgba(13,31,60,0.1) 60%)" }} />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--teal)" }}>{item.time}</span>
                  </div>
                </div>
                <div className="p-5" style={{ background: "rgba(13,32,64,0.7)", backdropFilter: "blur(12px)" }}>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #112240 0%, #163054 100%)" }}>
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
                  { icon: "🌊", title: "На палубе", desc: "Здесь проходит всё — завтраки под ветер, закаты с бокалом, разговоры до полуночи. Палуба становится вашим домом." },
                  { icon: "🤿", title: "В открытом море", desc: "Прыжок прямо с борта в прозрачную воду. Снорклинг, сапы, рыбалка. Никаких пляжей и толпы — только вы и море." },
                  { icon: "⛵", title: "Под парусом", desc: "Ветер надувает паруса, яхта кренится — и вы понимаете, зачем сюда приехали. 3–6 часов хода в день с остановками." },
                  { icon: "🍋", title: "У берега", desc: "Ужин прямо с борта у пирса маленького ресторана. Свежая рыба, мезе, местное вино — и огни бухты вокруг." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl p-6 card-hover" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <div className="font-semibold mb-2" style={{ color: "#fff", fontSize: "1rem" }}>{item.title}</div>
                    <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section className="py-20 relative" style={{ background: "linear-gradient(180deg, #163054 0%, #163054 100%)" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase mb-6 reveal" style={{ color: "var(--text-muted)" }}>Чем можно заняться по пути</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: "🤿", title: "Морская охота", desc: "Нырок на глубину с ружьём — и ужин уже на борту. Кристальная вода, рыба у самых скал.", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/31e9debb-691f-4f00-a7be-ea6b2a262280.jpg" },
              { icon: "🦈", title: "Фридайвинг", desc: "Задержка дыхания, тишина под водой и бескрайняя синева. Инструктаж на борту.", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/d0e664f5-7ac7-4c0e-89d9-f6d2f65628f4.jpg" },
              { icon: "🤿", title: "Снорклинг", desc: "Прозрачное дно, рыбы и морские звёзды прямо под яхтой. Маски и ласты на борту.", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/69e9220d-22e3-43a4-a889-0adfabde133f.jpg" },
              { icon: "🏄", title: "Сапы", desc: "Встать на доску и пройти бухту — тихо, в своём темпе, с видом на скалы.", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/b39de825-bdff-4b15-81cb-8dcb25bc5724.jpg" },
              { icon: "🎣", title: "Рыбалка", desc: "Закинуть снасть с кормы на ходу или на стоянке. Улов — на ужин.", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/3f28094f-29dd-41c1-bfa8-c5ef1aa883aa.jpg" },
              { icon: "🌊", title: "Морские купания", desc: "В бухтах без людей, прямо с борта — вода прозрачная до дна. Каждый день в новом месте.", img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/910fbcae-f7f5-43b9-8bb3-d14cd1c19197.jpg" },
            ].map((act) => (
              <div key={act.title} className="rounded-2xl overflow-hidden card-hover reveal" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(38,201,195,0.1)" }}>
                <div className="relative h-32 overflow-hidden">
                  <img src={act.img} alt={act.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,31,60,0.85) 0%, rgba(13,31,60,0.1) 70%)" }} />
                  <div className="absolute bottom-2 left-3 text-lg">{act.icon}</div>
                </div>
                <div className="p-4">
                  <div className="font-semibold mb-1 text-sm" style={{ color: "#fff" }}>{act.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{act.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROUTES */}
      <section id="routes" className="py-24 relative" style={{ background: "linear-gradient(180deg, #163054 0%, #0d1f3c 100%)" }}>
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
          <div className="mb-12 reveal delay-200">
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(38,201,195,0.15)" }}>
              <img
                src="https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/6e886e7c-4689-4738-a306-8a54d32f3b1b.jpg"
                alt="Карта маршрута — Ликийская тропа, побережье Турции"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Route slider */}
          <div className="relative reveal delay-200">
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(38,201,195,0.12)" }}>
              <div className="relative" style={{ height: "clamp(260px, 45vw, 420px)" }}>
                <img
                  src={ROUTE_STOPS[routeSlide].img}
                  alt={ROUTE_STOPS[routeSlide].name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,31,60,0.92) 0%, rgba(13,31,60,0.1) 55%)" }} />
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{ROUTE_STOPS[routeSlide].icon}</span>
                    <h3 className="font-semibold text-lg" style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif" }}>{ROUTE_STOPS[routeSlide].name}</h3>
                    <span className="ml-auto text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{routeSlide + 1} / {ROUTE_STOPS.length}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)", maxWidth: "520px" }}>{ROUTE_STOPS[routeSlide].desc}</p>
                </div>
                <button
                  onClick={() => setRouteSlide((p) => (p - 1 + ROUTE_STOPS.length) % ROUTE_STOPS.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full transition-all hover:scale-110"
                  style={{ background: "rgba(0,0,0,0.5)", color: "#fff", backdropFilter: "blur(8px)" }}
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                <button
                  onClick={() => setRouteSlide((p) => (p + 1) % ROUTE_STOPS.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full transition-all hover:scale-110"
                  style={{ background: "rgba(0,0,0,0.5)", color: "#fff", backdropFilter: "blur(8px)" }}
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              </div>
              {/* Dot nav */}
              <div className="flex justify-center gap-1.5 py-3" style={{ background: "rgba(13,32,64,0.7)" }}>
                {ROUTE_STOPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setRouteSlide(i)}
                    className="rounded-full transition-all"
                    style={{
                      width: i === routeSlide ? 20 : 6,
                      height: 6,
                      background: i === routeSlide ? "var(--teal)" : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 glass rounded-xl p-4 text-center reveal delay-400">
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              ✦ Маршрут может меняться в зависимости от погоды и состояния моря
            </p>
          </div>
        </div>
      </section>

      {/* CAPTAIN */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#163054" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 90% at 0% 50%, rgba(38,201,195,0.04) 0%, transparent 60%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(38,201,195,0.3), transparent)" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--teal)" }}>Ваш капитан</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Евгений
            </h2>
            <p className="mt-4 text-base" style={{ color: "var(--text-secondary)", maxWidth: "560px", margin: "1rem auto 0" }}>
              20 лет в море. Более 50 000 пройденных миль. Капитан, который сделает это путешествие незабываемым.
            </p>
          </div>

          {/* Hero photo + bio side by side */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 items-start">
            <div className="reveal">
              <div className="relative rounded-3xl overflow-hidden" style={{ height: "clamp(360px, 50vw, 520px)" }}>
                <img
                  src="https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/20776608-7f6e-47cc-ae6f-8577a963c736.jpg"
                  alt="Капитан Евгений"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: "brightness(0.92)" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,31,60,0.7) 0%, transparent 50%)" }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-lg leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "rgba(255,255,255,0.95)" }}>
                    «Главный принцип на борту: уважение к морю, яхте и команде.»
                  </p>
                </div>
              </div>
            </div>
            <div className="reveal delay-200 flex flex-col gap-4">
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">📋</span>
                  <h3 className="font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "#fff" }}>Документы и лицензии</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { short: "ГИМС РФ", full: "Права на управление моторными и парусными судами РФ", year: "с 2006 г." },
                    { short: "УЛМ", full: "Удостоверение личности моряка — международный документ профессионального морского статуса", year: "действующий" },
                    { short: "IYT", full: "International Yacht Training — международные права яхтенного капитана", year: "Skipper" },
                    { short: "РГО", full: "Русское географическое общество — член, участник экспедиций", year: "член" },
                  ].map((item) => (
                    <div key={item.short} className="flex gap-2 items-start py-1.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span className="flex-shrink-0 px-2 py-0.5 rounded text-xs font-bold" style={{ background: "rgba(38,201,195,0.15)", color: "var(--teal)", minWidth: "48px", textAlign: "center" }}>{item.short}</span>
                      <div className="flex-1 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{item.full}</div>
                      <span className="flex-shrink-0 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{item.year}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">⚓</span>
                  <h3 className="font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "#fff" }}>История и опыт</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Вырос у моря. Первый выход под парусом — в 14 лет. Прошёл все уровни: матрос, шкипер, капитан. 20 лет в море, более 50 000 пройденных миль. Сейчас проводит сезонные экспедиции вдоль турецкого побережья — маршрут, который знает наизусть, каждую бухту и каждый подводный камень.
                </p>
              </div>
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🧘</span>
                  <h3 className="font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "#fff" }}>Атмосфера на борту</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Евгений умеет создавать особую атмосферу — где все чувствуют себя командой. Он не просто везёт из точки А в точку Б — рассказывает истории о местах, учит яхтингу, готовит с вами на гриле и знает, где найти рыбу.
                </p>
              </div>
            </div>
          </div>

          {/* Captain photo slider */}
          {(() => {
            const captainPhotos = [
              { src: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/c732e4c6-bccd-482e-a03f-6258c8e73768.jpg", label: "На борту" },
              { src: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/86e49378-e4d7-4223-aa88-faad78565aef.jpg", label: "У штурвала" },
              { src: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/f842a71b-5168-48cb-bcba-ad0ad3e96301.jpg", label: "С командой в марине" },
              { src: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/1d80504d-b2c9-4a9b-b603-477b7e628a7d.jpg", label: "Улов" },
              { src: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/0f8f5b85-1cf6-42e0-9ed9-651f1a7e4ad7.jpg", label: "В марине" },
              { src: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/52624ebb-a4af-4413-b88b-86496a8ff531.jpg", label: "Парус" },
            ];
            return <CaptainSlider photos={captainPhotos} />;
          })()}

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-7 reveal delay-100">
              <div className="text-2xl mb-4">🌍</div>
              <h3 className="font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "#fff" }}>8 морей за плечами</h3>
              <div className="grid grid-cols-2 gap-2">
                {["Азовское", "Кашпийское", "Средиземное", "Эгейское", "Ионическое", "Адриатическое", "Мраморное", "Миртойское"].map((sea) => (
                  <div key={sea} className="flex items-center gap-1.5 text-xs py-1.5" style={{ color: "rgba(255,255,255,0.6)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ color: "var(--teal)", fontSize: "0.4rem" }}>●</span> {sea}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-7 reveal delay-200">
              <div className="text-2xl mb-4">🎓</div>
              <h3 className="font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "#fff" }}>Обучение на борту</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                Евгений с удовольствием обучает яхтингу прямо в море — как держать парус, читать ветер, встать на якорь. Хочешь научиться — скажи ему об этом в первый день.
              </p>
            </div>
            <div className="glass rounded-2xl p-7 reveal delay-300">
              <div className="text-2xl mb-4">🧭</div>
              <h3 className="font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "#fff" }}>О морской болезни</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
                Капитан прокладывает маршрут так, чтобы минимизировать качку: защищённые акватории, правильное время перехода, остановки в бухтах.
              </p>
              <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(38,201,195,0.08)", border: "1px solid rgba(38,201,195,0.15)" }}>
                <span style={{ fontSize: "1.4rem" }}>😌</span>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <strong style={{ color: "#fff" }}>90%</strong> гостей не испытывают дискомфорта
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YACHTS */}
      <section id="yachts" className="py-24 relative" style={{ background: "#112240" }}>
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
                className={`relative rounded-2xl overflow-hidden card-hover reveal delay-${(i + 1) * 100} flex flex-col cursor-pointer`}
                onClick={() => setSelectedYacht(yacht)}
                style={{
                  background: yacht.highlight ? "linear-gradient(135deg, rgba(38,201,195,0.12) 0%, rgba(13,32,64,0.85) 100%)" : "rgba(13,32,64,0.7)",
                  border: `1px solid ${yacht.highlight ? "rgba(38,201,195,0.3)" : "rgba(38,201,195,0.1)"}`,
                  boxShadow: yacht.highlight ? "0 0 40px rgba(38,201,195,0.1)" : "none",
                }}>
                {yacht.highlight && (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1 rounded-full text-xs font-semibold animate-glow-pulse" style={{ background: "var(--teal)", color: "var(--sea-deep)" }}>
                      Популярный выбор
                    </span>
                  </div>
                )}
                <div className="relative h-56 md:h-64 overflow-hidden flex items-center justify-center" style={{ background: "rgba(13,31,60,0.95)" }}>
                  <img src={yacht.img} alt={yacht.name} className="w-full h-full object-contain transition-transform duration-700 hover:scale-105" />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(13,31,60,0.9) 0%, rgba(13,31,60,0) 40%)" }} />
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 rounded-full text-xs flex items-center gap-1" style={{ background: "rgba(0,0,0,0.4)", color: "#fff", backdropFilter: "blur(8px)" }}>
                      <Icon name="Images" size={12} /> {1 + yacht.gallery.length} фото
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-0.5 rounded text-xs" style={{ background: `${yacht.tagColor}30`, color: yacht.tagColor, border: `1px solid ${yacht.tagColor}50`, backdropFilter: "blur(8px)" }}>
                      {yacht.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-3">
                    <div className="text-xs tracking-widest uppercase mb-1" style={{ color: yacht.tagColor }}>{yacht.subtitle}</div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: "var(--text-primary)" }}>{yacht.name}</h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>{yacht.desc}</p>
                  <div className="flex flex-col gap-2 mb-6 flex-1">
                    {yacht.specs.slice(0, 3).map((s) => (
                      <div key={s} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                        <span style={{ color: "var(--teal)" }}>✓</span> {s}
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600, color: yacht.highlight ? "var(--teal)" : "var(--text-primary)" }}>
                      {yacht.price}
                    </div>
                    <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{yacht.priceNote}</div>
                    {yacht.priceExtra && (
                      <div className="text-xs mb-4" style={{ color: "var(--text-muted)", opacity: 0.65 }}>{yacht.priceExtra}</div>
                    )}
                    {!yacht.priceExtra && <div className="mb-4" />}
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setSelectedYacht(yacht); }} className={`w-full py-2.5 rounded-full text-sm text-center flex items-center justify-center gap-2 ${yacht.highlight ? "btn-teal" : "btn-outline-teal"}`}
                    style={yacht.highlight ? { color: "var(--sea-deep)" } : {}}>
                    Подробнее <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-5">
            {/* Group discount */}
            <div className="rounded-2xl p-8 reveal delay-400" style={{ border: "1px solid rgba(38,201,195,0.25)", background: "rgba(38,201,195,0.05)" }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">👥</div>
                <div>
                  <div className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--teal)" }}>Специальные условия</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#fff" }}>Компания от 4 человек</h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.65)" }}>
                Приезжаете командой? Занимаете несколько кают — и получаете скидку. Идеально для компаний друзей, девичников и семейных поездок.
              </p>
              <div className="flex items-center gap-4 mb-6 rounded-xl px-5 py-4" style={{ background: "rgba(38,201,195,0.1)", border: "1px solid rgba(38,201,195,0.2)" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 700, color: "var(--teal)", lineHeight: 1 }}>−10%</div>
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                  скидка на стоимость<br />каждого участника
                </div>
              </div>
              <button onClick={() => setFormOpen(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm btn-outline-teal">
                Узнать подробности <Icon name="ArrowRight" size={16} />
              </button>
            </div>

            {/* Full yacht */}
            <div className="rounded-2xl p-8 reveal delay-500" style={{ border: "1px solid rgba(232,184,75,0.3)", background: "rgba(232,184,75,0.04)" }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">🏆</div>
                <div>
                  <div className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>Закрытое путешествие</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#fff" }}>Аренда яхты целиком</h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.65)" }}>
                Только ваша команда и капитан. Никаких попутчиков. Вы сами задаёте ритм: маршрут, стоянки, время отплытия. Девичники, свадьбы, корпоративы, дни рождения.
              </p>
              <div className="flex flex-col gap-3 mb-6">
                {[
                  { name: "Bavaria 42", guests: "до 6 чел.", price: "4 500 €" },
                  { name: "Dufour 455", guests: "до 6 чел.", price: "5 280 €" },
                  { name: "Катамаран", guests: "до 8 чел.", price: "9 600 €" },
                ].map((y) => (
                  <div key={y.name} className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: "rgba(232,184,75,0.08)", border: "1px solid rgba(232,184,75,0.15)" }}>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: "#fff" }}>{y.name}</div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{y.guests}</div>
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--gold)" }}>
                      {y.price} <span className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.5)" }}>/ неделя</span>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setFormOpen(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm btn-gold" style={{ color: "var(--sea-deep)" }}>
                Запросить условия <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ACCOMMODATION */}
      <section id="accommodation" className="py-24 relative" style={{ background: "#0d1e3a" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(38,201,195,0.3), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-3 reveal" style={{ color: "var(--teal)" }}>На борту</p>
            <h2 className="reveal delay-100 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Как устроена жизнь на яхте
            </h2>
            <p className="reveal delay-200" style={{ color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto" }}>
              95% наших гостей впервые на яхте. Рассказываем, где спать, есть и мыться — без сюрпризов.
            </p>
          </div>

          {/* 4 зоны — каждая карточка с фото */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              {
                icon: "🛏",
                title: "Каюта — ваша личная комната",
                desc: "Отдельное закрытое пространство для 1–2 человек. Внутри: полноценная двуспальная кровать, бельё и полотенца, деревянная отделка, иллюминатор с видом на воду, освещение и розетки. Закрывается на замок. По ощущениям — уютный гостиничный номер, только над морем.",
                img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/1ab7abb5-5f05-4f4f-90b3-9d30bc9399fc.jpeg",
              },
              {
                icon: "🍽",
                title: "Кают-компания — общая гостиная",
                desc: "Салон в центре яхты, где все собираются вместе. Здесь завтракают, ужинают, играют в карты и разговаривают до полуночи. Большой стол, мягкие диваны по бортам, навигационный стол капитана. Кухня (камбуз) — тут же: плита, холодильник, раковина.",
                img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/85c2fda3-4078-4543-a87c-af2fde450dca.png",
              },
              {
                icon: "🚿",
                title: "Душ и туалет — на борту",
                desc: "На Bavaria и Dufour — 2 санузла с душем на борту. Горячий душ работает каждый день. На катамаране — отдельный санузел в каждой каюте. Также на купальной платформе есть душ с пресной водой — ополоснуться после моря.",
                img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/94c7012e-9644-4e4e-9f53-a3ce7e02f996.jpeg",
              },
              {
                icon: "⛵",
                title: "Кокпит — ваша открытая терраса",
                desc: "Кокпит — это открытая площадка на корме, где проходит большая часть жизни. Завтраки под ветер, закаты с бокалом, ужины у тихих скал. Здесь стоит штурвал, здесь сидит капитан, и здесь вы будете проводить большую часть времени в море.",
                img: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/d6422ad4-32fe-4c6e-aed1-9a2440a69a7f.jpg",
              },
            ].map((zone, i) => (
              <div key={zone.title} className={`rounded-2xl overflow-hidden reveal delay-${(i + 1) * 100}`} style={{ border: "1px solid rgba(38,201,195,0.12)" }}>
                <div className="relative h-48 overflow-hidden">
                  <img src={zone.img} alt={zone.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,31,60,0.85) 0%, transparent 55%)" }} />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="text-xl">{zone.icon}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 600, color: "#fff" }}>{zone.title}</span>
                  </div>
                </div>
                <div className="p-5" style={{ background: "rgba(13,32,64,0.7)" }}>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{zone.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Итоговая плашка */}
          <div className="rounded-2xl p-6 reveal delay-500 flex flex-col md:flex-row gap-4 items-center" style={{ background: "rgba(38,201,195,0.05)", border: "1px solid rgba(38,201,195,0.2)" }}>
            <div className="text-3xl flex-shrink-0">💡</div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              <strong style={{ color: "#fff" }}>Главное отличие от отеля:</strong> пространство компактное, зато всё время рядом с морем. Утром открываешь иллюминатор — вода в метре от тебя. Никаких коридоров, лифтов и ресепшенов — только яхта, команда и открытое море.
            </p>
          </div>
        </div>
      </section>

      {/* GLOSSARY */}
      <section className="py-20 relative" style={{ background: "#0a1828" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(38,201,195,0.15), transparent)" }} />
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase mb-3 reveal" style={{ color: "var(--teal)" }}>Для новичков</p>
            <h2 className="reveal delay-100 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Словарь яхтсмена
            </h2>
            <p className="text-sm reveal delay-200" style={{ color: "var(--text-muted)" }}>Чтобы вы понимали, о чём говорит капитан</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3 reveal delay-200">
            {YACHT_GLOSSARY.map((item) => (
              <div key={item.term} className="flex gap-4 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(38,201,195,0.08)" }}>
                <div className="flex-shrink-0 px-3 py-1 rounded-lg h-fit" style={{ background: "rgba(38,201,195,0.12)", border: "1px solid rgba(38,201,195,0.2)" }}>
                  <span className="text-xs font-bold" style={{ color: "var(--teal)", whiteSpace: "nowrap" }}>{item.term}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{item.def}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 relative" style={{ background: "linear-gradient(180deg, #112240 0%, #0d1f3c 100%)" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(38,201,195,0.3), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-3 reveal" style={{ color: "var(--teal)" }}>Услуги</p>
            <h2 className="reveal delay-100" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Морские недели
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {SPECIAL_WEEKS.map((item, i) => (
              <div key={item.title} className={`rounded-2xl overflow-hidden card-hover reveal delay-${(i % 3 + 1) * 100}`} style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                <div className="relative h-52 overflow-hidden flex items-center justify-center" style={{ background: "#0a1828" }}>
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,31,60,0.8) 0%, transparent 55%)" }} />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-semibold text-sm" style={{ color: "#fff" }}>{item.title}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing 3 variants */}
          <div className="mb-6">
            <h3 className="text-center font-semibold text-lg mb-8 reveal" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--text-primary)", fontSize: "1.6rem" }}>
              💰 Стоимость участия
            </h3>
            <div className="pricing-grid grid md:grid-cols-3 gap-5">
              {/* Bavaria — популярный выбор */}
              <div
                className="rounded-2xl overflow-hidden reveal delay-100 relative cursor-pointer transition-transform hover:-translate-y-1"
                style={{ border: "1px solid rgba(38,201,195,0.4)", boxShadow: "0 0 30px rgba(38,201,195,0.12)" }}
                onClick={() => { document.getElementById("yachts")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1 rounded-full text-xs font-semibold" style={{ background: "var(--teal)", color: "var(--sea-deep)" }}>Популярный выбор</span>
                </div>
                <div className="px-6 pt-8 pb-5" style={{ background: "linear-gradient(135deg, rgba(38,201,195,0.14) 0%, rgba(13,32,64,0.9) 100%)" }}>
                  <div className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--teal)" }}>Bavaria 42 · Комфорт</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 600, color: "var(--teal)", lineHeight: 1 }}>от 750 €</div>
                  <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>за человека / неделю</div>
                </div>
                <div className="px-6 py-5 flex items-center justify-between" style={{ background: "rgba(13,31,60,0.6)" }}>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>3 каюты · до 6 гостей · год 2001</div>
                  <span style={{ color: "var(--teal)" }}><Icon name="ArrowRight" size={14} /></span>
                </div>
              </div>

              {/* Dufour */}
              <div
                className="rounded-2xl overflow-hidden reveal delay-200 cursor-pointer transition-transform hover:-translate-y-1"
                style={{ border: "1px solid rgba(38,201,195,0.15)" }}
                onClick={() => { document.getElementById("yachts")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                <div className="px-6 pt-6 pb-5" style={{ background: "rgba(13,32,64,0.8)" }}>
                  <div className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--teal)" }}>Dufour 455 · Комфорт+</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 600, color: "#fff", lineHeight: 1 }}>от 880 €</div>
                  <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>за человека / неделю</div>
                </div>
                <div className="px-6 py-5 flex items-center justify-between" style={{ background: "rgba(13,31,60,0.6)" }}>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>3 каюты · до 6 гостей · год 2006</div>
                  <span style={{ color: "var(--teal)" }}><Icon name="ArrowRight" size={14} /></span>
                </div>
              </div>

              {/* Catamaran */}
              <div
                className="rounded-2xl overflow-hidden reveal delay-300 cursor-pointer transition-transform hover:-translate-y-1"
                style={{ border: "1px solid rgba(167,139,250,0.2)" }}
                onClick={() => { document.getElementById("yachts")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                <div className="px-6 pt-6 pb-5" style={{ background: "rgba(13,32,64,0.8)" }}>
                  <div className="text-xs tracking-widest uppercase mb-1" style={{ color: "#a78bfa" }}>Катамаран · Премиум</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 600, color: "#fff", lineHeight: 1 }}>от 1 200 €</div>
                  <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>за человека / неделю</div>
                </div>
                <div className="px-6 py-5 flex items-center justify-between" style={{ background: "rgba(13,31,60,0.6)" }}>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>4 каюты · до 8 гостей · максимальный простор</div>
                  <span style={{ color: "#a78bfa" }}><Icon name="ArrowRight" size={14} /></span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-5 reveal delay-400">
            {/* Included */}
            <div className="rounded-2xl p-7" style={{ background: "rgba(38,201,195,0.05)", border: "1px solid rgba(38,201,195,0.2)" }}>
              <div className="text-2xl mb-4">✅</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#fff", marginBottom: "1rem" }}>Входит в стоимость</h3>
              <div className="space-y-2.5">
                {["Проживание на яхте всю неделю", "Услуги опытного капитана", "Маршрут по бухтам и стоянкам", "Топливо и навигация", "Всё оборудование яхты", "Маски, ласты, сапы на борту"].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span style={{ color: "var(--teal)", marginTop: "2px", flexShrink: 0 }}>✓</span>
                    <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Not included */}
            <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="text-2xl mb-4">📋</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#fff", marginBottom: "1rem" }}>Оплачивается отдельно</h3>
              <div className="space-y-2.5">
                {["Питание (продукты или рестораны)", "Стоянки в маринах (≈ 20–50 € / ночь)", "Перелёт до Турции и обратно", "Страховка путешественника", "Личные расходы"].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span style={{ color: "rgba(255,255,255,0.3)", marginTop: "2px", flexShrink: 0 }}>–</span>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden reveal delay-400 mt-6" style={{ border: "1px solid rgba(38,201,195,0.15)" }}>
            <div className="grid md:grid-cols-2">
              <div className="relative overflow-hidden" style={{ minHeight: "260px" }}>
                <img
                  src="https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/d470a3be-3852-47b8-8d50-a52ab065532b.jpeg"
                  alt="Ужин на яхте"
                  className="w-full h-full object-cover"
                  style={{ minHeight: "260px" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, rgba(13,32,64,0.5) 100%)" }} />
              </div>
              <div className="p-7 flex flex-col justify-center" style={{ background: "rgba(13,32,64,0.7)" }}>
                <h3 className="font-semibold text-lg mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--text-primary)", fontSize: "1.4rem" }}>
                  👨‍🍳 Повар на борту
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                  По желанию — повар на весь маршрут. Готовит прямо на борту: на газу, на гриле, из свежих местных продуктов. Рыба, пойманная утром — уже на столе к обеду.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Завтраки", "Обеды", "Ужины", "Гриль на борту", "Свежая рыба"].map((meal) => (
                    <span key={meal} className="px-3 py-1 rounded-full text-xs" style={{ background: "rgba(38,201,195,0.08)", color: "var(--teal)", border: "1px solid rgba(38,201,195,0.15)" }}>
                      {meal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {(() => {
              const dinnerPhotos = [
                { src: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/6a38c055-5bea-47e3-a34b-6b2158169b02.jpg", label: "Ужин у воды" },
                { src: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/d470a3be-3852-47b8-8d50-a52ab065532b.jpeg", label: "Свежие блюда на борту" },
                { src: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/d6422ad4-32fe-4c6e-aed1-9a2440a69a7f.jpg", label: "Компания за столом" },
                { src: "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/bucket/94d0fe48-da26-4233-ac06-47e6e806a99c.jpeg", label: "Праздничный стол на катамаране" },
              ];
              return <DinnerSlider photos={dinnerPhotos} />;
            })()}
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

      {/* GALLERY */}
      <section id="gallery" className="py-24 relative" style={{ background: "linear-gradient(180deg, #163054 0%, #0d1f3c 100%)" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(38,201,195,0.3), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-3 reveal" style={{ color: "var(--teal)" }}>Галерея</p>
            <h2 className="reveal delay-100" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Жизнь на воде
            </h2>
          </div>
          {/* Main slider */}
          <div className="relative rounded-3xl overflow-hidden mb-4 reveal" style={{ height: "clamp(320px, 55vw, 600px)", border: "1px solid rgba(38,201,195,0.15)" }}>
            <img
              src={GALLERY_ITEMS[gallerySlide].img}
              alt={GALLERY_ITEMS[gallerySlide].label}
              className="w-full h-full object-cover transition-all duration-500"
              style={{ objectPosition: GALLERY_ITEMS[gallerySlide].pos }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,31,60,0.7) 0%, transparent 55%)" }} />
            <div className="absolute bottom-6 left-6">
              <span className="text-base font-medium" style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>
                {GALLERY_ITEMS[gallerySlide].label}
              </span>
              <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{gallerySlide + 1} / {GALLERY_ITEMS.length}</div>
            </div>
            <button
              onClick={() => setGallerySlide((p) => (p - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all hover:scale-110"
              style={{ background: "rgba(0,0,0,0.5)", color: "#fff", backdropFilter: "blur(8px)" }}
            >
              <Icon name="ChevronLeft" size={22} />
            </button>
            <button
              onClick={() => setGallerySlide((p) => (p + 1) % GALLERY_ITEMS.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all hover:scale-110"
              style={{ background: "rgba(0,0,0,0.5)", color: "#fff", backdropFilter: "blur(8px)" }}
            >
              <Icon name="ChevronRight" size={22} />
            </button>
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {GALLERY_ITEMS.map((item, i) => (
              <button
                key={item.label}
                onClick={() => setGallerySlide(i)}
                className="flex-shrink-0 rounded-xl overflow-hidden transition-all"
                style={{
                  width: 80, height: 60,
                  border: i === gallerySlide ? "2px solid var(--teal)" : "2px solid transparent",
                  opacity: i === gallerySlide ? 1 : 0.55,
                }}
              >
                <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 relative" style={{ background: "#112240" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(38,201,195,0.3), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-3 reveal" style={{ color: "var(--teal)" }}>Отзывы</p>
            <h2 className="reveal delay-100" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Те, кто уже побывал
            </h2>
          </div>
          {(() => {
            const PER = 3;
            const total = Math.ceil(REVIEWS.length / PER);
            const visible = REVIEWS.slice(reviewSlide * PER, reviewSlide * PER + PER);
            return (
              <div>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {visible.map((review) => (
                    <div key={review.name} className="rounded-2xl overflow-hidden flex flex-col" style={{ border: "1px solid rgba(38,201,195,0.12)", background: "rgba(255,255,255,0.03)" }}>
                      <div className="relative h-44 overflow-hidden flex-shrink-0">
                        <img src={review.img} alt={review.trip} className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,31,60,0.75) 0%, transparent 55%)" }} />
                        <div className="absolute bottom-3 left-4 flex gap-0.5">
                          {Array(review.stars).fill(0).map((_, j) => (
                            <span key={j} style={{ color: "var(--gold)" }}>★</span>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "var(--text-secondary)" }}>"{review.text}"</p>
                        <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                          <div>
                            <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{review.name}</div>
                            <div className="text-xs" style={{ color: "var(--text-muted)" }}>{review.city}</div>
                          </div>
                          <div className="text-xs px-2 py-1 rounded" style={{ background: "rgba(38,201,195,0.08)", color: "var(--teal)" }}>{review.trip}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-4">
                  <button onClick={() => setReviewSlide(p => Math.max(0, p - 1))} disabled={reviewSlide === 0}
                    className="p-2.5 rounded-full transition-all"
                    style={{ background: reviewSlide === 0 ? "rgba(255,255,255,0.05)" : "rgba(38,201,195,0.15)", color: reviewSlide === 0 ? "rgba(255,255,255,0.2)" : "var(--teal)", border: "1px solid rgba(38,201,195,0.2)" }}>
                    <Icon name="ChevronLeft" size={18} />
                  </button>
                  <div className="flex gap-2">
                    {Array(total).fill(0).map((_, i) => (
                      <button key={i} onClick={() => setReviewSlide(i)} className="rounded-full transition-all"
                        style={{ width: i === reviewSlide ? 20 : 8, height: 8, background: i === reviewSlide ? "var(--teal)" : "rgba(255,255,255,0.2)" }} />
                    ))}
                  </div>
                  <button onClick={() => setReviewSlide(p => Math.min(total - 1, p + 1))} disabled={reviewSlide === total - 1}
                    className="p-2.5 rounded-full transition-all"
                    style={{ background: reviewSlide === total - 1 ? "rgba(255,255,255,0.05)" : "rgba(38,201,195,0.15)", color: reviewSlide === total - 1 ? "rgba(255,255,255,0.2)" : "var(--teal)", border: "1px solid rgba(38,201,195,0.2)" }}>
                    <Icon name="ChevronRight" size={18} />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 relative" style={{ background: "linear-gradient(180deg, #112240 0%, #0d1f3c 100%)" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(38,201,195,0.3), transparent)" }} />
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-3 reveal" style={{ color: "var(--teal)" }}>Честно о главном</p>
            <h2 className="reveal delay-100 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Чем мы отличаемся<br />от 90% похожих предложений
            </h2>
            <p className="text-base reveal delay-200" style={{ color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto" }}>
              Рынок яхтенных туров большой. Вот почему гости возвращаются снова.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {[
              {
                icon: "🧭",
                title: "Капитан — не наёмник, а хозяин",
                desc: "Евгений относится к яхте как к родной — следит, чинит, знает каждый болт. Большинство операторов нанимают случайных шкиперов под сезон. Здесь капитан вкладывает душу, потому что это его дело и его море.",
                accent: true,
              },
              {
                icon: "📚",
                title: "20 лет в море и живая история",
                desc: "Евгений не просто везёт из точки А в точку Б. Он знает историю каждого места: затопленные города, древние церкви, тайные бухты. Экскурсия происходит сама собой — прямо с борта.",
                accent: false,
              },
              {
                icon: "🎒",
                title: "Оборудование, которого нет у других",
                desc: "Два SUP-борда, маски и ласты, снаряжение для подводной охоты, удочки, гамак, мангал, ледогенератор — всё включено. Большинство аренд дают пустую яхту. Мы даём полное снаряжение для активного отдыха.",
                accent: false,
              },
              {
                icon: "🎭",
                title: "Тематические программы под запрос",
                desc: "Морская охота, свадьба на борту, день рождения с квестом, Ликийская тропа, обучение яхтингу — каждый тур можно настроить. Не типовой маршрут, а путешествие под вас.",
                accent: false,
              },
              {
                icon: "👥",
                title: "Маленькая группа — не безликий чартер",
                desc: "Максимум 6–8 человек. Никаких попутчиков с другого сайта, никакой толпы. Либо своя компания, либо небольшой сборный тур — в любом случае камерная атмосфера.",
                accent: false,
              },
              {
                icon: "🔒",
                title: "Прозрачные условия без скрытых платежей",
                desc: "Цена фиксируется заранее. Никаких «доплати на месте за газ», «порт отдельно» и других сюрпризов. Всё, что входит — написано явно. Предоплата фиксирует место, остаток — при посадке.",
                accent: false,
              },
            ].map((item) => (
              <div key={item.title} className={`rounded-2xl p-7 reveal flex gap-5 items-start`}
                style={{
                  background: item.accent ? "linear-gradient(135deg, rgba(38,201,195,0.1) 0%, rgba(13,32,64,0.8) 100%)" : "rgba(255,255,255,0.03)",
                  border: item.accent ? "1px solid rgba(38,201,195,0.35)" : "1px solid rgba(255,255,255,0.08)",
                }}>
                <div className="text-3xl flex-shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <h3 className="font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: item.accent ? "var(--teal)" : "#fff" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-8 text-center reveal" style={{ background: "rgba(38,201,195,0.05)", border: "1px solid rgba(38,201,195,0.2)" }}>
            <p className="text-base leading-relaxed mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "#fff", fontStyle: "italic" }}>
              «Мы не продаём недели на яхте. Мы делаем так, чтобы вы захотели вернуться.»
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>— 90% гостей рекомендуют нас друзьям</p>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 relative overflow-hidden" style={{ background: "#0d1f3c" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(38,201,195,0.06) 0%, transparent 70%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(38,201,195,0.3), transparent)" }} />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase mb-4 reveal" style={{ color: "var(--teal)" }}>Ближайшие путешествия</p>
          <h2 className="reveal delay-100 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)" }}>
            Места ограничены
          </h2>
          <p className="text-base leading-relaxed mb-12 reveal delay-200" style={{ color: "var(--text-secondary)" }}>
            Каждое путешествие — небольшая группа. Мест немного, и они разбираются задолго до старта.
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
            <p className="text-sm italic mb-8" style={{ color: "var(--text-muted)" }}>
              Иногда именно такие недели становятся самыми запоминающимися.
            </p>

            {/* Payment terms */}
            <div className="grid grid-cols-2 gap-3 mb-8 text-left">
              <div className="rounded-xl p-4" style={{ background: "rgba(38,201,195,0.06)", border: "1px solid rgba(38,201,195,0.2)" }}>
                <div className="text-lg mb-1">🔒</div>
                <div className="text-xs font-semibold mb-1" style={{ color: "var(--teal)" }}>Предоплата при бронировании</div>
                <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>Фиксируете место сейчас — вносите часть суммы</div>
              </div>
              <div className="rounded-xl p-4" style={{ background: "rgba(232,184,75,0.06)", border: "1px solid rgba(232,184,75,0.2)" }}>
                <div className="text-lg mb-1">⛵</div>
                <div className="text-xs font-semibold mb-1" style={{ color: "var(--gold)" }}>Остаток в день заезда</div>
                <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>Доплачиваете при посадке на яхту в маринe</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setFormOpen(true)} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base btn-gold" style={{ color: "var(--sea-deep)" }}>
                Забронировать <Icon name="ArrowRight" size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section className="py-24 relative" style={{ background: "linear-gradient(180deg, #0d1f3c 0%, #112240 100%)" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(38,201,195,0.3), transparent)" }} />
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-3 reveal" style={{ color: "var(--teal)" }}>Честно</p>
            <h2 className="reveal delay-100" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Кому подойдёт это путешествие
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-8 reveal" style={{ background: "rgba(38,201,195,0.05)", border: "1px solid rgba(38,201,195,0.2)" }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">✅</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#fff" }}>Подойдёт</h3>
              </div>
              <div className="space-y-4">
                {[
                  "тем, кто устал от массовых курортов",
                  "кто любит море и природу",
                  "кто хочет тишины и свободы",
                  "небольшие компании друзей",
                  "пары",
                  "девичники",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span style={{ color: "var(--teal)", marginTop: "2px", flexShrink: 0 }}>✓</span>
                    <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-8 reveal delay-200" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🚫</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "#fff" }}>Не подойдёт</h3>
              </div>
              <div className="space-y-4">
                {[
                  "тем, кто ждёт пятизвёздочный отель",
                  "тем, кто не любит море",
                  "тем, кто ищет шумные вечеринки",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span style={{ color: "rgba(255,255,255,0.3)", marginTop: "2px", flexShrink: 0 }}>✕</span>
                    <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-10 reveal delay-300">
            <button onClick={() => setFormOpen(true)} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold btn-teal" style={{ color: "var(--sea-deep)" }}>
              Подобрать путешествие <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 relative" style={{ background: "#112240" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(38,201,195,0.3), transparent)" }} />
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase mb-3 reveal" style={{ color: "var(--teal)" }}>FAQ</p>
            <h2 className="reveal delay-100" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Частые вопросы
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "Нужно ли иметь опыт яхтинга?", a: "Нет. Для путешествия не требуется никакого опыта. Капитан управляет яхтой и отвечает за маршрут и безопасность. Если интересно, можно поучаствовать в управлении — попробовать держать курс, работать с парусами и узнать, как устроена жизнь на яхте." },
              { q: "Сколько человек будет на борту?", a: "Обычно 4–6 человек плюс капитан, на катамаране до 10. Это небольшая команда, поэтому на борту сохраняется спокойная и дружелюбная атмосфера." },
              { q: "Где мы будем ночевать?", a: "Два варианта: в тихих бухтах на якоре — с чистой водой и звёздным небом, или в маринах небольших прибрежных городов. Чаще всего ночёвки проходят в красивых бухтах или у частных пирсов ресторанов со средиземноморской кухней." },
              { q: "Как проходит обычный день на яхте?", a: "Утром — завтрак и купание. Днём — переход под парусом и остановки в бухтах. Вечером — новая стоянка и ужин на берегу или на яхте. Каждый день — новая бухта и новые пейзажи." },
              { q: "Будет ли морская болезнь?", a: "90% наших гостей не испытывают дискомфорта от морской болезни: переходы проходят вдоль берега, яхты устойчивы. На борту есть препараты, и капитан знает много приёмов, чтобы вас не укачало." },
              { q: "Тесно ли на яхте?", a: "Яхта устроена компактно, но продуманно. На борту есть каюты для сна, кухня, душ и туалеты, просторная палуба и зоны отдыха. Большую часть времени гости проводят на палубе или в море." },
              { q: "Как организовано питание?", a: "Несколько вариантов: готовить на яхте, закупать продукты вместе или ужинать в ресторанах на берегу. Обычно команда выбирает комфортный для всех вариант." },
              { q: "Безопасно ли путешествовать на яхте?", a: "Капитан имеет многолетний опыт морских переходов и международные лицензии. На борту есть всё необходимое оборудование безопасности. Маршрут всегда строится с учётом погодных условий." },
              { q: "Можно ли поехать одному?", a: "Да. Многие гости приезжают по одному и знакомятся уже на борту. Через пару дней команда обычно становится дружной компанией." },
              { q: "Можно ли арендовать яхту полностью?", a: "Да. Яхту можно забронировать целиком для компании друзей, семьи, девичника или свадебного путешествия." },
              { q: "Что самое ценное в таком путешествии?", a: "Каждый день начинается в новой бухте. Нет спешки, нет толп туристов, нет привычной суеты. Есть море, ветер и ощущение свободы. Через несколько дней многие замечают, что перестают смотреть в телефон и просто начинают жить моментом." },
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 relative" style={{ background: "#163054" }}>
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
                    { icon: "MessageCircle", label: "Telegram", value: "@yacht_week_bot", href: "https://t.me/yacht_week_bot" },
                    { icon: "Phone", label: "Телефон", value: "+7 (928) 905-16-18", href: "tel:+79289051618" },
                    { icon: "Phone", label: "Телефон", value: "+7 (920) 751-75-15", href: "tel:+79207517515" },
                  ].map((contact, i) => (
                    <a key={contact.label + i} href={contact.href}
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

      <YachtModal
        yacht={selectedYacht}
        onClose={() => setSelectedYacht(null)}
        onBook={() => { setSelectedYacht(null); setFormOpen(true); }}
      />

      {/* Floating CTA */}
      <div
        className="fixed bottom-6 right-6 z-50"
        style={{ filter: "drop-shadow(0 4px 24px rgba(38,201,195,0.35))" }}
      >
        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold btn-teal animate-glow-pulse"
          style={{ color: "var(--sea-deep)" }}
        >
          <Icon name="Calendar" size={16} />
          Забронировать
        </button>
      </div>
    </div>
  );
}