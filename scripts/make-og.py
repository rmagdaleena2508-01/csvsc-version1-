"""
Builds the social preview card: the chapter emblem over the hero sky.

Square, not the usual 1200x630 banner. Chat apps pick their card layout from
the image's aspect ratio, and a square lands in the small thumbnail slot that
WhatsApp and Telegram show beside the title — which is where most of this
site's links actually get opened. A wide image there falls back to the app
icon instead.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont

S = 1200
OUT = Path("public/images/brand/og.jpg")
NAVY = (18, 38, 92)

sky = Image.open("public/images/brand/sky-tall.jpg").convert("RGB")
scale = max(S / sky.width, S / sky.height)
sky = sky.resize((round(sky.width * scale), round(sky.height * scale)), Image.LANCZOS)
left = (sky.width - S) // 2
top = int((sky.height - S) * 0.46)
card = sky.crop((left, top, left + S, top + S))
card = ImageEnhance.Brightness(card).enhance(1.05)

# Lift the lower third so navy text holds against the clouds.
veil = Image.new("RGBA", (S, S), (0, 0, 0, 0))
vd = ImageDraw.Draw(veil)
for y in range(S):
    a = int(205 * max(0.0, (y - S * 0.46) / (S * 0.54)) ** 1.2)
    vd.line([(0, y), (S, y)], fill=(247, 242, 233, a))
card = Image.alpha_composite(card.convert("RGBA"), veil).convert("RGB")

emblem = Image.open("public/images/brand/csi-emblem.png").convert("RGBA")
size = 560
emblem = emblem.resize((size, size), Image.LANCZOS)
card.paste(emblem, ((S - size) // 2, 150), emblem)

draw = ImageDraw.Draw(card)
title = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 92)
sub = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 58)


def centre(text, font, y, fill):
    w = draw.textbbox((0, 0), text, font=font)[2]
    draw.text(((S - w) // 2, y), text, font=font, fill=fill)


centre("CSI Student Chapter", title, 800, NAVY)
centre("SRMIST VDP", sub, 930, NAVY)

card.save(OUT, quality=88, optimize=True, progressive=True)
print(OUT, card.size, OUT.stat().st_size // 1024, "KB")
