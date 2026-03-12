import json
import os
import urllib.request

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
CHAT_IDS = [c.strip() for c in os.environ.get("TELEGRAM_CHAT_IDS", "").split(",") if c.strip()]

YACHT_PHOTOS = [
    "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/e0b1280c-9f05-4527-aa0d-1a900f0ff9e0.jpg",
    "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/ab80fa8c-e10a-4261-a773-70389cfd5cb0.jpg",
    "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/b3fa61df-77bd-45d0-9c41-58eb93962faf.jpg",
    "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/fe6f1d55-c4ae-42d0-9bee-e4f5c33388b7.jpg",
    "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/b4399b74-8a91-4f26-97bd-66882dfe61b6.jpg",
    "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/712f8940-a329-4ab8-85ac-9a5e109b00e6.jpg",
    "https://cdn.poehali.dev/projects/281b68c9-e4d3-42d4-bf37-8d9d27e5e4e9/files/bf2476da-c70e-4ee3-b660-a427e3062b84.jpg",
]

WEEK_DAYS = [
    ("🌅 *День 1 — Старт из Фетхие*\nЗнакомство с командой, закупка продуктов на местном рынке. "
     "Выход в море к первой бухте. Первый закат на борту с бокалом вина."),
    ("⛵ *День 2 — Олюдениз и Бухта Бабочек*\nУтренний заплыв в бирюзовой лагуне Олюдениз. "
     "Переход в Бухту Бабочек — снорклинг у скал, обед на борту."),
    ("🏛 *День 3 — Остров Гемилер*\nРуины византийских церквей прямо у воды. "
     "Пешая прогулка по острову, купание в кристально чистой воде."),
    ("🌊 *День 4 — Дикие бухты*\nДень вдали от цивилизации. Фридайвинг, рыбалка, "
     "готовим улов на гриле. Ночуем под звёздами в тихой бухте."),
    ("🏘 *День 5 — Каш*\nПрогулка по узким улочкам с бугенвиллеей. "
     "Террасные рестораны с видом на море. Свежайшие морепродукты на ужин."),
    ("🏺 *День 6 — Кекова и Демре*\nЗатопленный античный город — руины видны прямо через воду. "
     "Скальные гробницы Миры, церковь Святого Николая."),
    ("⚓ *День 7 — Возвращение*\nНеспешный переход обратно в марину. "
     "Последний заплыв, прощальный обед, обмен контактами с новыми друзьями."),
]

MAIN_MENU_TEXT = (
    "⛵ *Яхтинг в Турции — частные путешествия*\n\n"
    "На яхте всего 3 каюты, поэтому команда обычно 4–6 человек. "
    "Это не массовый туризм — это ваше личное путешествие.\n\n"
    "Выберите, что вас интересует:"
)

DATES_TEXT = (
    "📅 *Свободные даты на 2025–2026*\n\n"
    "🟢 *Июнь 2025* — 7–14, 21–28\n"
    "🟢 *Июль 2025* — 5–12, 19–26\n"
    "🟢 *Август 2025* — 2–9, 16–23, 30–6 сент\n"
    "🟡 *Сентябрь 2025* — 6–13, 20–27\n"
    "🟢 *Октябрь 2025* — 4–11\n\n"
    "🟢 — свободно, 🟡 — осталось 1-2 каюты\n\n"
    "Маршрут и даты можно подстроить под вас. "
    "Напишите, и мы подберём идеальную неделю!"
)

YACHTS_TEXT = (
    "🛥 *Яхты и размещение*\n\n"
    "*Bavaria 46 Cruiser*\n"
    "Длина 14 м · 3 каюты · до 6 гостей\n"
    "Просторный кокпит, полная кухня, 2 гальюна с душем\n\n"
    "*Dufour 460 Grand Large*\n"
    "Длина 14.15 м · 3 каюты · до 6 гостей\n"
    "Современный дизайн, панорамные иллюминаторы\n\n"
    "*Fountaine Pajot Lucia 40* (катамаран)\n"
    "Длина 12.3 м · 3 каюты · до 6 гостей\n"
    "Максимальная стабильность, огромная палуба\n\n"
    "Все яхты оборудованы: кондиционер, холодильник, плита, "
    "навигация, снорклинг-оборудование, тендер с мотором."
)

