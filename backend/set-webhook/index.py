import json
import os
import urllib.request

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")


def handler(event, context):
    """Установка и удаление webhook для Telegram-бота"""
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

    params = event.get("queryStringParameters") or {}
    webhook_url = params.get("url", "")
    action = params.get("action", "set")

    if action == "delete":
        api_url = f"https://api.telegram.org/bot{BOT_TOKEN}/deleteWebhook"
        data = json.dumps({"drop_pending_updates": True}).encode("utf-8")
        req = urllib.request.Request(api_url, data=data, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read())
        return {"statusCode": 200, "headers": headers, "body": json.dumps(result)}

    if action == "info":
        api_url = f"https://api.telegram.org/bot{BOT_TOKEN}/getWebhookInfo"
        req = urllib.request.Request(api_url)
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read())
        return {"statusCode": 200, "headers": headers, "body": json.dumps(result)}

    if not webhook_url:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Передайте ?url=WEBHOOK_URL"}),
        }

    api_url = f"https://api.telegram.org/bot{BOT_TOKEN}/setWebhook"
    payload = json.dumps({"url": webhook_url, "drop_pending_updates": True}).encode("utf-8")
    req = urllib.request.Request(api_url, data=payload, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())

    return {"statusCode": 200, "headers": headers, "body": json.dumps(result)}
