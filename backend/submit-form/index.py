import json
import os
import urllib.request

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
CHAT_IDS = [c.strip() for c in os.environ.get("TELEGRAM_CHAT_IDS", "").split(",") if c.strip()]


def send_telegram(chat_id, text):
    """Отправка сообщения через Telegram Bot API"""
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = json.dumps({"chat_id": chat_id, "text": text}).encode("utf-8")
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=10) as resp:
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
        return {"statusCode": 405, "headers": headers, "body": json.dumps({"error": "Method not allowed"})}

    body = event.get("body", "{}")
    if isinstance(body, str):
        body = json.loads(body)

    name = body.get("name", "").strip()
    contact = body.get("contact", "").strip()
    guests = body.get("guests", "").strip()
    dates = body.get("dates", "").strip()

    if not name or not contact:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Укажите имя и контакт"})}

    source_ip = event.get("requestContext", {}).get("identity", {}).get("sourceIp", "unknown")

    text = (
        "Новая заявка с сайта!\n\n"
        f"Имя: {name}\n"
        f"Контакт: {contact}\n"
        f"Гостей: {guests or 'не указано'}\n"
        f"Даты: {dates or 'не указаны'}\n"
        f"IP: {source_ip}"
    )

    print(f"BOT_TOKEN set: {bool(BOT_TOKEN)}, CHAT_IDS: {CHAT_IDS}")

    if not BOT_TOKEN:
        print("ERROR: TELEGRAM_BOT_TOKEN is empty")
        return {"statusCode": 500, "headers": headers, "body": json.dumps({"error": "Бот не настроен"})}

    if not CHAT_IDS:
        print("ERROR: TELEGRAM_CHAT_IDS is empty")
        return {"statusCode": 500, "headers": headers, "body": json.dumps({"error": "Не настроены получатели"})}

    errors = []
    sent = False
    for chat_id in CHAT_IDS:
        try:
            result = send_telegram(chat_id, text)
            print(f"Sent to {chat_id}: {result}")
            sent = True
        except Exception as e:
            err_msg = str(e)
            print(f"Failed to send to {chat_id}: {err_msg}")
            errors.append(err_msg)

    if not sent:
        return {"statusCode": 500, "headers": headers, "body": json.dumps({"error": f"Telegram error: {'; '.join(errors)}"})}

    return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True, "message": "Заявка отправлена!"})}