PRICE_TEXT = (
    "💰 *Стоимость путешествия*\n\n"
    "Яхта целиком (до 6 гостей):\n"
    "• Июнь, сентябрь — от *€2 500* / неделя\n"
    "• Июль, август — от *€3 200* / неделя\n\n"
    "В стоимость входит:\n"
    "✅ Аренда яхты с капитаном\n"
    "✅ Топливо и стоянки\n"
    "✅ Снаряжение для снорклинга\n"
    "✅ Тендер с мотором\n"
    "✅ Постельное бельё и полотенца\n\n"
    "Дополнительно оплачивается:\n"
    "🍽 Питание (~€30–40/день на человека)\n"
    "🛂 Перелёт\n\n"
    "При компании 4–6 человек выходит от *€400–600* на человека за неделю."
)


def tg_api(method, payload):
    """Отправка запроса в Telegram Bot API"""
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/{method}"
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


def send_message(chat_id, text, reply_markup=None, parse_mode="Markdown"):
    payload = {"chat_id": chat_id, "text": text, "parse_mode": parse_mode}
    if reply_markup:
        payload["reply_markup"] = reply_markup
    return tg_api("sendMessage", payload)


def send_photo(chat_id, photo_url, caption="", reply_markup=None):
    payload = {"chat_id": chat_id, "photo": photo_url, "caption": caption, "parse_mode": "Markdown"}
    if reply_markup:
        payload["reply_markup"] = reply_markup
    return tg_api("sendPhoto", payload)


def send_media_group(chat_id, photos, caption=""):
    media = []
    for i, url in enumerate(photos):
        item = {"type": "photo", "media": url}
        if i == 0 and caption:
            item["caption"] = caption
            item["parse_mode"] = "Markdown"
        media.append(item)
    return tg_api("sendMediaGroup", {"chat_id": chat_id, "media": media})


def answer_callback(callback_query_id):
    tg_api("answerCallbackQuery", {"callback_query_id": callback_query_id})


def main_menu_keyboard():
    return {"inline_keyboard": [
        [{"text": "🧭 Подобрать путешествие", "callback_data": "pick_trip"}],
        [{"text": "📅 Свободные даты", "callback_data": "dates"}],
        [{"text": "🛥 Яхты и размещение", "callback_data": "yachts"}],
        [{"text": "💰 Сколько стоит", "callback_data": "price"}],
        [{"text": "📸 Как проходит неделя на яхте", "callback_data": "week_story"}],
        [{"text": "✍️ Написать капитану", "callback_data": "contact_captain"}],
    ]}


def back_and_pick_keyboard():
    return {"inline_keyboard": [
        [{"text": "🧭 Подобрать путешествие", "callback_data": "pick_trip"}],
        [{"text": "◀️ Главное меню", "callback_data": "main_menu"}],
    ]}


def back_keyboard():
    return {"inline_keyboard": [
        [{"text": "◀️ Главное меню", "callback_data": "main_menu"}],
    ]}


def handle_start(chat_id):
    send_message(chat_id, MAIN_MENU_TEXT, main_menu_keyboard())


def handle_dates(chat_id):
    send_message(chat_id, DATES_TEXT, {"inline_keyboard": [
        [{"text": "📅 Показать даты", "callback_data": "dates"}],
        [{"text": "🧭 Подобрать путешествие", "callback_data": "pick_trip"}],
        [{"text": "◀️ Главное меню", "callback_data": "main_menu"}],
    ]})


def handle_yachts(chat_id):
    send_message(chat_id, YACHTS_TEXT, back_and_pick_keyboard())


def handle_price(chat_id):
    send_message(chat_id, PRICE_TEXT, back_and_pick_keyboard())


