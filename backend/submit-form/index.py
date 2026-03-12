import json
import os
import urllib.request

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
CHAT_IDS = [c.strip() for c in os.environ.get("TELEGRAM_CHAT_IDS", "").split(",") if c.strip()]


def send_telegram(chat_id, text):
    """Отправка сообщения через Telegram Bot API"""
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/{{}}"
    payload = json.dumps({"chat_id": chat_id, "text": text, "parse_mode": "Markdown"}).encode("utf-8")
    req = urllib.request.Request(
        url.format("sendMessage"),
        data=payload,
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


def handler(event, context):
    """Приём заявок с сайта и отправка уведомлений в Telegram"""
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

    if event.get("httpMethod") != "POST":
        return {
            "statusCode": 405,
            "headers": headers,
            "body": json.dumps({"error": "Method not allowed"}),
        }

    body = event.get("body", "{}")
    if isinstance(body, str):
        body = json.loads(body)

    name = body.get("name", "").strip()
    contact = body.get("contact", "").strip()
    guests = body.get("guests", "").strip()
    dates = body.get("dates", "").strip()

    if not name or not contact:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Укажите имя и контакт"}),
        }

    source_ip = event.get("requestContext", {}).get("identity", {}).get("sourceIp", "unknown")

    text = (
        "🚀 *Новая заявка с сайта!*\n\n"
        f"👤 *Имя:* {name}\n"
        f"📱 *Контакт:* {contact}\n"
        f"👥 *Гостей:* {guests or 'не указано'}\n"
        f"📅 *Даты:* {dates or 'не указаны'}\n"
        f"🌐 *IP:* {source_ip}"
    )

    sent = False
    for chat_id in CHAT_IDS:
        try:
            send_telegram(chat_id, text)
            sent = True
        except Exception:
            pass

    if not sent and not CHAT_IDS:
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": "Не настроены получатели уведомлений"}),
        }

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True, "message": "Заявка отправлена!"}),
    }
