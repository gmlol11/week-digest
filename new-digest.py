import os
import json
from datetime import datetime
import uuid

# === Настройки ===
base_dir = "digest"
template = {
    "image-block": {
        "type": "image-block",
        "title": "Новый мем-блок",
        "subtitle": "Добавь мемы",
        "images": []
    },
    "video-block": {
        "type": "video-block",
        "title": "Новый видеоблок",
        "subtitle": "Добавь видео",
        "videos": []
    },
    "link-block": {
        "type": "link-block",
        "title": "Новый список ссылок",
        "subtitle": "Добавь ссылки",
        "links": []
    }
}

# === Ввод даты выпуска ===
date_str = input("Введите дату выпуска (ГГГГ-ММ-ДД) [по умолчанию сегодня]: ").strip()
if not date_str:
    date_str = datetime.today().strftime('%Y-%m-%d')

digest_path = os.path.join(base_dir, date_str)
assets_path = os.path.join(digest_path, "assets")

if os.path.exists(digest_path):
    print("❌ Выпуск уже существует:", digest_path)
    exit()

# === Создание структуры ===
os.makedirs(assets_path)
digest_json = [
    template["image-block"],
    template["video-block"],
    template["link-block"]
]

with open(os.path.join(digest_path, "digest.json"), "w", encoding="utf-8") as f:
    json.dump(digest_json, f, indent=2, ensure_ascii=False)

# === Генерация токена ===
token = uuid.uuid4().hex[:12]
print("✅ Выпуск создан:", digest_path)
print("🔑 Токен доступа:", token)
print(f"👉 URL: ?token={token}")