def handle_week_story(chat_id):
    photos_for_group = YACHT_PHOTOS[:5]
    send_media_group(chat_id, photos_for_group, "📸 *Неделя на яхте — день за днём*")

    for day_text in WEEK_DAYS:
        send_message(chat_id, day_text)

    send_message(
        chat_id,
        "Это примерный план — маршрут всегда подстраивается под погоду, настроение и пожелания команды 🌊",
        back_and_pick_keyboard()
    )


def handle_pick_trip(chat_id):
    send_message(
        chat_id,
        "🧭 *Подобрать путешествие*\n\n"
        "Расскажите немного о себе, и я подберу лучший вариант:\n\n"
        "1️⃣ Сколько вас человек?\n"
        "2️⃣ Какие даты рассматриваете?\n"
        "3️⃣ Есть ли пожелания по маршруту?\n\n"
        "Просто напишите ответ в чат — капитан ответит в течение часа ⚓",
        back_keyboard()
    )


def handle_contact_captain(chat_id):
    send_message(
        chat_id,
        "✍️ *Написать капитану*\n\n"
        "Напишите ваш вопрос прямо в этот чат — капитан ответит лично в течение часа.\n\n"
        "Или свяжитесь напрямую:\n"
        "📱 WhatsApp: [написать](https://wa.me/)\n",
        back_keyboard()
    )


def notify_admin(text):
    """Отправка уведомлений администраторам"""
    for chat_id in CHAT_IDS:
        try:
            send_message(chat_id, text)
        except Exception:
            pass


def forward_user_message_to_admins(message):
    """Пересылка пользовательских сообщений администраторам"""
    user = message.get("from", {})
    name = user.get("first_name", "")
    last = user.get("last_name", "")
    username = user.get("username", "")
    text = message.get("text", "")

    admin_text = (
        f"📩 *Новое сообщение от клиента*\n\n"
        f"👤 {name} {last}\n"
        f"🆔 @{username}\n" if username else f"👤 {name} {last}\n"
    )
    if username:
        admin_text = (
            f"📩 *Новое сообщение от клиента*\n\n"
            f"👤 {name} {last}\n"
            f"🆔 @{username}\n"
            f"💬 {text}"
        )
    else:
        admin_text = (
            f"📩 *Новое сообщение от клиента*\n\n"
            f"👤 {name} {last}\n"
            f"💬 {text}"
        )

    notify_admin(admin_text)


def handler(event, context):
    """Webhook Telegram-бота для яхтинга: главное меню, информация, заявки"""
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token, X-Session-Id",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    headers = {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}

    if event.get("httpMethod") == "GET":
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"status": "ok", "bot": "yacht-turkey"}),
        }

    body = event.get("body", "{}")
    if isinstance(body, str):
        body = json.loads(body)

    if "message" in body:
        message = body["message"]
        chat_id = message["chat"]["id"]
        text = message.get("text", "")

        if text == "/start":
            handle_start(chat_id)
        elif text == "/dates":
            handle_dates(chat_id)
        elif text == "/yachts":
            handle_yachts(chat_id)
        elif text == "/price":
            handle_price(chat_id)
        elif text == "/week":
            handle_week_story(chat_id)
        else:
            forward_user_message_to_admins(message)
            send_message(
                chat_id,
                "Спасибо за сообщение! ⚓ Капитан ответит вам в ближайшее время.\n\n"
                "А пока можете посмотреть:",
                main_menu_keyboard()
            )

    elif "callback_query" in body:
        cb = body["callback_query"]
        chat_id = cb["message"]["chat"]["id"]
        data = cb.get("data", "")
        answer_callback(cb["id"])

        if data == "main_menu":
            handle_start(chat_id)
        elif data == "dates":
            handle_dates(chat_id)
        elif data == "yachts":
            handle_yachts(chat_id)
        elif data == "price":
            handle_price(chat_id)
        elif data == "week_story":
            handle_week_story(chat_id)
        elif data == "pick_trip":
            handle_pick_trip(chat_id)
        elif data == "contact_captain":
            handle_contact_captain(chat_id)

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True}),
    }
